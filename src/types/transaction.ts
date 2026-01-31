// src/types/transaction.ts

import type { CurrencyCode } from './api';

/**
 * Offer status
 */
export type OfferStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'countered'
  | 'expired'
  | 'withdrawn';

/**
 * Frontend offer format (camelCase)
 */
export interface Offer {
  id: string;
  propertyId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  currency: CurrencyCode;
  message?: string;
  status: OfferStatus;
  counterAmount?: number;
  counterMessage?: string;
  expiresAt: string;
  createdAt: string;
  updatedAt?: string;
  // Populated relations
  property?: {
    id: string;
    title: string;
    primaryImage?: string;
    price: number;
  };
  buyer?: {
    id: string;
    fullName: string;
    avatarUrl?: string;
  };
  seller?: {
    id: string;
    fullName: string;
    avatarUrl?: string;
  };
}

/**
 * Backend offer format (snake_case)
 */
export interface BackendOffer {
  id: string;
  property_id: string;
  buyer_id: string;
  seller_id: string;
  offer_amount: number;
  offer_currency: string;
  message?: string;
  status: OfferStatus;
  counter_amount?: number;
  counter_message?: string;
  expires_at: string;
  created_at: string;
  updated_at?: string;
}

/**
 * Create offer DTO
 */
export interface CreateOfferDto {
  propertyId: string;
  amount: number;
  currency?: CurrencyCode;
  message?: string;
  expiresInDays?: number;
}

/**
 * Backend create offer format
 */
export interface BackendCreateOfferDto {
  property_id: string;
  offer_amount: number;
  offer_currency?: string;
  message?: string;
  expires_in_days?: number;
}

/**
 * Offer response action
 */
export type OfferAction = 'accept' | 'reject' | 'counter';

/**
 * Respond to offer DTO
 */
export interface RespondToOfferDto {
  action: OfferAction;
  counterAmount?: number;
  counterMessage?: string;
}

/**
 * Backend respond to offer format
 */
export interface BackendRespondToOfferDto {
  action: OfferAction;
  counter_amount?: number;
  counter_message?: string;
}

/**
 * Offer filters
 */
export interface OfferFilters {
  type?: 'sent' | 'received';
  status?: OfferStatus;
  propertyId?: string;
}

/**
 * Offer status labels for display
 */
export const OFFER_STATUS_LABELS: Record<OfferStatus, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  rejected: 'Rejected',
  countered: 'Counter Offer',
  expired: 'Expired',
  withdrawn: 'Withdrawn',
};

/**
 * Offer status colors for UI
 */
export const OFFER_STATUS_COLORS: Record<OfferStatus, string> = {
  pending: 'yellow',
  accepted: 'green',
  rejected: 'red',
  countered: 'blue',
  expired: 'gray',
  withdrawn: 'gray',
};
