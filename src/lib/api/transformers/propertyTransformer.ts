// src/lib/api/transformers/propertyTransformer.ts
//
// The only mapping between backend property JSON and frontend models.

import type { PaginatedResponse } from '@/types/api';
import type {
  BackendCreatePropertyRequest,
  BackendProperty,
  BackendPropertyDetail,
  BackendPropertyList,
  BackendPropertySearchParams,
  BackendUpdatePropertyRequest,
  CreatePropertyDto,
  Property,
  PropertyDetail,
  PropertySearchParams,
  UpdatePropertyDto,
} from '@/types/property';

function optional<T>(value: T | null | undefined): T | undefined {
  return value ?? undefined;
}

function blankToUndefined(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function transformProperty(backend: BackendProperty): Property {
  return {
    id: backend.id,
    title: backend.title,
    description: backend.description,
    propertyType: backend.property_type,
    listingType: backend.listing_type,
    price: Number(backend.price_amount),
    currency: backend.price_currency,
    isNegotiable: backend.is_negotiable,
    street: backend.address_street,
    area: optional(backend.address_area),
    city: backend.address_city,
    province: backend.address_province,
    country: backend.address_country,
    latitude: optional(backend.latitude),
    longitude: optional(backend.longitude),
    bedrooms: backend.bedrooms,
    bathrooms: backend.bathrooms,
    areaSqm: Number(backend.area_sqm),
    yearBuilt: optional(backend.year_built),
    images: backend.images.map((url, index) => ({ url, isPrimary: index === 0 })),
    amenities: backend.amenities,
    status: backend.status,
    isVerified: backend.is_verified,
    viewCount: backend.view_count,
    lastConfirmedAvailableAt: optional(backend.last_confirmed_available_at),
  };
}

export function transformPropertyDetail(backend: BackendPropertyDetail): PropertyDetail {
  return {
    ...transformProperty(backend),
    seller: {
      name: backend.seller_name,
      phone: optional(backend.seller_phone),
      email: backend.seller_email,
      whatsappLink: optional(backend.seller_whatsapp_link),
    },
  };
}

export function transformPropertyList(
  response: BackendPropertyList
): PaginatedResponse<Property> {
  const totalPages = Math.max(1, Math.ceil(response.total / response.page_size));
  return {
    items: response.properties.map(transformProperty),
    total: response.total,
    page: response.page,
    pageSize: response.page_size,
    totalPages,
    hasMore: response.page < totalPages,
  };
}

export function transformCreatePropertyToBackend(
  dto: CreatePropertyDto
): BackendCreatePropertyRequest {
  return {
    title: dto.title,
    description: dto.description,
    property_type: dto.propertyType,
    listing_type: dto.listingType,
    address: {
      street: dto.street,
      city: dto.city,
      province: dto.province,
      area: blankToUndefined(dto.area),
      country: 'Zambia',
    },
    coordinates:
      dto.latitude !== undefined && dto.longitude !== undefined
        ? { latitude: dto.latitude, longitude: dto.longitude }
        : undefined,
    price_amount: dto.price,
    price_currency: dto.currency,
    is_negotiable: dto.isNegotiable,
    bedrooms: dto.bedrooms,
    bathrooms: dto.bathrooms,
    area_sqm: dto.areaSqm,
    year_built: dto.yearBuilt,
    amenities: dto.amenities,
  };
}

export function transformUpdatePropertyToBackend(
  dto: UpdatePropertyDto
): BackendUpdatePropertyRequest {
  return {
    title: dto.title,
    description: dto.description,
    price_amount: dto.price,
    price_currency: dto.currency,
    is_negotiable: dto.isNegotiable,
    bedrooms: dto.bedrooms,
    bathrooms: dto.bathrooms,
    area_sqm: dto.areaSqm,
    year_built: dto.yearBuilt,
    amenities: dto.amenities,
  };
}

export function transformSearchParamsToBackend(
  params: PropertySearchParams
): BackendPropertySearchParams {
  return {
    area: blankToUndefined(params.area),
    city: blankToUndefined(params.city),
    province: blankToUndefined(params.province),
    listing_type: params.listingType,
    property_type: params.propertyType,
    min_price: params.priceMin,
    max_price: params.priceMax,
    min_bedrooms: params.bedroomsMin,
    page: params.page,
    page_size: params.pageSize,
  };
}
