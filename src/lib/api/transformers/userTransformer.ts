// src/lib/api/transformers/userTransformer.ts

import type { User, BackendUser, Agent, BackendAgent, RegisterData } from '@/types/user';

/**
 * Transform backend user to frontend format
 */
export function transformUser(backend: BackendUser): User {
  return {
    id: backend.id,
    email: backend.email,
    firstName: backend.first_name,
    lastName: backend.last_name,
    fullName: `${backend.first_name} ${backend.last_name}`,
    phone: backend.phone,
    avatarUrl: backend.avatar_url,
    role: backend.role,
    isActive: backend.is_active,
    isVerified: backend.is_verified,
    createdAt: backend.created_at,
    updatedAt: backend.updated_at,
  };
}

/**
 * Transform backend agent to frontend format
 */
export function transformAgent(backend: BackendAgent): Agent {
  return {
    ...transformUser(backend),
    role: 'agent',
    companyName: backend.company_name,
    license: backend.license,
    specializations: backend.specializations,
    rating: backend.rating,
    reviewCount: backend.review_count,
    propertiesSold: backend.properties_sold,
    bio: backend.bio,
    website: backend.website,
    socialMedia: backend.social_media,
  };
}

/**
 * Transform register data to backend format
 */
export function transformRegisterDataToBackend(data: RegisterData): Record<string, unknown> {
  return {
    email: data.email,
    password: data.password,
    first_name: data.firstName,
    last_name: data.lastName,
    phone: data.phone,
    role: data.role || 'buyer',
  };
}
