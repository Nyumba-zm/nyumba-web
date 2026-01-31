// src/lib/hooks/useTransactions.ts

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionService } from '@/lib/api';
import { queryKeys } from './queryKeys';
import type { CreateOfferDto, OfferFilters } from '@/types/transaction';

/**
 * Hook to get offers with filters
 */
export function useOffers(filters?: OfferFilters) {
  return useQuery({
    queryKey: queryKeys.transactions.offers.list(filters),
    queryFn: () => transactionService.getOffers(filters),
  });
}

/**
 * Hook to get sent offers
 */
export function useSentOffers() {
  return useQuery({
    queryKey: queryKeys.transactions.offers.sent(),
    queryFn: () => transactionService.getSentOffers(),
  });
}

/**
 * Hook to get received offers
 */
export function useReceivedOffers() {
  return useQuery({
    queryKey: queryKeys.transactions.offers.received(),
    queryFn: () => transactionService.getReceivedOffers(),
  });
}

/**
 * Hook to get a single offer by ID
 */
export function useOffer(offerId: string) {
  return useQuery({
    queryKey: queryKeys.transactions.offers.detail(offerId),
    queryFn: () => transactionService.getOfferById(offerId),
    enabled: !!offerId,
  });
}

/**
 * Hook to create a new offer
 */
export function useCreateOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOfferDto) => transactionService.createOffer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.transactions.offers.all(),
      });
    },
  });
}

/**
 * Hook to accept an offer
 */
export function useAcceptOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (offerId: string) => transactionService.acceptOffer(offerId),
    onSuccess: (offer) => {
      queryClient.setQueryData(
        queryKeys.transactions.offers.detail(offer.id),
        offer
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.transactions.offers.all(),
      });
    },
  });
}

/**
 * Hook to reject an offer
 */
export function useRejectOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (offerId: string) => transactionService.rejectOffer(offerId),
    onSuccess: (offer) => {
      queryClient.setQueryData(
        queryKeys.transactions.offers.detail(offer.id),
        offer
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.transactions.offers.all(),
      });
    },
  });
}

/**
 * Hook to counter an offer
 */
export function useCounterOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      offerId,
      counterAmount,
      message,
    }: {
      offerId: string;
      counterAmount: number;
      message?: string;
    }) => transactionService.counterOffer(offerId, counterAmount, message),
    onSuccess: (offer) => {
      queryClient.setQueryData(
        queryKeys.transactions.offers.detail(offer.id),
        offer
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.transactions.offers.all(),
      });
    },
  });
}

/**
 * Hook to withdraw an offer
 */
export function useWithdrawOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (offerId: string) => transactionService.withdrawOffer(offerId),
    onSuccess: (offer) => {
      queryClient.setQueryData(
        queryKeys.transactions.offers.detail(offer.id),
        offer
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.transactions.offers.all(),
      });
    },
  });
}
