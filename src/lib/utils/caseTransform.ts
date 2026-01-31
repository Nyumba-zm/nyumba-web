// src/lib/utils/caseTransform.ts

/**
 * Utility functions for transforming between snake_case (backend) and camelCase (frontend)
 */

type Primitive = string | number | boolean | null | undefined;
type JsonValue = Primitive | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

/**
 * Converts a snake_case string to camelCase
 */
export function snakeToCamelString(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Converts a camelCase string to snake_case
 */
export function camelToSnakeString(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * Recursively transforms all keys in an object from snake_case to camelCase
 */
export function snakeToCamel<T>(obj: unknown): T {
  if (obj === null || obj === undefined) {
    return obj as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => snakeToCamel(item)) as T;
  }

  if (typeof obj === 'object' && obj !== null) {
    const transformed: JsonObject = {};
    for (const [key, value] of Object.entries(obj)) {
      const camelKey = snakeToCamelString(key);
      transformed[camelKey] = snakeToCamel(value);
    }
    return transformed as T;
  }

  return obj as T;
}

/**
 * Recursively transforms all keys in an object from camelCase to snake_case
 */
export function camelToSnake<T>(obj: unknown): T {
  if (obj === null || obj === undefined) {
    return obj as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => camelToSnake(item)) as T;
  }

  if (typeof obj === 'object' && obj !== null) {
    const transformed: JsonObject = {};
    for (const [key, value] of Object.entries(obj)) {
      const snakeKey = camelToSnakeString(key);
      transformed[snakeKey] = camelToSnake(value);
    }
    return transformed as T;
  }

  return obj as T;
}

/**
 * Transforms API response data from snake_case to camelCase
 * Use this in API response interceptors
 */
export function transformResponse<T>(data: unknown): T {
  return snakeToCamel<T>(data);
}

/**
 * Transforms request data from camelCase to snake_case
 * Use this in API request interceptors
 */
export function transformRequest<T>(data: unknown): T {
  return camelToSnake<T>(data);
}

/**
 * Transforms query parameters from camelCase to snake_case
 * Handles flat objects only (no nested objects in query params)
 */
export function transformQueryParams(
  params: Record<string, unknown> | undefined
): Record<string, unknown> | undefined {
  if (!params) return undefined;

  const transformed: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      const snakeKey = camelToSnakeString(key);
      transformed[snakeKey] = value;
    }
  }
  return transformed;
}
