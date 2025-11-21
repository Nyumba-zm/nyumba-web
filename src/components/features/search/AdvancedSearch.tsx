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
        "bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
        <h3 className="text-lg font-bold text-white">Advanced Search</h3>
        <p className="text-primary-100 text-sm">Find your perfect property</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Location Search */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            📍 Location
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
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            💰 Price Range (ZMW)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: Number(e.target.value) })
              }
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: Number(e.target.value) })
              }
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            🛏️ Bedrooms
          </label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => handleBedroomToggle(count)}
                className={cn(
                  "flex-1 min-w-[60px] px-4 py-2.5 rounded-lg border-2 font-semibold transition-all",
                  filters.bedrooms.includes(count)
                    ? "bg-primary-700 text-white border-primary-700 shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:border-primary-400 hover:bg-primary-50"
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
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
        >
          <span className="text-sm font-semibold text-gray-900">
            {isExpanded ? "Hide" : "Show"} Advanced Filters
          </span>
          <span className="text-primary-600 text-xl">
            {isExpanded ? "−" : "+"}
          </span>
        </button>

        {isExpanded && (
          <div className="space-y-6 pt-2 border-t border-gray-200">
            {/* Property Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                🏠 Property Type
              </label>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleTypeToggle(type)}
                    className={cn(
                      "px-4 py-2 rounded-lg border-2 font-medium transition-all text-sm text-black",
                      filters.propertyType.includes(type)
                        ? "text-black border-primary-700 shadow-md"
                        : "bg-black hover:border-primary-400 hover:bg-primary-50"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                ✨ Amenities
              </label>
              <div className="flex flex-wrap gap-2">
                {amenitiesList.map((amenity) => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity)}
                    className={cn(
                      "px-4 py-2 rounded-lg border-2 font-medium transition-all text-sm",
                      filters.amenities.includes(amenity)
                        ? "bg-primary-700 text-white border-primary-700 shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:border-primary-400 hover:bg-primary-50"
                    )}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>

            {/* Verified Only */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border-2 border-green-200">
              <input
                type="checkbox"
                id="verifiedOnly"
                checked={filters.verifiedOnly}
                onChange={(e) =>
                  setFilters({ ...filters, verifiedOnly: e.target.checked })
                }
                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
              />
              <label
                htmlFor="verifiedOnly"
                className="text-sm font-medium text-gray-900 cursor-pointer"
              >
                ✓ Show only verified listings
              </label>
            </div>
          </div>
        )}

        {/* Search Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full !bg-primary-700 hover:!bg-primary-800 !text-white text-lg py-3"
        >
          🔍 Search Properties
        </Button>
      </form>
    </div>
  );
}
