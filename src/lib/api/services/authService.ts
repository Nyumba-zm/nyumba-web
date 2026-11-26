// src/lib/api/services/authService.ts
//
// One method per backend route in nyumba-backend/src/nyumba/users/presentation/routes.py.

import { apiClient, tokenStorage } from '../client';
import { transformRegisterDataToBackend, transformUser } from '../transformers';
import type {
  BackendRegisterResponse,
  BackendTokenResponse,
  BackendUser,
  LoginCredentials,
  RegisterData,
  User,
} from '@/types/user';

export const authService = {
  /** POST /auth/login, then GET /auth/me. Stores both tokens. */
  async login(credentials: LoginCredentials): Promise<User> {
    const tokens = await apiClient.post<BackendTokenResponse>('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });
    tokenStorage.setTokens(tokens);
    return this.getCurrentUser();
  },

  /** POST /auth/register (returns no tokens), then logs in. */
  async register(data: RegisterData): Promise<User> {
    await apiClient.post<BackendRegisterResponse>(
      '/auth/register',
      transformRegisterDataToBackend(data)
    );
    return this.login({ email: data.email, password: data.password });
  },

  /** GET /auth/me */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<BackendUser>('/auth/me');
    return transformUser(response);
  },

  /** The backend has no logout/revoke endpoint; dropping the tokens ends the session. */
  logout(): void {
    tokenStorage.clear();
  },
};
