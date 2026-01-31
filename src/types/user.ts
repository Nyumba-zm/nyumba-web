// src/types/user.ts

/**
 * User roles in the platform
 */
export type UserRole = 'buyer' | 'seller' | 'agent' | 'admin';

/**
 * Frontend user format (camelCase)
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string; // Computed: `${firstName} ${lastName}`
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt?: string;
}

/**
 * Backend user format (snake_case)
 */
export interface BackendUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  avatar_url?: string;
  role: UserRole;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at?: string;
}

/**
 * Agent profile (extended user)
 */
export interface Agent extends User {
  role: 'agent';
  companyName?: string;
  license: string;
  specializations: string[];
  rating: number;
  reviewCount: number;
  propertiesSold: number;
  bio?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

/**
 * Backend agent format
 */
export interface BackendAgent extends BackendUser {
  role: 'agent';
  company_name?: string;
  license: string;
  specializations: string[];
  rating: number;
  review_count: number;
  properties_sold: number;
  bio?: string;
  website?: string;
  social_media?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Registration data
 */
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: UserRole;
}

/**
 * Backend registration format
 */
export interface BackendRegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role?: UserRole;
}

/**
 * Backend auth response (login)
 */
export interface BackendAuthResponse {
  access_token: string;
  token_type: string;
}

/**
 * Frontend auth response
 */
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

/**
 * Auth state for Zustand store
 */
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * Auth store actions
 */
export interface AuthActions {
  login: (user: User, accessToken: string, refreshToken?: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (isLoading: boolean) => void;
  setTokens: (accessToken: string, refreshToken?: string) => void;
}

/**
 * Password reset request
 */
export interface ForgotPasswordData {
  email: string;
}

/**
 * Password reset confirmation
 */
export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

/**
 * Update profile data
 */
export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
}

/**
 * User role labels for display
 */
export const USER_ROLE_LABELS: Record<UserRole, string> = {
  buyer: 'Buyer',
  seller: 'Seller',
  agent: 'Agent',
  admin: 'Administrator',
};
