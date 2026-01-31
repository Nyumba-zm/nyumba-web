// src/store/filterStore.ts

import { create } from 'zustand';
import type { PropertyFilters } from '@/types/property';

interface FilterStore {
  filters: PropertyFilters;
  setFilter: <K extends keyof PropertyFilters>(
    key: K,
    value: PropertyFilters[K]
  ) => void;
  setFilters: (filters: Partial<PropertyFilters>) => void;
  resetFilters: () => void;
  clearFilter: (key: keyof PropertyFilters) => void;
}

const initialFilters: PropertyFilters = {
  propertyType: undefined,
  listingType: undefined,
  priceMin: undefined,
  priceMax: undefined,
  bedroomsMin: undefined,
  bedroomsMax: undefined,
  bathroomsMin: undefined,
  bathroomsMax: undefined,
  city: undefined,
  county: undefined,
  amenities: undefined,
  searchQuery: undefined,
};

export const useFilterStore = create<FilterStore>((set) => ({
  filters: initialFilters,

  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    }));
  },

  resetFilters: () => {
    set({ filters: initialFilters });
  },

  clearFilter: (key) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: undefined,
      },
    }));
  },
}));