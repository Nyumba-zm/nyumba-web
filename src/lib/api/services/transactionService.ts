// src/lib/api/services/transactionService.ts

import { apiClient } from '../client';
import type { BackendPaginatedResponse, PaginatedResponse, CurrencyCode } from '@/types/api';
import type {
  Offer,
  BackendOffer,
  CreateOfferDto,
  RespondToOfferDto,
  OfferFilters,
} from '@/types/transaction';

/**
 * Transform backend offer to frontend format
 */
function transformOffer(backend: BackendOffer): Offer {
  return {
    id: backend.id,
    propertyId: backend.property_id,
    buyerId: backend.buyer_id,
    sellerId: backend.seller_id,
    amount: backend.offer_amount,
    currency: backend.offer_currency as CurrencyCode,
    message: backend.message,
    status: backend.status,
    counterAmount: backend.counter_amount,
    counterMessage: backend.counter_message,
    expiresAt: backend.expires_at,
    createdAt: backend.created_at,
    updatedAt: backend.updated_at,
  };
}

/**
 * Transform paginated offers
 */
function transformPaginatedOffers(
  response: BackendPaginatedResponse<BackendOffer>
): PaginatedResponse<Offer> {
  const totalPages = Math.ceil(response.total / response.page_size);
  return {
    items: response.items.map(transformOffer),
    total: response.total,
    page: response.page,
    pageSize: response.page_size,
    totalPages,
    hasMore: response.page < totalPages,
  };
}

/**
 * Transaction service
 */
export const transactionService = {
  /**
   * Create a new offer on a property
   */
  async createOffer(data: CreateOfferDto): Promise<Offer> {
    const response = await apiClient.post<BackendOffer>('/transactions/offers', {
      property_id: data.propertyId,
      offer_amount: data.amount,
      offer_currency: data.currency || 'ZMW',
      message: data.message,
      expires_in_days: data.expiresInDays || 7,
    });
    return transformOffer(response);
  },

  /**
   * Get offers (sent or received)
   */
  async getOffers(filters?: OfferFilters): Promise<PaginatedResponse<Offer>> {
    const response = await apiClient.get<BackendPaginatedResponse<BackendOffer>>(
      '/transactions/offers',
      {
        type: filters?.type,
        status: filters?.status,
        property_id: filters?.propertyId,
      }
    );
    return transformPaginatedOffers(response);
  },

  /**
   * Get sent offers
   */
  async getSentOffers(): Promise<PaginatedResponse<Offer>> {
    return this.getOffers({ type: 'sent' });
  },

  /**
   * Get received offers
   */
  async getReceivedOffers(): Promise<PaginatedResponse<Offer>> {
    return this.getOffers({ type: 'received' });
  },

  /**
   * Get a single offer by ID
   */
  async getOfferById(offerId: string): Promise<Offer> {
    const response = await apiClient.get<BackendOffer>(`/transactions/offers/${offerId}`);
    return transformOffer(response);
  },

  /**
   * Respond to an offer (accept, reject, or counter)
   */
  async respondToOffer(offerId: string, response: RespondToOfferDto): Promise<Offer> {
    const result = await apiClient.post<BackendOffer>(
      `/transactions/offers/${offerId}/respond`,
      {
        action: response.action,
        counter_amount: response.counterAmount,
        counter_message: response.counterMessage,
      }
    );
    return transformOffer(result);
  },

  /**
   * Accept an offer
   */
  async acceptOffer(offerId: string): Promise<Offer> {
    return this.respondToOffer(offerId, { action: 'accept' });
  },

  /**
   * Reject an offer
   */
  async rejectOffer(offerId: string): Promise<Offer> {
    return this.respondToOffer(offerId, { action: 'reject' });
  },

  /**
   * Counter an offer
   */
  async counterOffer(
    offerId: string,
    counterAmount: number,
    message?: string
  ): Promise<Offer> {
    return this.respondToOffer(offerId, {
      action: 'counter',
      counterAmount,
      counterMessage: message,
    });
  },

  /**
   * Withdraw an offer
   */
  async withdrawOffer(offerId: string): Promise<Offer> {
    const response = await apiClient.post<BackendOffer>(
      `/transactions/offers/${offerId}/withdraw`
    );
    return transformOffer(response);
  },
};
