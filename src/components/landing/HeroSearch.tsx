'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LocationAutocomplete } from './LocationAutocomplete';
import { QuickFilterPills } from './QuickFilterPills';
import { useFilterStore } from '@/store/filterStore';
import { cn } from '@/lib/utils/cn';
import type { ListingType, PropertyType } from '@/types/property';

export function HeroSearch() {
  const router = useRouter();
  const { setFilters, resetFilters } = useFilterStore();

  const [location, setLocation] = useState('');
  const [city, setCity] = useState<string | undefined>();
  const [listingType, setListingType] = useState<ListingType>('sale');
  const [propertyType, setPropertyType] = useState<PropertyType | undefined>();

  const handleLocationChange = (display: string, cityValue?: string) => {
    setLocation(display);
    setCity(cityValue);
  };

  const handleSearch = () => {
    resetFilters();

    const filters: Record<string, string | undefined> = {};

    if (city) filters.city = city;
    if (listingType) filters.listingType = listingType;
    if (propertyType) filters.propertyType = propertyType;
    if (location && !city) filters.searchQuery = location;

    setFilters(filters as Parameters<typeof setFilters>[0]);

    // Build query string
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (listingType) params.set('type', listingType);
    if (propertyType) params.set('property', propertyType);
    if (location) params.set('q', location);

    const queryString = params.toString();
    router.push(`/properties${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <div className={cn(
      "w-full max-w-3xl mx-auto",
      "bg-white/95 dark:bg-stone-800/95",
      "backdrop-blur-sm",
      "rounded-2xl shadow-2xl",
      "p-6 md:p-8"
    )}>
      {/* Filter Pills */}
      <QuickFilterPills
        selectedListingType={listingType}
        selectedPropertyType={propertyType}
        onListingTypeChange={setListingType}
        onPropertyTypeChange={setPropertyType}
      />

      {/* Search Input */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <LocationAutocomplete
            value={location}
            onChange={handleLocationChange}
            placeholder="Search by city or neighborhood..."
          />
        </div>
        <button
          onClick={handleSearch}
          className={cn(
            "px-8 py-4 rounded-xl",
            "bg-primary-600 hover:bg-primary-700",
            "text-white font-semibold text-lg",
            "shadow-lg shadow-primary-600/25",
            "transition-all duration-200",
            "hover:shadow-xl hover:shadow-primary-600/30",
            "active:scale-[0.98]",
            "flex items-center justify-center gap-2"
          )}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Search</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>1,800+ Verified Properties</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Trusted Platform</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>98% Satisfaction Rate</span>
        </div>
      </div>
    </div>
  );
}
