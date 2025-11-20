// src/lib/api/auth.ts

import { apiClient } from './client';
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
} from '@/types/user';
import type { ApiResponse } from '@/types/api';

export const authApi = {
  /**
   * Login user
   */
  login: async (
    credentials: LoginCredentials
  ): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post('/auth/login', credentials);
  },

  /**
   * Register new user
   */
  register: async (
    userData: RegisterData
  ): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post('/auth/register', userData);
  },

  /**
   * Logout user
   */
  logout: async (): Promise<ApiResponse<void>> => {
    return apiClient.post('/auth/logout');
  },

  /**
   * Get current user
   */
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    return apiClient.get('/auth/me');
  },

  /**
   * Refresh access token
   */
  refreshToken: async (
    refreshToken: string
  ): Promise<ApiResponse<{ accessToken: string }>> => {
    return apiClient.post('/auth/refresh', { refreshToken });
  },

  /**
   * Request password reset
   */
  requestPasswordReset: async (
    email: string
  ): Promise<ApiResponse<void>> => {
    return apiClient.post('/auth/password-reset/request', { email });
  },

  /**
   * Reset password with token
   */
  resetPassword: async (
    token: string,
    newPassword: string
  ): Promise<ApiResponse<void>> => {
    return apiClient.post('/auth/password-reset/confirm', {
      token,
      newPassword,
    });
  },

  /**
   * Verify email
   */
  verifyEmail: async (token: string): Promise<ApiResponse<void>> => {
    return apiClient.post('/auth/verify-email', { token });
  },

  /**
   * Resend verification email
   */
  resendVerification: async (): Promise<ApiResponse<void>> => {
    return apiClient.post('/auth/verify-email/resend');
  },
};