// src/lib/api/transformers/userTransformer.ts

import { normalizeZambianPhone } from '@/lib/utils/format';
import type { BackendRegisterRequest, BackendUser, RegisterData, User } from '@/types/user';

export function transformUser(backend: BackendUser): User {
  return {
    id: backend.id,
    email: backend.email,
    firstName: backend.first_name,
    lastName: backend.last_name,
    fullName: `${backend.first_name} ${backend.last_name}`,
    phone: backend.phone ?? undefined,
    role: backend.role,
    isActive: backend.is_active,
    isVerified: backend.is_verified,
    whatsappLink: backend.whatsapp_link ?? undefined,
  };
}

export function transformRegisterDataToBackend(data: RegisterData): BackendRegisterRequest {
  return {
    email: data.email,
    password: data.password,
    first_name: data.firstName,
    last_name: data.lastName,
    // The backend only accepts E.164 (+260XXXXXXXXX); forms accept local formats too.
    phone: data.phone ? (normalizeZambianPhone(data.phone) ?? data.phone) : undefined,
    role: data.role,
  };
}
