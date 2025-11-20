"use client";

import { Input } from "@/components/ui/Input";
import { PropertyType, ListingType } from "@/types/property";

interface PropertyFiltersProps {
  filters: {
    searchQuery: string;
    propertyType: PropertyType | "all";
    listingType: ListingType | "all";
    priceMin: string;
    priceMax: string;
    bedrooms: string;
    bathrooms: string;
  };
  onFilterChange: (filters: PropertyFiltersProps["filters"]) => void;
}

export function PropertyFilters({
  filters,
  onFilterChange,
}: PropertyFiltersProps) {
  const updateFilter = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  // Dynamic price placeholders based on listing type
  const isRental = filters.listingType === "rent";
  const priceMinPlaceholder = isRental
    ? "Min (e.g., 5000)"
    : "Min (e.g., 1000000)";
  const priceMaxPlaceholder = isRental
    ? "Max (e.g., 20000)"
    : "Max (e.g., 5000000)";
  const priceStep = isRental ? 1000 : 100000;
  const priceLabel = isRental ? "Monthly Rent (ZMW)" : "Price (ZMW)";
  const priceHint = isRental
    ? "Enter monthly rent (e.g., 8500 for 8.5K ZMW/month)"
    : "Enter price in full (e.g., 2500000 for 2.5M ZMW)";

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Filter Properties
      </h3>

      {/* Search */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search
        </label>
        <Input
          type="text"
          placeholder="Search by location, title..."
          value={filters.searchQuery}
          onChange={(e) => updateFilter("searchQuery", e.target.value)}
        />
      </div>

      {/* Listing Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Listing Type
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={filters.listingType}
          onChange={(e) => updateFilter("listingType", e.target.value)}
        >
          <option value="all">All</option>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>
      </div>

      {/* Property Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Type
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={filters.propertyType}
          onChange={(e) => updateFilter("propertyType", e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="townhouse">Townhouse</option>
          <option value="land">Land</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {priceLabel}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder={priceMinPlaceholder}
            value={filters.priceMin}
            onChange={(e) => updateFilter("priceMin", e.target.value)}
            min="0"
            step={priceStep}
          />
          <Input
            type="number"
            placeholder={priceMaxPlaceholder}
            value={filters.priceMax}
            onChange={(e) => updateFilter("priceMax", e.target.value)}
            min="0"
            step={priceStep}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">{priceHint}</p>
      </div>

      {/* Bedrooms */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bedrooms
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={filters.bedrooms}
          onChange={(e) => updateFilter("bedrooms", e.target.value)}
        >
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
      </div>

      {/* Bathrooms */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bathrooms
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={filters.bathrooms}
          onChange={(e) => updateFilter("bathrooms", e.target.value)}
        >
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>

      {/* Reset Button */}
      <button
        onClick={() =>
          onFilterChange({
            searchQuery: "",
            propertyType: "all",
            listingType: "all",
            priceMin: "",
            priceMax: "",
            bedrooms: "",
            bathrooms: "",
          })
        }
        className="w-full px-4 py-2 text-sm text-primary-500 border border-primary-500 rounded-lg hover:bg-primary-50 transition"
      >
        Reset Filters
      </button>
    </div>
  );
}
