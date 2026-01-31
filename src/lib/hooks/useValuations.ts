// src/lib/hooks/useValuations.ts

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { valuationService } from '@/lib/api';
import { queryKeys } from './queryKeys';
import type { RequestValuationDto, QuickValuationDto } from '@/types/valuation';

/**
 * Hook to request a valuation for a property
 */
export function useRequestValuation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RequestValuationDto) => valuationService.requestValuation(data),
    onSuccess: (result, { propertyId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.valuations.property(propertyId),
      });
    },
  });
}

/**
 * Hook to get a quick valuation estimate
 */
export function useQuickValuation() {
  return useMutation({
    mutationFn: (data: QuickValuationDto) => valuationService.getQuickValuation(data),
  });
}

/**
 * Hook to get valuation history for a property
 */
export function useValuationHistory(propertyId: string) {
  return useQuery({
    queryKey: queryKeys.valuations.property(propertyId),
    queryFn: () => valuationService.getValuationHistory(propertyId),
    enabled: !!propertyId,
  });
}

/**
 * Hook to get comparable properties for a valuation
 */
export function useComparables(valuationId: string, limit: number = 5) {
  return useQuery({
    queryKey: queryKeys.valuations.comparables(valuationId),
    queryFn: () => valuationService.getComparables(valuationId, limit),
    enabled: !!valuationId,
  });
}

/**
 * Hook to get market trends for an area
 */
export function useMarketTrends(city: string, county?: string, months: number = 12) {
  return useQuery({
    queryKey: queryKeys.valuations.marketTrends(city, county),
    queryFn: () => valuationService.getMarketTrends(city, county, months),
    enabled: !!city,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}

/**
 * Hook to get neighborhood statistics
 */
export function useNeighborhoodStats(city: string) {
  return useQuery({
    queryKey: queryKeys.valuations.neighborhoodStats(city),
    queryFn: () => valuationService.getNeighborhoodStats(city),
    enabled: !!city,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}
