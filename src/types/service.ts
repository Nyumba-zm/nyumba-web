// src/types/service.ts

import type { CurrencyCode } from './api';

/**
 * Service category
 */
export type ServiceCategory =
  | 'inspection'
  | 'legal'
  | 'insurance'
  | 'renovation'
  | 'moving'
  | 'cleaning'
  | 'photography';

/**
 * Service types within categories
 */
export type ServiceType =
  // Inspection
  | 'home_inspection'
  | 'structural_inspection'
  | 'pest_inspection'
  | 'electrical_inspection'
  | 'plumbing_inspection'
  // Legal
  | 'title_search'
  | 'contract_review'
  | 'conveyancing'
  | 'legal_consultation'
  // Insurance
  | 'home_insurance'
  | 'title_insurance'
  | 'landlord_insurance'
  // Renovation
  | 'painting'
  | 'plumbing'
  | 'electrical'
  | 'general_renovation'
  // Moving
  | 'packing'
  | 'transportation'
  | 'full_move'
  // Other
  | 'deep_cleaning'
  | 'property_photography'
  | 'virtual_tour';

/**
 * Booking status
 */
export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show';

/**
 * Price unit
 */
export type PriceUnit = 'per_service' | 'per_hour' | 'per_day' | 'per_sqm';

/**
 * Frontend service provider format
 */
export interface ServiceProvider {
  id: string;
  businessName: string;
  description: string;
  serviceTypes: ServiceType[];
  categories: ServiceCategory[];
  serviceAreas: string[];
  basePrice: number;
  currency: CurrencyCode;
  priceUnit: PriceUnit;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  isVerified: boolean;
  isActive: boolean;
  phone: string;
  email: string;
  website?: string;
  logoUrl?: string;
  createdAt: string;
}

/**
 * Backend service provider format
 */
export interface BackendServiceProvider {
  id: string;
  business_name: string;
  description: string;
  service_types: ServiceType[];
  categories: ServiceCategory[];
  service_areas: string[];
  base_price: number;
  price_currency: string;
  price_unit: PriceUnit;
  rating: number;
  review_count: number;
  completed_jobs: number;
  is_verified: boolean;
  is_active: boolean;
  phone: string;
  email: string;
  website?: string;
  logo_url?: string;
  created_at: string;
}

/**
 * Frontend service booking format
 */
export interface ServiceBooking {
  id: string;
  customerId: string;
  providerId: string;
  serviceType: ServiceType;
  propertyId?: string;
  addressStreet: string;
  addressCity: string;
  addressCounty: string;
  scheduledDate: string;
  estimatedDurationHours?: number;
  quotedPrice?: number;
  currency: CurrencyCode;
  status: BookingStatus;
  customerNotes?: string;
  providerNotes?: string;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
  // Populated relations
  provider?: {
    id: string;
    businessName: string;
    phone: string;
    rating: number;
  };
}

/**
 * Backend service booking format
 */
export interface BackendServiceBooking {
  id: string;
  customer_id: string;
  provider_id: string;
  service_type: ServiceType;
  property_id?: string;
  address_street: string;
  address_city: string;
  address_county: string;
  scheduled_date: string;
  estimated_duration_hours?: number;
  quoted_price?: number;
  price_currency: string;
  status: BookingStatus;
  customer_notes?: string;
  provider_notes?: string;
  created_at: string;
  updated_at?: string;
  completed_at?: string;
}

/**
 * Create booking DTO
 */
export interface CreateBookingDto {
  providerId: string;
  serviceType: ServiceType;
  propertyId?: string;
  addressStreet: string;
  addressCity: string;
  addressCounty: string;
  scheduledDate: string;
  customerNotes?: string;
}

/**
 * Backend create booking format
 */
export interface BackendCreateBookingDto {
  provider_id: string;
  service_type: ServiceType;
  property_id?: string;
  address_street: string;
  address_city: string;
  address_county: string;
  scheduled_date: string;
  customer_notes?: string;
}

/**
 * Service provider filters
 */
export interface ServiceProviderFilters {
  serviceType?: ServiceType;
  category?: ServiceCategory;
  area?: string;
  verifiedOnly?: boolean;
  minRating?: number;
}

/**
 * Service category labels
 */
export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  inspection: 'Home Inspection',
  legal: 'Legal Services',
  insurance: 'Insurance',
  renovation: 'Renovation',
  moving: 'Moving Services',
  cleaning: 'Cleaning',
  photography: 'Photography',
};

/**
 * Service type labels
 */
export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  home_inspection: 'Home Inspection',
  structural_inspection: 'Structural Inspection',
  pest_inspection: 'Pest Inspection',
  electrical_inspection: 'Electrical Inspection',
  plumbing_inspection: 'Plumbing Inspection',
  title_search: 'Title Search',
  contract_review: 'Contract Review',
  conveyancing: 'Conveyancing',
  legal_consultation: 'Legal Consultation',
  home_insurance: 'Home Insurance',
  title_insurance: 'Title Insurance',
  landlord_insurance: 'Landlord Insurance',
  painting: 'Painting',
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  general_renovation: 'General Renovation',
  packing: 'Packing',
  transportation: 'Transportation',
  full_move: 'Full Moving Service',
  deep_cleaning: 'Deep Cleaning',
  property_photography: 'Property Photography',
  virtual_tour: 'Virtual Tour',
};

/**
 * Booking status labels
 */
export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
  no_show: 'No Show',
};

/**
 * Booking status colors
 */
export const BOOKING_STATUS_COLORS: Record<BookingStatus, string> = {
  pending: 'yellow',
  confirmed: 'blue',
  in_progress: 'purple',
  completed: 'green',
  cancelled: 'red',
  no_show: 'gray',
};
