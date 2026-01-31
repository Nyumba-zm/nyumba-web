'use client';

import { cn } from '@/lib/utils/cn';
import { ListingType, PropertyType } from '@/types/property';

interface QuickFilterPillsProps {
  selectedListingType?: ListingType;
  selectedPropertyType?: PropertyType;
  onListingTypeChange: (type: ListingType) => void;
  onPropertyTypeChange: (type: PropertyType | undefined) => void;
}

const listingTypes: { value: ListingType; label: string }[] = [
  { value: 'sale', label: 'Buy' },
  { value: 'rent', label: 'Rent' },
];

const propertyTypes: { value: PropertyType; label: string }[] = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'land', label: 'Land' },
  { value: 'commercial', label: 'Commercial' },
];

export function QuickFilterPills({
  selectedListingType = 'sale',
  selectedPropertyType,
  onListingTypeChange,
  onPropertyTypeChange,
}: QuickFilterPillsProps) {
  return (
    <div className="space-y-4">
      {/* Listing Type Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex bg-stone-100 dark:bg-stone-800 rounded-full p-1">
          {listingTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => onListingTypeChange(type.value)}
              className={cn(
                "px-6 py-2 rounded-full font-medium text-sm transition-all duration-200",
                selectedListingType === type.value
                  ? "bg-primary-600 text-white shadow-md"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {propertyTypes.map((type) => (
          <button
            key={type.value}
            onClick={() =>
              onPropertyTypeChange(selectedPropertyType === type.value ? undefined : type.value)
            }
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              selectedPropertyType === type.value
                ? "bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 border-2 border-primary-500"
                : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-2 border-stone-200 dark:border-stone-700 hover:border-primary-300 dark:hover:border-primary-700"
            )}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}
