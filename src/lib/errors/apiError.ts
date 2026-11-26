// src/lib/errors/apiError.ts

import type { BackendApiError, BackendFieldError } from '@/types/api';

/**
 * Error codes for API errors
 */
export type ApiErrorCode =
  | 'NETWORK_ERROR'
  | 'TIMEOUT_ERROR'
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'SERVER_ERROR'
  | 'UNKNOWN_ERROR';

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code: ApiErrorCode;
  public readonly details?: BackendFieldError[];

  constructor(
    message: string,
    statusCode: number,
    code: ApiErrorCode = 'UNKNOWN_ERROR',
    details?: BackendFieldError[]
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;

    // Maintains proper stack trace for where error was thrown (V8 only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  /**
   * Create an ApiError from a backend error body. The body is `unknown` because
   * proxies and crashed servers can return HTML or nothing at all.
   */
  static fromResponse(body: unknown, statusCode: number): ApiError {
    const code = getErrorCode(statusCode);
    if (!isBackendApiError(body)) {
      return new ApiError(getDefaultErrorMessage(statusCode), statusCode, code);
    }
    if (body.errors?.length) {
      const message = body.errors
        .map((err) => `${fieldName(err.field)}: ${err.message}`)
        .join('; ');
      return new ApiError(message, statusCode, 'VALIDATION_ERROR', body.errors);
    }
    return new ApiError(body.detail, statusCode, code);
  }

  /**
   * Create a network error
   */
  static networkError(message: string = 'Network error. Please check your connection.'): ApiError {
    return new ApiError(message, 0, 'NETWORK_ERROR');
  }

  /**
   * Create a timeout error
   */
  static timeoutError(message: string = 'Request timed out. Please try again.'): ApiError {
    return new ApiError(message, 0, 'TIMEOUT_ERROR');
  }

  /**
   * Check if this is a validation error
   */
  isValidationError(): boolean {
    return this.code === 'VALIDATION_ERROR';
  }

  /**
   * Check if this is an authentication error
   */
  isAuthError(): boolean {
    return this.code === 'UNAUTHORIZED' || this.code === 'FORBIDDEN';
  }

  /**
   * Check if this is a not found error
   */
  isNotFoundError(): boolean {
    return this.code === 'NOT_FOUND';
  }

  /**
   * Check if this is a server error
   */
  isServerError(): boolean {
    return this.code === 'SERVER_ERROR';
  }

  /**
   * Check if this is a rate limit error
   */
  isRateLimitError(): boolean {
    return this.code === 'RATE_LIMITED';
  }

  /**
   * Field-level messages keyed by the last path segment (e.g. `province`).
   */
  getFieldErrors(): Record<string, string> {
    const result: Record<string, string> = {};
    for (const err of this.details ?? []) {
      result[fieldName(err.field)] = err.message;
    }
    return result;
  }

  /**
   * Get a user-friendly error message
   */
  getUserMessage(): string {
    switch (this.code) {
      case 'NETWORK_ERROR':
        return 'Unable to connect. Please check your internet connection.';
      case 'TIMEOUT_ERROR':
        return 'The request took too long. Please try again.';
      case 'UNAUTHORIZED':
        return 'Please log in to continue.';
      case 'FORBIDDEN':
        return 'You do not have permission to perform this action.';
      case 'NOT_FOUND':
        return 'The requested resource was not found.';
      case 'CONFLICT':
        return this.message || 'This action conflicts with the current state.';
      case 'RATE_LIMITED':
        return 'Too many requests. Please wait a moment and try again.';
      case 'SERVER_ERROR':
        return 'Something went wrong on our end. Please try again later.';
      case 'VALIDATION_ERROR':
        return this.message || 'Please check your input and try again.';
      default:
        return this.message || 'An unexpected error occurred.';
    }
  }
}

/** Last segment of a backend field path, e.g. "body → address → province" → "province". */
function fieldName(path: string): string {
  const segments = path.split(' → ');
  return segments[segments.length - 1];
}

function isBackendApiError(body: unknown): body is BackendApiError {
  return (
    typeof body === 'object' &&
    body !== null &&
    typeof (body as { detail?: unknown }).detail === 'string'
  );
}

function getDefaultErrorMessage(status: number): string {
  if (status === 401) return 'Authentication required. Please log in.';
  if (status === 403) return 'You do not have permission to perform this action.';
  if (status === 404) return 'The requested resource was not found.';
  if (status === 429) return 'Too many requests. Please try again later.';
  if (status >= 500) return 'Server error. Please try again later.';
  return 'An unexpected error occurred.';
}

/**
 * Get error code from HTTP status code
 */
function getErrorCode(statusCode: number): ApiErrorCode {
  switch (statusCode) {
    case 400:
    case 422:
      return 'VALIDATION_ERROR';
    case 401:
      return 'UNAUTHORIZED';
    case 403:
      return 'FORBIDDEN';
    case 404:
      return 'NOT_FOUND';
    case 409:
      return 'CONFLICT';
    case 429:
      return 'RATE_LIMITED';
    default:
      if (statusCode >= 500) return 'SERVER_ERROR';
      return 'UNKNOWN_ERROR';
  }
}

/**
 * Type guard to check if an error is an ApiError
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * Safely extract error message from unknown error
 */
export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.getUserMessage();
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred.';
}
