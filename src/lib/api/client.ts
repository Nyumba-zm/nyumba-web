// src/lib/api/client.ts

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { ApiError } from '@/lib/errors/apiError';
import { transformResponse, transformRequest, transformQueryParams } from '@/lib/utils/caseTransform';
import type { BackendApiError } from '@/types/api';

/**
 * API Client configuration
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
const API_TIMEOUT = 30000; // 30 seconds

/**
 * Token storage keys
 */
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * Get stored tokens
 */
function getStoredTokens() {
  if (typeof window === 'undefined') {
    return { accessToken: null, refreshToken: null };
  }
  return {
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  };
}

/**
 * Store tokens
 */
function storeTokens(accessToken: string, refreshToken?: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

/**
 * Clear stored tokens
 */
function clearTokens() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

/**
 * API Client class with token refresh and case transformation
 */
class ApiClient {
  private client: AxiosInstance;
  private isRefreshing: boolean = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add auth token if available
        const { accessToken } = getStoredTokens();
        if (accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        // Transform request body from camelCase to snake_case
        if (config.data && !(config.data instanceof FormData)) {
          config.data = transformRequest(config.data);
        }

        // Transform query params from camelCase to snake_case
        if (config.params) {
          config.params = transformQueryParams(config.params);
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        // Transform response data from snake_case to camelCase
        if (response.data) {
          response.data = transformResponse(response.data);
        }
        return response.data;
      },
      async (error: AxiosError<BackendApiError>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // Handle network errors
        if (!error.response) {
          if (error.code === 'ECONNABORTED') {
            return Promise.reject(ApiError.timeoutError());
          }
          return Promise.reject(ApiError.networkError());
        }

        const { status, data } = error.response;

        // Handle 401 Unauthorized - attempt token refresh
        if (status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // Queue this request while refresh is in progress
            return new Promise((resolve) => {
              this.refreshSubscribers.push((token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(this.client(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const { refreshToken } = getStoredTokens();
            if (!refreshToken) {
              throw new Error('No refresh token available');
            }

            // Attempt to refresh the token
            const response = await axios.post<{ access_token: string }>(
              `${API_BASE_URL}/auth/refresh`,
              { refresh_token: refreshToken },
              { headers: { 'Content-Type': 'application/json' } }
            );

            const newAccessToken = response.data.access_token;
            storeTokens(newAccessToken);

            // Retry all queued requests with new token
            this.refreshSubscribers.forEach((callback) => callback(newAccessToken));
            this.refreshSubscribers = [];

            // Retry the original request
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            // Token refresh failed - clear tokens and redirect to login
            clearTokens();
            this.refreshSubscribers = [];

            if (typeof window !== 'undefined') {
              // Dispatch a custom event so the app can handle logout
              window.dispatchEvent(new CustomEvent('auth:logout'));
              window.location.href = '/login';
            }

            return Promise.reject(
              new ApiError('Session expired. Please log in again.', 401, 'UNAUTHORIZED')
            );
          } finally {
            this.isRefreshing = false;
          }
        }

        // Handle other errors
        if (data) {
          return Promise.reject(ApiError.fromResponse(data, status));
        }

        return Promise.reject(
          new ApiError(
            getDefaultErrorMessage(status),
            status
          )
        );
      }
    );
  }

  /**
   * GET request
   */
  async get<T>(url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get(url, { ...config, params });
  }

  /**
   * POST request
   */
  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post(url, data, config);
  }

  /**
   * PUT request
   */
  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.client.put(url, data, config);
  }

  /**
   * PATCH request
   */
  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.client.patch(url, data, config);
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete(url, config);
  }

  /**
   * File upload with progress tracking
   */
  async uploadFile<T>(
    url: string,
    formData: FormData,
    onProgress?: (progress: number) => void,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.client.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });
  }

  /**
   * Set access token (for initial login)
   */
  setAccessToken(token: string, refreshToken?: string): void {
    storeTokens(token, refreshToken);
  }

  /**
   * Clear access token (for logout)
   */
  clearAccessToken(): void {
    clearTokens();
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const { accessToken } = getStoredTokens();
    return !!accessToken;
  }
}

/**
 * Get default error message for HTTP status code
 */
function getDefaultErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return 'Invalid request. Please check your input.';
    case 401:
      return 'Authentication required. Please log in.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 422:
      return 'Validation failed. Please check your input.';
    case 429:
      return 'Too many requests. Please try again later.';
    case 500:
      return 'Server error. Please try again later.';
    default:
      if (status >= 500) {
        return 'Server error. Please try again later.';
      }
      return 'An unexpected error occurred.';
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export utility functions
export { storeTokens, clearTokens, getStoredTokens };
