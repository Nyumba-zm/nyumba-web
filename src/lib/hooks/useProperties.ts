// src/lib/hooks/useProperties.ts

'use client';

import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { propertyService } from '@/lib/api';
import { isApiError } from '@/lib/errors/apiError';
import { queryKeys } from './queryKeys';
import type { PaginationParams } from '@/types/api';
import type { CreatePropertyDto, PropertySearchParams, UpdatePropertyDto } from '@/types/property';

/** Search active listings (GET /properties). */
export function useProperties(params: PropertySearchParams = {}) {
  return useQuery({
    queryKey: queryKeys.properties.list(params),
    queryFn: () => propertyService.search(params),
  });
}

/** A single listing with seller contact (GET /properties/{id}). */
export function useProperty(id: string) {
  return useQuery({
    queryKey: queryKeys.properties.detail(id),
    queryFn: () => propertyService.getById(id),
    enabled: Boolean(id),
    // A 404 is an answer, not a transient failure.
    retry: (failureCount, error) =>
      !(isApiError(error) && error.isNotFoundError()) && failureCount < 2,
  });
}

/** Several listings by id — used for device-saved listings. Missing ones are dropped. */
export function usePropertiesByIds(ids: readonly string[]) {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: queryKeys.properties.detail(id),
      queryFn: () => propertyService.getById(id),
      retry: false,
    })),
    combine: (results) => ({
      properties: results.flatMap((result) => (result.data ? [result.data] : [])),
      isLoading: results.some((result) => result.isLoading),
    }),
  });
}

/** The caller's own listings in every status (GET /properties/mine). */
export function useMyProperties(params: PaginationParams = {}) {
  return useQuery({
    queryKey: queryKeys.properties.mine(params),
    queryFn: () => propertyService.getMine(params),
  });
}

function useInvalidateProperties() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: queryKeys.properties.all });
}

export interface CreateListingInput {
  data: CreatePropertyDto;
  images: File[];
}

export interface CreateListingResult {
  propertyId: string;
  /** False when no photos were added: the listing stays a draft (publishing needs ≥1 image). */
  published: boolean;
}

/**
 * Full listing flow against the backend: create draft → upload photos → publish.
 * Without photos the listing is left as a draft the owner can publish later.
 */
export function useCreateListing() {
  const invalidate = useInvalidateProperties();
  return useMutation({
    mutationFn: async ({ data, images }: CreateListingInput): Promise<CreateListingResult> => {
      const property = await propertyService.create(data);
      if (images.length === 0) {
        return { propertyId: property.id, published: false };
      }
      await propertyService.uploadImages(property.id, images);
      await propertyService.publish(property.id);
      return { propertyId: property.id, published: true };
    },
    onSettled: invalidate,
  });
}

/** PUT /properties/{id}. */
export function useUpdateProperty() {
  const invalidate = useInvalidateProperties();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePropertyDto }) =>
      propertyService.update(id, data),
    onSuccess: invalidate,
  });
}

/** POST /properties/{id}/images. */
export function useUploadPropertyImages() {
  const invalidate = useInvalidateProperties();
  return useMutation({
    mutationFn: ({ propertyId, files }: { propertyId: string; files: File[] }) =>
      propertyService.uploadImages(propertyId, files),
    onSuccess: invalidate,
  });
}

/** POST /properties/{id}/publish. */
export function usePublishProperty() {
  const invalidate = useInvalidateProperties();
  return useMutation({
    mutationFn: (propertyId: string) => propertyService.publish(propertyId),
    onSuccess: invalidate,
  });
}
