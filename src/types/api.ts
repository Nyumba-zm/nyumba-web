// src/types/api.ts

/**
 * Backend API error format
 */
export interface BackendValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface BackendApiError {
  detail: string | BackendValidationError[];
}

/**
 * Frontend error format (transformed)
 */
export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  details?: BackendValidationError[];
  fieldErrors?: Record<string, string>;
}

/**
 * Backend pagination format (snake_case)
 */
export interface BackendPaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
}

/**
 * Frontend pagination format (camelCase, with computed fields)
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

/**
 * Pagination query parameters
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

/**
 * Sort parameters
 */
export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Generic query parameters
 */
export interface QueryParams {
  [key: string]: string | number | boolean | undefined | null | string[];
}

/**
 * Currency types supported by the platform
 */
export type CurrencyCode = 'ZMW' | 'USD' | 'EUR' | 'GBP';

/**
 * Default currency for the platform
 */
export const DEFAULT_CURRENCY: CurrencyCode = 'ZMW';

/**
 * Price object used in API responses
 */
export interface Price {
  amount: number;
  currency: CurrencyCode;
}

/**
 * Backend price format (snake_case)
 */
export interface BackendPrice {
  amount: number;
  currency: string;
}

/**
 * Transform backend pagination to frontend format
 */
export function transformPagination<T, B>(
  response: BackendPaginatedResponse<B>,
  transformItem: (item: B) => T
): PaginatedResponse<T> {
  const totalPages = Math.ceil(response.total / response.page_size);
  return {
    items: response.items.map(transformItem),
    total: response.total,
    page: response.page,
    pageSize: response.page_size,
    totalPages,
    hasMore: response.page < totalPages,
  };
}
