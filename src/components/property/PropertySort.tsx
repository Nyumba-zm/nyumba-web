"use client";

import type { Property } from "@/types/property";

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "bedrooms", label: "Most bedrooms" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

/**
 * The backend returns newest first and has no sort parameter, so other orders are
 * applied to the current page of results only.
 */
export function sortProperties(properties: Property[], sort: SortOption): Property[] {
  switch (sort) {
    case "price-asc":
      return [...properties].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...properties].sort((a, b) => b.price - a.price);
    case "bedrooms":
      return [...properties].sort((a, b) => b.bedrooms - a.bedrooms);
    case "newest":
      return properties;
  }
}

interface PropertySortProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
  totalResults: number;
}

export function PropertySort({ value, onChange, totalResults }: PropertySortProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <p className="text-gray-600">
        <span className="font-semibold text-gray-900">{totalResults}</span>{" "}
        {totalResults === 1 ? "property" : "properties"} found
      </p>

      <div className="flex items-center gap-2">
        <label htmlFor="property-sort" className="text-sm text-gray-600">
          Sort by:
        </label>
        <select
          id="property-sort"
          value={value}
          onChange={(e) =>
            onChange(SORT_OPTIONS.find((option) => option.value === e.target.value)?.value ?? "newest")
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
