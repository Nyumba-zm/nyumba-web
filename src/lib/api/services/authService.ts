// src/lib/api/services/authService.ts

import { apiClient, storeTokens, clearTokens } from '../client';
import { transformUser, transformRegisterDataToBackend } from '../transformers';
import type {
  User,
  BackendUser,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  BackendAuthResponse,
  ForgotPasswordData,
  ResetPasswordData,
  UpdateProfileData,
} from '@/types/user';

/**
 * Authentication service
 */
export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Backend expects form data for OAuth2 password flow
    const response = await apiClient.post<BackendAuthResponse>('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });

    // Store the token
    storeTokens(response.access_token);

    // Fetch the user profile
    const user = await this.getCurrentUser();

    return {
      user,
      accessToken: response.access_token,
    };
  },

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const backendData = transformRegisterDataToBackend(data);
    const userResponse = await apiClient.post<BackendUser>('/auth/register', backendData);
    const user = transformUser(userResponse);

    // Auto-login after registration
    const loginResponse = await this.login({
      email: data.email,
      password: data.password,
    });

    return loginResponse;
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<BackendUser>('/auth/me');
    return transformUser(response);
  },

  /**
   * Logout - clear tokens
   */
  logout(): void {
    clearTokens();
  },

  /**
   * Request password reset email
   */
  async forgotPassword(data: ForgotPasswordData): Promise<void> {
    await apiClient.post('/auth/forgot-password', data);
  },

  /**
   * Reset password with token
   */
  async resetPassword(data: ResetPasswordData): Promise<void> {
    await apiClient.post('/auth/reset-password', {
      token: data.token,
      password: data.password,
    });
  },

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<void> {
    await apiClient.post('/auth/verify-email', { token });
  },

  /**
   * Resend verification email
   */
  async resendVerification(email: string): Promise<void> {
    await apiClient.post('/auth/resend-verification', { email });
  },

  /**
   * Update user profile
   */
  async updateProfile(data: UpdateProfileData): Promise<User> {
    const response = await apiClient.patch<BackendUser>('/auth/me', {
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      avatar_url: data.avatarUrl,
    });
    return transformUser(response);
  },

  /**
   * Change password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/change-password', {
      current_password: currentPassword,
      new_password: newPassword,
    });
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return apiClient.isAuthenticated();
  },
};
