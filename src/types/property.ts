// src/types/property.ts

import type { CurrencyCode, PaginationParams, SortParams } from './api';

/**
 * Property types supported by the platform
 */
export type PropertyType =
  | 'apartment'
  | 'house'
  | 'land'
  | 'commercial'
  | 'townhouse'
  | 'villa'
  | 'studio';

/**
 * Property listing status
 */
export type PropertyStatus =
  | 'draft'
  | 'active'
  | 'pending'
  | 'sold'
  | 'rented'
  | 'withdrawn';

/**
 * Listing type - sale or rent
 */
export type ListingType = 'sale' | 'rent';

/**
 * Address object (frontend format)
 */
export interface Address {
  street: string;
  city: string;
  county: string;
  country: string;
  postalCode?: string;
}

/**
 * Backend address format (snake_case)
 */
export interface BackendAddress {
  street: string;
  city: string;
  county: string;
  country: string;
  postal_code?: string;
}

/**
 * Location coordinates
 */
export interface Location {
  latitude: number;
  longitude: number;
}

/**
 * Property image
 */
export interface PropertyImage {
  id: string;
  url: string;
  isPrimary: boolean;
  displayOrder: number;
}

/**
 * Backend property image format
 */
export interface BackendPropertyImage {
  id: string;
  url: string;
  is_primary: boolean;
  display_order: number;
}

/**
 * Frontend property format (camelCase, flattened for convenience)
 */
export interface Property {
  id: string;
  title: string;
  description: string;
  propertyType: PropertyType;
  listingType: ListingType;
  // Price (flattened from price object)
  price: number;
  currency?: CurrencyCode;
  isNegotiable?: boolean;
  // Address (flattened from address object)
  street?: string;
  city: string;
  county?: string;
  country?: string;
  postalCode?: string;
  // Convenience field for display (e.g., "Kabulonga")
  neighborhood?: string;
  // Convenience field for full street address
  address?: string;
  // Formatted address string for display
  formattedAddress?: string;
  // Location
  latitude?: number;
  longitude?: number;
  // Property details
  bedrooms: number;
  bathrooms: number;
  areaSqm?: number;
  // Alias for areaSqm for backward compatibility
  squareMeters?: number;
  yearBuilt?: number;
  // Media & features
  images: PropertyImage[];
  amenities: string[];
  features?: string[];
  // Status & metadata
  status: PropertyStatus;
  ownerId?: string;
  // Alias for ownerId for backward compatibility
  userId?: string;
  agentId?: string;
  isVerified?: boolean;
  isFeatured?: boolean;
  viewCount?: number;
  // Timestamps
  createdAt: string;
  updatedAt?: string;
}

/**
 * Backend property format (snake_case, nested objects)
 */
export interface BackendProperty {
  id: string;
  title: string;
  description: string;
  property_type: PropertyType;
  listing_type?: ListingType;
  address: BackendAddress;
  location?: Location;
  price: {
    amount: number;
    currency: string;
  };
  is_negotiable: boolean;
  bedrooms: number;
  bathrooms: number;
  area_sqm: number;
  year_built?: number;
  amenities: string[];
  features?: string[];
  images: string[];
  status: PropertyStatus;
  owner_id: string;
  agent_id?: string;
  is_verified: boolean;
  is_featured?: boolean;
  view_count: number;
  created_at: string;
  updated_at?: string;
}

/**
 * Property filter options
 */
export interface PropertyFilters {
  propertyType?: PropertyType[];
  listingType?: ListingType;
  city?: string;
  county?: string;
  priceMin?: number;
  priceMax?: number;
  bedroomsMin?: number;
  bedroomsMax?: number;
  bathroomsMin?: number;
  bathroomsMax?: number;
  amenities?: string[];
  status?: PropertyStatus;
  searchQuery?: string;
}

/**
 * Property search parameters (filters + pagination + sorting)
 */
export interface PropertySearchParams extends PropertyFilters, PaginationParams, SortParams {
  sortBy?: 'price' | 'created_at' | 'view_count';
}

/**
 * Backend search params format (snake_case)
 */
export interface BackendPropertySearchParams {
  [key: string]: string | number | boolean | undefined;
  city?: string;
  county?: string;
  property_type?: string;
  min_price?: number;
  max_price?: number;
  min_bedrooms?: number;
  max_bedrooms?: number;
  status?: PropertyStatus;
  page?: number;
  page_size?: number;
}

/**
 * Create property DTO (for forms)
 */
export interface CreatePropertyDto {
  title: string;
  description: string;
  propertyType: PropertyType;
  listingType: ListingType;
  price: number;
  currency?: CurrencyCode;
  isNegotiable?: boolean;
  street: string;
  city: string;
  county: string;
  country?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  yearBuilt?: number;
  amenities?: string[];
  features?: string[];
  images?: string[];
}

/**
 * Update property DTO
 */
export type UpdatePropertyDto = Partial<CreatePropertyDto>;

/**
 * Property summary (for cards/lists)
 */
export interface PropertySummary {
  id: string;
  title: string;
  propertyType: PropertyType;
  listingType: ListingType;
  price: number;
  currency: CurrencyCode;
  city: string;
  county: string;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  primaryImage?: string;
  status: PropertyStatus;
  isVerified: boolean;
  isFeatured: boolean;
}

/**
 * Available amenities
 */
export const AMENITIES = [
  'parking',
  'gym',
  'swimming_pool',
  'security',
  'garden',
  'balcony',
  'air_conditioning',
  'furnished',
  'pet_friendly',
  'elevator',
  'storage',
  'laundry',
  'internet',
  'cctv',
  'generator',
  'water_tank',
  'borehole',
  'solar',
] as const;

export type Amenity = (typeof AMENITIES)[number];

/**
 * Property type labels for display
 */
export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  apartment: 'Apartment',
  house: 'House',
  land: 'Land',
  commercial: 'Commercial',
  townhouse: 'Townhouse',
  villa: 'Villa',
  studio: 'Studio',
};

/**
 * Property status labels for display
 */
export const PROPERTY_STATUS_LABELS: Record<PropertyStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  pending: 'Pending',
  sold: 'Sold',
  rented: 'Rented',
  withdrawn: 'Withdrawn',
};
