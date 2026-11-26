// src/types/api.ts

/**
 * One entry of a request-validation failure, as produced by the backend's
 * RequestValidationError handler (nyumba-backend/src/nyumba/main.py).
 * `field` is the Pydantic location joined with " → ", e.g. "body → address → province".
 */
export interface BackendFieldError {
  field: string;
  message: string;
  type: string;
}

/**
 * Error body returned by the backend for every non-2xx response.
 * - 422 request validation: `{detail: "Validation error", errors: [...]}`
 * - 422 domain validation:  `{detail, field}`
 * - 409 business rule:      `{detail, rule}`
 * - everything else:        `{detail}`
 */
export interface BackendApiError {
  detail: string;
  errors?: BackendFieldError[];
  field?: string | null;
  rule?: string;
}

/**
 * Frontend pagination shape (camelCase, with computed fields).
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
 * Pagination query parameters (frontend).
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

/**
 * Currencies the backend accepts (`Currency` enum in shared_kernel).
 */
export type CurrencyCode = 'ZMW' | 'USD';

export const DEFAULT_CURRENCY: CurrencyCode = 'ZMW';
