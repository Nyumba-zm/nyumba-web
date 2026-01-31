// src/lib/api/services/serviceProviderService.ts

import { apiClient } from '../client';
import type { BackendPaginatedResponse, PaginatedResponse, CurrencyCode } from '@/types/api';
import type {
  ServiceProvider,
  ServiceBooking,
  BackendServiceProvider,
  BackendServiceBooking,
  CreateBookingDto,
  ServiceProviderFilters,
  ServiceCategory,
  ServiceType,
} from '@/types/service';

/**
 * Transform backend service provider to frontend format
 */
function transformServiceProvider(backend: BackendServiceProvider): ServiceProvider {
  return {
    id: backend.id,
    businessName: backend.business_name,
    description: backend.description,
    serviceTypes: backend.service_types,
    categories: backend.categories,
    serviceAreas: backend.service_areas,
    basePrice: backend.base_price,
    currency: backend.price_currency as CurrencyCode,
    priceUnit: backend.price_unit,
    rating: backend.rating,
    reviewCount: backend.review_count,
    completedJobs: backend.completed_jobs,
    isVerified: backend.is_verified,
    isActive: backend.is_active,
    phone: backend.phone,
    email: backend.email,
    website: backend.website,
    logoUrl: backend.logo_url,
    createdAt: backend.created_at,
  };
}

/**
 * Transform backend service booking to frontend format
 */
function transformServiceBooking(backend: BackendServiceBooking): ServiceBooking {
  return {
    id: backend.id,
    customerId: backend.customer_id,
    providerId: backend.provider_id,
    serviceType: backend.service_type,
    propertyId: backend.property_id,
    addressStreet: backend.address_street,
    addressCity: backend.address_city,
    addressCounty: backend.address_county,
    scheduledDate: backend.scheduled_date,
    estimatedDurationHours: backend.estimated_duration_hours,
    quotedPrice: backend.quoted_price,
    currency: backend.price_currency as CurrencyCode,
    status: backend.status,
    customerNotes: backend.customer_notes,
    providerNotes: backend.provider_notes,
    createdAt: backend.created_at,
    updatedAt: backend.updated_at,
    completedAt: backend.completed_at,
  };
}

/**
 * Service provider service
 */
export const serviceProviderService = {
  /**
   * Search for service providers
   */
  async getProviders(
    filters?: ServiceProviderFilters
  ): Promise<PaginatedResponse<ServiceProvider>> {
    const response = await apiClient.get<BackendPaginatedResponse<BackendServiceProvider>>(
      '/services/providers',
      {
        service_type: filters?.serviceType,
        category: filters?.category,
        area: filters?.area,
        verified_only: filters?.verifiedOnly,
        min_rating: filters?.minRating,
      }
    );

    const totalPages = Math.ceil(response.total / response.page_size);
    return {
      items: response.items.map(transformServiceProvider),
      total: response.total,
      page: response.page,
      pageSize: response.page_size,
      totalPages,
      hasMore: response.page < totalPages,
    };
  },

  /**
   * Get providers by category
   */
  async getProvidersByCategory(category: ServiceCategory): Promise<ServiceProvider[]> {
    const response = await this.getProviders({ category });
    return response.items;
  },

  /**
   * Get a single provider by ID
   */
  async getProviderById(providerId: string): Promise<ServiceProvider> {
    const response = await apiClient.get<BackendServiceProvider>(
      `/services/providers/${providerId}`
    );
    return transformServiceProvider(response);
  },

  /**
   * Create a service booking
   */
  async createBooking(data: CreateBookingDto): Promise<ServiceBooking> {
    const response = await apiClient.post<BackendServiceBooking>('/services/bookings', {
      provider_id: data.providerId,
      service_type: data.serviceType,
      property_id: data.propertyId,
      address_street: data.addressStreet,
      address_city: data.addressCity,
      address_county: data.addressCounty,
      scheduled_date: data.scheduledDate,
      customer_notes: data.customerNotes,
    });
    return transformServiceBooking(response);
  },

  /**
   * Get user's bookings
   */
  async getMyBookings(): Promise<ServiceBooking[]> {
    const response = await apiClient.get<BackendPaginatedResponse<BackendServiceBooking>>(
      '/services/bookings'
    );
    return response.items.map(transformServiceBooking);
  },

  /**
   * Get a single booking by ID
   */
  async getBookingById(bookingId: string): Promise<ServiceBooking> {
    const response = await apiClient.get<BackendServiceBooking>(
      `/services/bookings/${bookingId}`
    );
    return transformServiceBooking(response);
  },

  /**
   * Cancel a booking
   */
  async cancelBooking(bookingId: string, reason?: string): Promise<ServiceBooking> {
    const response = await apiClient.post<BackendServiceBooking>(
      `/services/bookings/${bookingId}/cancel`,
      { reason }
    );
    return transformServiceBooking(response);
  },

  /**
   * Reschedule a booking
   */
  async rescheduleBooking(
    bookingId: string,
    newDate: string
  ): Promise<ServiceBooking> {
    const response = await apiClient.patch<BackendServiceBooking>(
      `/services/bookings/${bookingId}`,
      { scheduled_date: newDate }
    );
    return transformServiceBooking(response);
  },

  /**
   * Get available time slots for a provider
   */
  async getAvailableSlots(
    providerId: string,
    date: string
  ): Promise<string[]> {
    const response = await apiClient.get<{ slots: string[] }>(
      `/services/providers/${providerId}/availability`,
      { date }
    );
    return response.slots;
  },
};
