// src/types/property.ts
//
// Two layers of types live here:
// - Backend* types mirror the JSON the API actually sends/accepts (snake_case),
//   taken from nyumba-backend/src/nyumba/properties/presentation/schemas.py.
// - Frontend types (camelCase) are what components consume.
// The only place that converts between them is src/lib/api/transformers/propertyTransformer.ts.

import type { CurrencyCode, PaginationParams } from './api';

/** Backend `PropertyType` enum (properties/domain/value_objects.py). */
export const PROPERTY_TYPES = [
  'apartment',
  'house',
  'townhouse',
  'villa',
  'bungalow',
  'studio',
  'office',
  'shop',
  'warehouse',
  'land',
  'farm',
] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

/** Backend `ListingType` enum. */
export const LISTING_TYPES = ['rent', 'sale'] as const;
export type ListingType = (typeof LISTING_TYPES)[number];

/** Backend `ListingStatus` enum. */
export type PropertyStatus = 'draft' | 'active' | 'inactive' | 'sold' | 'rented';

/**
 * Pydantic v2 serialises `Decimal` fields as JSON strings (e.g. "2500000.00").
 */
export type DecimalString = string;

// ---------------------------------------------------------------------------
// Wire types (what the backend sends / accepts)
// ---------------------------------------------------------------------------

/** `AddressSchema` — nested address on create requests. */
export interface BackendAddressInput {
  street: string;
  city: string;
  province: string;
  /** Neighbourhood, e.g. "Kabulonga" (demo-scope addition; optional). */
  area?: string;
  country?: string;
  postal_code?: string;
}

/** `CreatePropertyRequest`. */
export interface BackendCreatePropertyRequest {
  title: string;
  description: string;
  property_type: PropertyType;
  listing_type: ListingType;
  address: BackendAddressInput;
  coordinates?: { latitude: number; longitude: number };
  price_amount: number;
  price_currency: CurrencyCode;
  is_negotiable: boolean;
  bedrooms: number;
  bathrooms: number;
  area_sqm: number;
  year_built?: number;
  amenities: string[];
}

/** `UpdatePropertyRequest` (sent with PUT; every field optional). */
export interface BackendUpdatePropertyRequest {
  title?: string;
  description?: string;
  price_amount?: number;
  price_currency?: CurrencyCode;
  is_negotiable?: boolean;
  bedrooms?: number;
  bathrooms?: number;
  area_sqm?: number;
  year_built?: number;
  amenities?: string[];
}

/** `PropertyResponse` — the address is flattened into `address_*` fields. */
export interface BackendProperty {
  id: string;
  title: string;
  description: string;
  property_type: PropertyType;
  listing_type: ListingType;
  address_street: string;
  address_city: string;
  address_province: string;
  /** Demo-scope addition; absent until the backend ships it. */
  address_area?: string | null;
  address_country: string;
  latitude: number | null;
  longitude: number | null;
  price_amount: DecimalString;
  price_currency: CurrencyCode;
  is_negotiable: boolean;
  bedrooms: number;
  bathrooms: number;
  area_sqm: DecimalString;
  year_built: number | null;
  amenities: string[];
  images: string[];
  status: PropertyStatus;
  is_verified: boolean;
  view_count: number;
  /** Demo-scope addition (7-day availability check); absent until shipped. */
  last_confirmed_available_at?: string | null;
}

/** `PropertyDetailResponse` — adds seller contact info. */
export interface BackendPropertyDetail extends BackendProperty {
  seller_name: string;
  seller_phone: string | null;
  seller_email: string;
  seller_whatsapp_link: string | null;
}

/** `PropertyListResponse`. */
export interface BackendPropertyList {
  properties: BackendProperty[];
  total: number;
  page: number;
  page_size: number;
}

/** `UploadImagesResponse`. */
export interface BackendUploadImagesResponse {
  image_urls: string[];
}

/** Query string accepted by `GET /properties`. */
export interface BackendPropertySearchParams {
  area?: string;
  city?: string;
  province?: string;
  listing_type?: ListingType;
  property_type?: PropertyType;
  min_price?: number;
  max_price?: number;
  min_bedrooms?: number;
  page?: number;
  page_size?: number;
}

// ---------------------------------------------------------------------------
// Frontend types
// ---------------------------------------------------------------------------

export interface PropertyImage {
  url: string;
  isPrimary: boolean;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  propertyType: PropertyType;
  listingType: ListingType;
  price: number;
  currency: CurrencyCode;
  isNegotiable: boolean;
  street: string;
  area?: string;
  city: string;
  province: string;
  country: string;
  latitude?: number;
  longitude?: number;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  yearBuilt?: number;
  images: PropertyImage[];
  amenities: string[];
  status: PropertyStatus;
  isVerified: boolean;
  viewCount: number;
  lastConfirmedAvailableAt?: string;
}

export interface SellerContact {
  name: string;
  phone?: string;
  email: string;
  whatsappLink?: string;
}

export interface PropertyDetail extends Property {
  seller: SellerContact;
}

/** Filters the search UI can express — exactly what `GET /properties` supports. */
export interface PropertySearchParams extends PaginationParams {
  area?: string;
  city?: string;
  province?: string;
  listingType?: ListingType;
  propertyType?: PropertyType;
  priceMin?: number;
  priceMax?: number;
  bedroomsMin?: number;
}

/** Create-listing form output. */
export interface CreatePropertyDto {
  title: string;
  description: string;
  propertyType: PropertyType;
  listingType: ListingType;
  price: number;
  currency: CurrencyCode;
  isNegotiable: boolean;
  street: string;
  area?: string;
  city: string;
  province: string;
  latitude?: number;
  longitude?: number;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  yearBuilt?: number;
  amenities: string[];
}

/** Fields `PUT /properties/{id}` can change (address/type are immutable server-side). */
export type UpdatePropertyDto = Partial<
  Pick<
    CreatePropertyDto,
    | 'title'
    | 'description'
    | 'price'
    | 'currency'
    | 'isNegotiable'
    | 'bedrooms'
    | 'bathrooms'
    | 'areaSqm'
    | 'yearBuilt'
    | 'amenities'
  >
>;

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  apartment: 'Apartment',
  house: 'House',
  townhouse: 'Townhouse',
  villa: 'Villa',
  bungalow: 'Bungalow',
  studio: 'Studio',
  office: 'Office',
  shop: 'Shop',
  warehouse: 'Warehouse',
  land: 'Land',
  farm: 'Farm',
};

export const LISTING_TYPE_LABELS: Record<ListingType, string> = {
  rent: 'For Rent',
  sale: 'For Sale',
};

export const PROPERTY_STATUS_LABELS: Record<PropertyStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  inactive: 'Inactive',
  sold: 'Sold',
  rented: 'Rented',
};
