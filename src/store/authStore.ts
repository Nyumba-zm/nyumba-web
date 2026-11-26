// src/store/authStore.ts
//
// Holds who is logged in. Tokens are NOT stored here — they live only in
// `tokenStorage` (src/lib/api/client.ts) so a token refresh can never leave a stale copy.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/user';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  /** Retained for AuthGuard/GuestGuard; true while a session check is in flight. */
  isLoading: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: true, isLoading: false }),
      logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
