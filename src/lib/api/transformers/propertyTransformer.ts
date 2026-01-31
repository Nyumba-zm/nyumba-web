// src/lib/api/transformers/propertyTransformer.ts

import type { CurrencyCode, BackendPaginatedResponse, PaginatedResponse, DEFAULT_CURRENCY } from '@/types/api';
import type {
  Property,
  PropertyImage,
  BackendProperty,
  CreatePropertyDto,
  PropertySearchParams,
  BackendPropertySearchParams,
} from '@/types/property';

/**
 * Format address parts into a display string
 */
function formatAddress(address: {
  street: string;
  city: string;
  county: string;
  country: string;
  postal_code?: string;
}): string {
  const parts = [address.street, address.city, address.county];
  if (address.postal_code) {
    parts.push(address.postal_code);
  }
  return parts.join(', ');
}

/**
 * Transform backend property image URLs to PropertyImage objects
 */
function transformImages(images: string[]): PropertyImage[] {
  return images.map((url, index) => ({
    id: `img-${index}`,
    url,
    isPrimary: index === 0,
    displayOrder: index,
  }));
}

/**
 * Transform backend property to frontend format
 */
export function transformProperty(backend: BackendProperty): Property {
  return {
    id: backend.id,
    title: backend.title,
    description: backend.description,
    propertyType: backend.property_type,
    listingType: backend.listing_type || 'sale',
    // Price
    price: backend.price.amount,
    currency: backend.price.currency as CurrencyCode,
    isNegotiable: backend.is_negotiable,
    // Address (flattened)
    street: backend.address.street,
    city: backend.address.city,
    county: backend.address.county,
    country: backend.address.country,
    postalCode: backend.address.postal_code,
    formattedAddress: formatAddress(backend.address),
    // Location
    latitude: backend.location?.latitude,
    longitude: backend.location?.longitude,
    // Details
    bedrooms: backend.bedrooms,
    bathrooms: backend.bathrooms,
    areaSqm: backend.area_sqm,
    yearBuilt: backend.year_built,
    // Media
    images: transformImages(backend.images),
    amenities: backend.amenities,
    features: backend.features,
    // Status
    status: backend.status,
    ownerId: backend.owner_id,
    agentId: backend.agent_id,
    isVerified: backend.is_verified,
    isFeatured: backend.is_featured || false,
    viewCount: backend.view_count,
    // Timestamps
    createdAt: backend.created_at,
    updatedAt: backend.updated_at || backend.created_at,
  };
}

/**
 * Transform frontend create property DTO to backend format
 */
export function transformCreatePropertyToBackend(dto: CreatePropertyDto): Record<string, unknown> {
  return {
    title: dto.title,
    description: dto.description,
    property_type: dto.propertyType,
    listing_type: dto.listingType,
    address_street: dto.street,
    address_city: dto.city,
    address_county: dto.county,
    address_postal_code: dto.postalCode,
    latitude: dto.latitude,
    longitude: dto.longitude,
    price_amount: dto.price,
    price_currency: dto.currency || 'ZMW',
    is_negotiable: dto.isNegotiable || false,
    bedrooms: dto.bedrooms,
    bathrooms: dto.bathrooms,
    area_sqm: dto.areaSqm,
    year_built: dto.yearBuilt,
    amenities: dto.amenities || [],
    images: dto.images || [],
  };
}

/**
 * Transform frontend search params to backend format
 */
export function transformSearchParamsToBackend(
  params: PropertySearchParams
): BackendPropertySearchParams {
  const result: BackendPropertySearchParams = {};

  if (params.city) result.city = params.city;
  if (params.county) result.county = params.county;
  if (params.propertyType?.length) result.property_type = params.propertyType[0];
  if (params.priceMin) result.min_price = params.priceMin;
  if (params.priceMax) result.max_price = params.priceMax;
  if (params.bedroomsMin) result.min_bedrooms = params.bedroomsMin;
  if (params.bedroomsMax) result.max_bedrooms = params.bedroomsMax;
  if (params.status) result.status = params.status;
  if (params.page) result.page = params.page;
  if (params.pageSize) result.page_size = params.pageSize;

  return result;
}

/**
 * Transform paginated property response
 */
export function transformPaginatedProperties(
  response: BackendPaginatedResponse<BackendProperty>
): PaginatedResponse<Property> {
  const totalPages = Math.ceil(response.total / response.page_size);
  return {
    items: response.items.map(transformProperty),
    total: response.total,
    page: response.page,
    pageSize: response.page_size,
    totalPages,
    hasMore: response.page < totalPages,
  };
}
