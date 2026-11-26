// src/lib/api/client.ts
//
// Thin transport over axios: base URL, bearer token, token refresh, error mapping.
// It deliberately does NOT rename keys. Requests and responses are exactly the
// backend's snake_case JSON, typed by the Backend* interfaces in src/types, and the
// transformers in ./transformers are the single place that maps them to frontend models.

import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { ApiError } from '@/lib/errors/apiError';
import type { BackendApiError } from '@/types/api';
import type { BackendTokenResponse } from '@/types/user';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';
const API_TIMEOUT_MS = 30_000;

/** Fired on `window` when the session can no longer be refreshed. */
export const AUTH_LOGOUT_EVENT = 'auth:logout';

// ---------------------------------------------------------------------------
// Token storage — the single source of truth for tokens.
// ---------------------------------------------------------------------------

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const isBrowser = () => typeof window !== 'undefined';

export const tokenStorage = {
  getAccessToken(): string | null {
    return isBrowser() ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;
  },
  getRefreshToken(): string | null {
    return isBrowser() ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;
  },
  /** Stores both tokens; the backend rotates the refresh token on every refresh. */
  setTokens(tokens: Pick<BackendTokenResponse, 'access_token' | 'refresh_token'>): void {
    if (!isBrowser()) return;
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
  },
  clear(): void {
    if (!isBrowser()) return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

// Requests that must never trigger a refresh-and-retry on 401
// (a 401 from these means bad credentials / dead refresh token, not an expired access token).
const NO_REFRESH_PATHS = ['/auth/login', '/auth/register', '/auth/refresh'];

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

class ApiClient {
  private readonly http: AxiosInstance;
  /** Shared in-flight refresh so concurrent 401s trigger exactly one refresh call. */
  private refreshPromise: Promise<string> | null = null;

  constructor() {
    this.http = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT_MS,
      headers: { 'Content-Type': 'application/json' },
    });

    this.http.interceptors.request.use((config) => {
      const accessToken = tokenStorage.getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    this.http.interceptors.response.use(
      (response) => response,
      (error: AxiosError<BackendApiError>) => this.handleError(error)
    );
  }

  private async handleError(error: AxiosError<BackendApiError>): Promise<AxiosResponse> {
    if (!error.response) {
      throw error.code === AxiosError.ECONNABORTED
        ? ApiError.timeoutError()
        : ApiError.networkError();
    }

    const { status, data } = error.response;
    const original = error.config as RetriableConfig | undefined;
    const path = original?.url ?? '';

    if (
      status === 401 &&
      original &&
      !original._retry &&
      !NO_REFRESH_PATHS.some((p) => path.endsWith(p)) &&
      tokenStorage.getRefreshToken()
    ) {
      original._retry = true;
      const accessToken = await this.refreshAccessToken();
      original.headers.Authorization = `Bearer ${accessToken}`;
      // The retry goes through the interceptors again, so a failure is already an ApiError.
      return this.http.request(original);
    }

    throw ApiError.fromResponse(data, status);
  }

  private refreshAccessToken(): Promise<string> {
    if (!this.refreshPromise) {
      this.refreshPromise = this.performRefresh().finally(() => {
        this.refreshPromise = null;
      });
    }
    return this.refreshPromise;
  }

  private async performRefresh(): Promise<string> {
    const refreshToken = tokenStorage.getRefreshToken();
    try {
      // Plain axios (not this.http) so a failing refresh can't recurse into handleError.
      const { data } = await axios.post<BackendTokenResponse>(
        `${API_BASE_URL}/auth/refresh`,
        { refresh_token: refreshToken },
        { timeout: API_TIMEOUT_MS }
      );
      tokenStorage.setTokens(data);
      return data.access_token;
    } catch {
      tokenStorage.clear();
      if (isBrowser()) {
        window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT));
      }
      throw new ApiError('Your session has expired. Please log in again.', 401, 'UNAUTHORIZED');
    }
  }

  async get<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.get<T>(url, { ...config, params });
    return response.data;
  }

  async post<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.post<T>(url, body, config);
    return response.data;
  }

  async put<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.put<T>(url, body, config);
    return response.data;
  }

  /** Multipart upload with optional progress callback (0–100). */
  async upload<T>(
    url: string,
    formData: FormData,
    onProgress?: (percent: number) => void
  ): Promise<T> {
    const response = await this.http.post<T>(url, formData, {
      // Let the browser set multipart/form-data with the boundary.
      headers: { 'Content-Type': undefined },
      onUploadProgress: (event) => {
        if (onProgress && event.total) {
          onProgress(Math.round((event.loaded * 100) / event.total));
        }
      },
    });
    return response.data;
  }
}

export const apiClient = new ApiClient();
