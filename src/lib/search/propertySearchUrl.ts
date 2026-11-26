// src/lib/search/propertySearchUrl.ts
//
// The /properties URL is the single source of truth for search filters, so searches
// are shareable and the landing-page search can deep-link into results.

import { LISTING_TYPES, PROPERTY_TYPES, type PropertySearchParams } from '@/types/property';

export const SEARCH_PAGE_SIZE = 12;

type ReadableParams = Pick<URLSearchParams, 'get'>;

function readText(params: ReadableParams, key: string): string | undefined {
  const value = params.get(key)?.trim();
  return value ? value : undefined;
}

function readPositiveInt(params: ReadableParams, key: string): number | undefined {
  const value = Number(params.get(key));
  return Number.isInteger(value) && value > 0 ? value : undefined;
}

function readEnum<T extends string>(
  params: ReadableParams,
  key: string,
  allowed: readonly T[]
): T | undefined {
  const value = params.get(key);
  return allowed.find((candidate) => candidate === value);
}

export function parsePropertySearchUrl(params: ReadableParams): PropertySearchParams {
  return {
    area: readText(params, 'area'),
    city: readText(params, 'city'),
    province: readText(params, 'province'),
    listingType: readEnum(params, 'listingType', LISTING_TYPES),
    propertyType: readEnum(params, 'propertyType', PROPERTY_TYPES),
    priceMin: readPositiveInt(params, 'minPrice'),
    priceMax: readPositiveInt(params, 'maxPrice'),
    bedroomsMin: readPositiveInt(params, 'minBedrooms'),
    page: readPositiveInt(params, 'page'),
  };
}

export function buildPropertySearchUrl(search: PropertySearchParams): string {
  const entries: [string, string | number | undefined][] = [
    ['area', search.area],
    ['city', search.city],
    ['province', search.province],
    ['listingType', search.listingType],
    ['propertyType', search.propertyType],
    ['minPrice', search.priceMin],
    ['maxPrice', search.priceMax],
    ['minBedrooms', search.bedroomsMin],
    ['page', search.page && search.page > 1 ? search.page : undefined],
  ];
  const query = new URLSearchParams();
  for (const [key, value] of entries) {
    if (value !== undefined && value !== '') query.set(key, String(value));
  }
  const queryString = query.toString();
  return queryString ? `/properties?${queryString}` : '/properties';
}
