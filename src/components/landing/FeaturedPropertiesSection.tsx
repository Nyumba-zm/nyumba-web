'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFeaturedProperties } from '@/lib/hooks/useProperties';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { cn } from '@/lib/utils/cn';
import type { ListingType } from '@/types/property';

type TabType = 'all' | ListingType;

const tabs: { value: TabType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
];

export function FeaturedPropertiesSection() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const { data: properties, isLoading } = useFeaturedProperties(9);

  const filteredProperties = properties?.filter((property) => {
    if (activeTab === 'all') return true;
    return property.listingType === activeTab;
  }) || [];

  return (
    <section className="py-16 lg:py-24 bg-stone-50 dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-50">
              Featured Properties
            </h2>
            <p className="mt-2 text-stone-600 dark:text-stone-400">
              Handpicked properties for you to explore
            </p>
          </div>

          <Link
            href="/properties"
            className={cn(
              "inline-flex items-center gap-2",
              "text-primary-600 dark:text-primary-400 font-medium",
              "hover:text-primary-700 dark:hover:text-primary-300",
              "transition-colors"
            )}
          >
            View All Properties
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "px-5 py-2 rounded-lg font-medium text-sm transition-all",
                activeTab === tab.value
                  ? "bg-primary-600 text-white shadow-md"
                  : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <PropertyGrid properties={filteredProperties} isLoading={isLoading} />

        {/* Empty State for filtered results */}
        {!isLoading && filteredProperties.length === 0 && properties && properties.length > 0 && (
          <div className="text-center py-12">
            <p className="text-stone-600 dark:text-stone-400">
              No {activeTab === 'sale' ? 'properties for sale' : 'rental properties'} found.
            </p>
            <button
              onClick={() => setActiveTab('all')}
              className="mt-4 text-primary-600 dark:text-primary-400 font-medium hover:underline"
            >
              View all properties
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
