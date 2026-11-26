// src/lib/hooks/useAuth.ts

'use client';

import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AUTH_LOGOUT_EVENT, authService } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { queryKeys } from './queryKeys';
import type { LoginCredentials, RegisterData } from '@/types/user';

/** GET /auth/me, kept in sync with the auth store. */
export function useCurrentUser() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);

  return useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: async () => {
      const user = await authService.getCurrentUser();
      setUser(user);
      return user;
    },
    enabled: isAuthenticated,
    retry: false,
  });
}

/**
 * Login. On success the store flips to authenticated and GuestGuard performs the
 * redirect (honouring ?returnUrl=).
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.user(), user);
      setUser(user);
    },
  });
}

/** Register then log in; redirect handled by GuestGuard as for login. */
export function useRegister() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.user(), user);
      setUser(user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: async () => authService.logout(),
    onSuccess: () => {
      logout();
      queryClient.clear();
      router.push('/login');
    },
  });
}

/**
 * Clears client auth state when the API client gives up on refreshing the session.
 * Mount once, near the root.
 */
export function useSessionExpiryHandler() {
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const onExpired = () => {
      logout();
      queryClient.removeQueries({ queryKey: queryKeys.auth.all });
    };
    window.addEventListener(AUTH_LOGOUT_EVENT, onExpired);
    return () => window.removeEventListener(AUTH_LOGOUT_EVENT, onExpired);
  }, [logout, queryClient]);
}
