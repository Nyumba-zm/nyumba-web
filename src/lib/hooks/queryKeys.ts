// src/lib/hooks/queryKeys.ts

import type { PropertySearchParams } from '@/types/property';
import type { PaginationParams } from '@/types/api';

/**
 * Query key factory — one place that defines cache identity for every query.
 */
export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
  },
  properties: {
    all: ['properties'] as const,
    lists: () => [...queryKeys.properties.all, 'list'] as const,
    list: (params: PropertySearchParams) => [...queryKeys.properties.lists(), params] as const,
    details: () => [...queryKeys.properties.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.properties.details(), id] as const,
    mine: (params: PaginationParams = {}) =>
      [...queryKeys.properties.all, 'mine', params] as const,
  },
} as const;
