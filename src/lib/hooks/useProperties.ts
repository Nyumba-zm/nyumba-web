'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertiesApi } from '@/lib/api/properties';
import type { PropertySearchParams } from '@/types/property';

export function useProperties(params?: PropertySearchParams) {
  return useQuery({
    queryKey: ['properties', params],
    queryFn: () => propertiesApi.getProperties(params),
  });
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => propertiesApi.getPropertyById(id),
    enabled: !!id,
  });
}

export function useSaveProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: propertiesApi.saveProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['saved-properties'] });
    },
  });
}