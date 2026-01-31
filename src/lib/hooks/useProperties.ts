// src/lib/hooks/useProperties.ts

'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { propertyService } from '@/lib/api';
import { queryKeys } from './queryKeys';
import type {
  PropertySearchParams,
  CreatePropertyDto,
  UpdatePropertyDto,
} from '@/types/property';

/**
 * Hook to get paginated properties with filters
 */
export function useProperties(params?: PropertySearchParams) {
  return useQuery({
    queryKey: queryKeys.properties.list(params),
    queryFn: () => propertyService.getProperties(params),
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Hook for infinite scrolling properties
 */
export function useInfiniteProperties(params?: Omit<PropertySearchParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: queryKeys.properties.list(params),
    queryFn: ({ pageParam = 1 }) =>
      propertyService.getProperties({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });
}

/**
 * Hook to get a single property by ID
 */
export function useProperty(id: string) {
  return useQuery({
    queryKey: queryKeys.properties.detail(id),
    queryFn: () => propertyService.getPropertyById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get featured properties
 */
export function useFeaturedProperties(limit: number = 6) {
  return useQuery({
    queryKey: queryKeys.properties.featured(),
    queryFn: () => propertyService.getFeaturedProperties(limit),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to get similar properties
 */
export function useSimilarProperties(propertyId: string, limit: number = 4) {
  return useQuery({
    queryKey: queryKeys.properties.similar(propertyId),
    queryFn: () => propertyService.getSimilarProperties(propertyId, limit),
    enabled: !!propertyId,
  });
}

/**
 * Hook to get user's own properties
 */
export function useMyProperties(params?: PropertySearchParams) {
  return useQuery({
    queryKey: queryKeys.properties.my(),
    queryFn: () => propertyService.getMyProperties(params),
  });
}

/**
 * Hook to get saved/favorited properties
 */
export function useSavedProperties(params?: PropertySearchParams) {
  return useQuery({
    queryKey: queryKeys.properties.saved(),
    queryFn: () => propertyService.getSavedProperties(params),
  });
}

/**
 * Hook to create a new property
 */
export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePropertyDto) => propertyService.createProperty(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.properties.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.properties.my() });
    },
  });
}

/**
 * Hook to update a property
 */
export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePropertyDto }) =>
      propertyService.updateProperty(id, data),
    onSuccess: (property) => {
      queryClient.setQueryData(queryKeys.properties.detail(property.id), property);
      queryClient.invalidateQueries({ queryKey: queryKeys.properties.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.properties.my() });
    },
  });
}

/**
 * Hook to delete a property
 */
export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => propertyService.deleteProperty(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.properties.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.properties.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.properties.my() });
    },
  });
}

/**
 * Hook to toggle save/unsave a property
 */
export function useSaveProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (propertyId: string) => propertyService.toggleSaveProperty(propertyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.properties.saved() });
    },
  });
}

/**
 * Hook to upload property images
 */
export function useUploadPropertyImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      propertyId,
      files,
      onProgress,
    }: {
      propertyId: string;
      files: File[];
      onProgress?: (progress: number) => void;
    }) => propertyService.uploadImages(propertyId, files, onProgress),
    onSuccess: (_, { propertyId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.properties.detail(propertyId),
      });
    },
  });
}

/**
 * Hook to delete a property image
 */
export function useDeletePropertyImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ propertyId, imageId }: { propertyId: string; imageId: string }) =>
      propertyService.deleteImage(propertyId, imageId),
    onSuccess: (_, { propertyId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.properties.detail(propertyId),
      });
    },
  });
}

/**
 * Hook to track property view
 */
export function useTrackPropertyView() {
  return useMutation({
    mutationFn: (propertyId: string) => propertyService.incrementViewCount(propertyId),
  });
}

/**
 * Hook to update property status
 */
export function useUpdatePropertyStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ propertyId, status }: { propertyId: string; status: string }) =>
      propertyService.updateStatus(propertyId, status),
    onSuccess: (property) => {
      queryClient.setQueryData(queryKeys.properties.detail(property.id), property);
      queryClient.invalidateQueries({ queryKey: queryKeys.properties.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.properties.my() });
    },
  });
}
