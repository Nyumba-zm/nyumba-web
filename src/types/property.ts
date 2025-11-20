// src/types/property.ts

export enum PropertyType {
  HOUSE = 'house',
  APARTMENT = 'apartment',
  TOWNHOUSE = 'townhouse',
  LAND = 'land',
  COMMERCIAL = 'commercial',
}

export enum PropertyStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  SOLD = 'sold',
  RENTED = 'rented',
}

export enum ListingType {
  SALE = 'sale',
  RENT = 'rent',
}

export interface PropertyImage {
  id: string;
  url: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  propertyType: PropertyType;
  listingType: ListingType;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  address: string;
  neighborhood: string;
  city: string;
  latitude?: number;
  longitude?: number;
  status: PropertyStatus;
  images: PropertyImage[];
  amenities: string[];
  features: string[];
  yearBuilt?: number;
  userId: string;
  agentId?: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  isFeatured: boolean;
}

export interface PropertyFilters {
  propertyType?: PropertyType[];
  listingType?: ListingType;
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number[];
  bathrooms?: number[];
  neighborhoods?: string[];
  amenities?: string[];
  searchQuery?: string;
}

export interface PropertySearchParams extends PropertyFilters {
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'createdAt' | 'viewCount';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedProperties {
  properties: Property[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}