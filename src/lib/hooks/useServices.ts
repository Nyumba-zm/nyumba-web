// src/lib/hooks/useServices.ts

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceProviderService } from '@/lib/api';
import { queryKeys } from './queryKeys';
import type {
  ServiceProviderFilters,
  CreateBookingDto,
  ServiceCategory,
} from '@/types/service';

/**
 * Hook to search for service providers
 */
export function useServiceProviders(filters?: ServiceProviderFilters) {
  return useQuery({
    queryKey: queryKeys.services.providers.list(filters?.category),
    queryFn: () => serviceProviderService.getProviders(filters),
  });
}

/**
 * Hook to get providers by category
 */
export function useProvidersByCategory(category: ServiceCategory) {
  return useQuery({
    queryKey: queryKeys.services.providers.list(category),
    queryFn: () => serviceProviderService.getProvidersByCategory(category),
    enabled: !!category,
  });
}

/**
 * Hook to get a single service provider
 */
export function useServiceProvider(providerId: string) {
  return useQuery({
    queryKey: queryKeys.services.providers.detail(providerId),
    queryFn: () => serviceProviderService.getProviderById(providerId),
    enabled: !!providerId,
  });
}

/**
 * Hook to get available time slots for a provider
 */
export function useProviderAvailability(providerId: string, date: string) {
  return useQuery({
    queryKey: queryKeys.services.providers.availability(providerId, date),
    queryFn: () => serviceProviderService.getAvailableSlots(providerId, date),
    enabled: !!providerId && !!date,
  });
}

/**
 * Hook to create a service booking
 */
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookingDto) => serviceProviderService.createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.services.bookings.all(),
      });
    },
  });
}

/**
 * Hook to get user's service bookings
 */
export function useMyBookings() {
  return useQuery({
    queryKey: queryKeys.services.bookings.list(),
    queryFn: () => serviceProviderService.getMyBookings(),
  });
}

/**
 * Hook to get a single booking
 */
export function useBooking(bookingId: string) {
  return useQuery({
    queryKey: queryKeys.services.bookings.detail(bookingId),
    queryFn: () => serviceProviderService.getBookingById(bookingId),
    enabled: !!bookingId,
  });
}

/**
 * Hook to cancel a booking
 */
export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, reason }: { bookingId: string; reason?: string }) =>
      serviceProviderService.cancelBooking(bookingId, reason),
    onSuccess: (booking) => {
      queryClient.setQueryData(
        queryKeys.services.bookings.detail(booking.id),
        booking
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.services.bookings.list(),
      });
    },
  });
}

/**
 * Hook to reschedule a booking
 */
export function useRescheduleBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, newDate }: { bookingId: string; newDate: string }) =>
      serviceProviderService.rescheduleBooking(bookingId, newDate),
    onSuccess: (booking) => {
      queryClient.setQueryData(
        queryKeys.services.bookings.detail(booking.id),
        booking
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.services.bookings.list(),
      });
    },
  });
}
