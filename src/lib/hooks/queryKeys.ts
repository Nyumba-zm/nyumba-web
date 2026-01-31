// src/lib/hooks/queryKeys.ts

import type { PropertySearchParams } from '@/types/property';
import type { OfferFilters } from '@/types/transaction';
import type { ServiceCategory } from '@/types/service';

/**
 * Query keys factory for React Query
 * Using a factory pattern ensures consistent, type-safe query keys
 */
export const queryKeys = {
  // ===== Auth =====
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
  },

  // ===== Properties =====
  properties: {
    all: ['properties'] as const,
    lists: () => [...queryKeys.properties.all, 'list'] as const,
    list: (params?: PropertySearchParams) =>
      [...queryKeys.properties.lists(), params ?? {}] as const,
    details: () => [...queryKeys.properties.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.properties.details(), id] as const,
    saved: () => [...queryKeys.properties.all, 'saved'] as const,
    featured: () => [...queryKeys.properties.all, 'featured'] as const,
    my: () => [...queryKeys.properties.all, 'my'] as const,
    similar: (id: string) => [...queryKeys.properties.all, 'similar', id] as const,
  },

  // ===== Transactions =====
  transactions: {
    all: ['transactions'] as const,
    offers: {
      all: () => [...queryKeys.transactions.all, 'offers'] as const,
      list: (filters?: OfferFilters) =>
        [...queryKeys.transactions.offers.all(), filters ?? {}] as const,
      sent: () => [...queryKeys.transactions.offers.all(), 'sent'] as const,
      received: () => [...queryKeys.transactions.offers.all(), 'received'] as const,
      detail: (id: string) => [...queryKeys.transactions.offers.all(), id] as const,
    },
  },

  // ===== Communications =====
  communications: {
    all: ['communications'] as const,
    conversations: {
      all: () => [...queryKeys.communications.all, 'conversations'] as const,
      list: () => [...queryKeys.communications.conversations.all(), 'list'] as const,
      detail: (id: string) =>
        [...queryKeys.communications.conversations.all(), id] as const,
    },
    messages: (conversationId: string) =>
      [...queryKeys.communications.all, 'messages', conversationId] as const,
    notifications: {
      all: () => [...queryKeys.communications.all, 'notifications'] as const,
      unreadCount: () =>
        [...queryKeys.communications.notifications.all(), 'unreadCount'] as const,
    },
  },

  // ===== Valuations =====
  valuations: {
    all: ['valuations'] as const,
    property: (propertyId: string) =>
      [...queryKeys.valuations.all, 'property', propertyId] as const,
    comparables: (valuationId: string) =>
      [...queryKeys.valuations.all, 'comparables', valuationId] as const,
    marketTrends: (city: string, county?: string) =>
      [...queryKeys.valuations.all, 'marketTrends', city, county] as const,
    neighborhoodStats: (city: string) =>
      [...queryKeys.valuations.all, 'neighborhoodStats', city] as const,
  },

  // ===== Services =====
  services: {
    all: ['services'] as const,
    providers: {
      all: () => [...queryKeys.services.all, 'providers'] as const,
      list: (category?: ServiceCategory) =>
        [...queryKeys.services.providers.all(), category ?? 'all'] as const,
      detail: (id: string) => [...queryKeys.services.providers.all(), id] as const,
      availability: (id: string, date: string) =>
        [...queryKeys.services.providers.all(), id, 'availability', date] as const,
    },
    bookings: {
      all: () => [...queryKeys.services.all, 'bookings'] as const,
      list: () => [...queryKeys.services.bookings.all(), 'list'] as const,
      detail: (id: string) => [...queryKeys.services.bookings.all(), id] as const,
    },
  },
} as const;

/**
 * Type for extracting query key types
 */
export type QueryKeys = typeof queryKeys;
