// src/types/user.ts
//
// Backend* types mirror nyumba-backend/src/nyumba/users/presentation/schemas.py.

export const USER_ROLES = ['buyer', 'seller', 'agent', 'admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

/** Roles a visitor may pick at sign-up (admin is never self-assigned). */
export type SelfServiceRole = Exclude<UserRole, 'admin'>;

// ---------------------------------------------------------------------------
// Wire types
// ---------------------------------------------------------------------------

/** `UserResponse` from `GET /auth/me`. */
export interface BackendUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  role: UserRole;
  is_active: boolean;
  is_verified: boolean;
  whatsapp_link: string | null;
}

/** `RegisterRequest`. `phone` must match ^\+260[0-9]{9}$. */
export interface BackendRegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: SelfServiceRole;
}

/** `RegisterResponse`. */
export interface BackendRegisterResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
}

/** `TokenResponse` from `/auth/login` and `/auth/refresh` (refresh tokens rotate). */
export interface BackendTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

// ---------------------------------------------------------------------------
// Frontend types
// ---------------------------------------------------------------------------

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  whatsappLink?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  /** Any Zambian format the user typed; normalised to +260XXXXXXXXX before sending. */
  phone?: string;
  role: SelfServiceRole;
}

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  buyer: 'Buyer',
  seller: 'Seller',
  agent: 'Agent',
  admin: 'Administrator',
};
