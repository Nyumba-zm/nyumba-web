"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

interface SearchFilters {
  location: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number[];
  propertyType: string[];
  amenities: string[];
  verifiedOnly: boolean;
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  className?: string;
}

const propertyTypes = ["House", "Apartment", "Townhouse", "Land", "Commercial"];
const amenitiesList = [
  "Pool",
  "Garage",
  "Garden",
  "Security",
  "Gym",
  "Backup Power",
];

export function AdvancedSearch({ onSearch, className }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    minPrice: 0,
    maxPrice: 10000000,
    bedrooms: [],
    propertyType: [],
    amenities: [],
    verifiedOnly: false,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleBedroomToggle = (count: number) => {
    setFilters((prev) => ({
      ...prev,
      bedrooms: prev.bedrooms.includes(count)
        ? prev.bedrooms.filter((b) => b !== count)
        : [...prev.bedrooms, count],
    }));
  };

  const handleTypeToggle = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      propertyType: prev.propertyType.includes(type)
        ? prev.propertyType.filter((t) => t !== type)
        : [...prev.propertyType, type],
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 shadow-lg",
        className
      )}
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Location Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <Input
            type="text"
            placeholder="Enter location (e.g., Lusaka, Kabulonga)"
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
            className="w-full"
          />
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Price (ZMW)
            </label>
            <Input
              type="number"
              placeholder="0"
              value={filters.minPrice || ""}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price (ZMW)
            </label>
            <Input
              type="number"
              placeholder="10,000,000"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: Number(e.target.value) })
              }
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => handleBedroomToggle(count)}
                className={cn(
                  "px-4 py-2 rounded-lg border transition-colors",
                  filters.bedrooms.includes(count)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                )}
              >
                {count}+
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 text-sm font-medium hover:text-blue-700"
        >
          {isExpanded ? "− Hide" : "+ Show"} Advanced Filters
        </button>

        {isExpanded && (
          <>
            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleTypeToggle(type)}
                    className={cn(
                      "px-4 py-2 rounded-lg border transition-colors text-sm",
                      filters.propertyType.includes(type)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities
              </label>
              <div className="flex flex-wrap gap-2">
                {amenitiesList.map((amenity) => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity)}
                    className={cn(
                      "px-4 py-2 rounded-lg border transition-colors text-sm",
                      filters.amenities.includes(amenity)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                    )}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>

            {/* Verified Only */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="verifiedOnly"
                checked={filters.verifiedOnly}
                onChange={(e) =>
                  setFilters({ ...filters, verifiedOnly: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="verifiedOnly" className="text-sm text-gray-700">
                Show only verified listings
              </label>
            </div>
          </>
        )}

        {/* Search Button */}
        <Button type="submit" className="w-full">
          Search Properties
        </Button>
      </form>
    </div>
  );
}
