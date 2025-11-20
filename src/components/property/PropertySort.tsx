"use client";

import { Property } from "@/types/property";

interface PropertySortProps {
  onSortChange: (sortBy: string) => void;
  totalResults: number;
}

export function PropertySort({
  onSortChange,
  totalResults,
}: PropertySortProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="text-gray-600">
        <span className="font-semibold text-gray-900">{totalResults}</span>{" "}
        properties found
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Sort by:</label>
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="bedrooms">Most Bedrooms</option>
          <option value="popular">Most Viewed</option>
        </select>
      </div>
    </div>
  );
}
