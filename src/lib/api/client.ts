// src/lib/api/client.ts

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type { ApiError, ApiResponse } from '@/types/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add auth token if it exists
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('accessToken');
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
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
        // Return the data directly
        return response.data;
      },
      async (error: AxiosError<ApiError>) => {
        // Handle specific error cases
        if (error.response) {
          const { status, data } = error.response;

          // Unauthorized - clear token and redirect to login
          if (status === 401) {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              window.location.href = '/login';
            }
          }

          // Rate limiting
          if (status === 429) {
            console.error('Too many requests. Please try again later.');
          }

          // Server error
          if (status >= 500) {
            console.error('Server error. Please try again later.');
          }

          return Promise.reject(data || { message: 'An error occurred' });
        }

        // Network error
        if (error.request) {
          return Promise.reject({
            message: 'Network error. Please check your connection.',
            code: 'NETWORK_ERROR',
          });
        }

        return Promise.reject({
          message: error.message || 'An unexpected error occurred',
          code: 'UNKNOWN_ERROR',
        });
      }
    );
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.client.get(url, { params });
  }

  async post<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.client.post(url, data);
  }

  async put<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.client.put(url, data);
  }

  async patch<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.client.patch(url, data);
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    return this.client.delete(url);
  }

  // File upload with progress
  async uploadFile<T>(
    url: string,
    formData: FormData,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    return this.client.post(url, formData, {
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
}

// Export singleton instance
export const apiClient = new ApiClient();