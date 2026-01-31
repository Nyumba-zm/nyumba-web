// src/lib/errors/apiError.ts

import type { BackendApiError, BackendValidationError } from '@/types/api';

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
  | 'RATE_LIMITED'
  | 'SERVER_ERROR'
  | 'UNKNOWN_ERROR';

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code: ApiErrorCode;
  public readonly details?: BackendValidationError[];

  constructor(
    message: string,
    statusCode: number,
    code: ApiErrorCode = 'UNKNOWN_ERROR',
    details?: BackendValidationError[]
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
   * Create an ApiError from a backend error response
   */
  static fromResponse(response: BackendApiError, statusCode: number): ApiError {
    const code = getErrorCode(statusCode);

    if (typeof response.detail === 'string') {
      return new ApiError(response.detail, statusCode, code);
    }

    // Validation errors from backend
    const messages = response.detail.map(
      (err) => `${err.loc.slice(1).join('.')}: ${err.msg}`
    );
    return new ApiError(
      messages.join('; '),
      statusCode,
      'VALIDATION_ERROR',
      response.detail
    );
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
   * Get field-specific errors from validation details
   */
  getFieldErrors(): Record<string, string> {
    if (!this.details) return {};

    return this.details.reduce(
      (acc, err) => {
        // Get the field name (last element of loc, skipping 'body')
        const field = String(err.loc[err.loc.length - 1]);
        acc[field] = err.msg;
        return acc;
      },
      {} as Record<string, string>
    );
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

/**
 * Network error (when request fails to reach server)
 */
export class NetworkError extends ApiError {
  constructor(message: string = 'Network error. Please check your connection.') {
    super(message, 0, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
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
