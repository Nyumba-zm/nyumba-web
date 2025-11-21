"use client";

import { useState, useMemo } from "react";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { PropertyFilters } from "@/components/property/PropertyFilters";
import { PropertySort } from "@/components/property/PropertySort";
import { AdvancedSearch, SavedSearches } from "@/components/features/search";
import { mockSavedSearches } from "@/lib/mockFeatureData";
import { mockProperties } from "@/lib/mockData";
import { PropertyType, ListingType } from "@/types/property";
import { Button } from "@/components/ui/Button";

export default function PropertiesPage() {
  // For now, use mock data. Later, use the API:
  // const { data, isLoading } = useProperties();

  const [filters, setFilters] = useState({
    searchQuery: "",
    propertyType: "all" as PropertyType | "all",
    listingType: "all" as ListingType | "all",
    priceMin: "",
    priceMax: "",
    bedrooms: "",
    bathrooms: "",
  });

  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"standard" | "advanced">("standard");
  const isLoading = false;

  // Filter properties
  const filteredProperties = useMemo(() => {
    let filtered = [...mockProperties];

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.neighborhood.toLowerCase().includes(query) ||
          p.city.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query)
      );
    }

    // Property type filter
    if (filters.propertyType !== "all") {
      filtered = filtered.filter(
        (p) => p.propertyType === filters.propertyType
      );
    }

    // Listing type filter
    if (filters.listingType !== "all") {
      filtered = filtered.filter((p) => p.listingType === filters.listingType);
    }

    // Price range filter (apply after listing type to handle different price scales)
    if (filters.priceMin) {
      const minPrice = parseInt(filters.priceMin);
      filtered = filtered.filter((p) => p.price >= minPrice);
    }
    if (filters.priceMax) {
      const maxPrice = parseInt(filters.priceMax);
      filtered = filtered.filter((p) => p.price <= maxPrice);
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      filtered = filtered.filter(
        (p) => p.bedrooms >= parseInt(filters.bedrooms)
      );
    }

    // Bathrooms filter
    if (filters.bathrooms) {
      filtered = filtered.filter(
        (p) => p.bathrooms >= parseInt(filters.bathrooms)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "bedrooms":
        filtered.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      case "popular":
        filtered.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case "newest":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Browse Properties
            </h1>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "standard" ? "primary" : "outline"}
                onClick={() => setViewMode("standard")}
              >
                Standard Search
              </Button>
              <Button
                variant={viewMode === "advanced" ? "primary" : "outline"}
                onClick={() => setViewMode("advanced")}
              >
                Advanced Search
              </Button>
            </div>
          </div>
          <p className="text-lg text-gray-600">
            Find your perfect home from thousands of listings across Zambia
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        {viewMode === "standard" ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <PropertyFilters filters={filters} onFilterChange={setFilters} />
            </div>

            {/* Properties List */}
            <div className="lg:col-span-3">
              <PropertySort
                onSortChange={setSortBy}
                totalResults={filteredProperties.length}
              />

              <PropertyGrid
                properties={filteredProperties}
                isLoading={isLoading}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Advanced Search & Saved Searches */}
            <div className="lg:col-span-1 space-y-6">
              <AdvancedSearch
                onSearch={(searchFilters) => {
                  console.log("Advanced search:", searchFilters);
                  // TODO: Apply advanced filters
                }}
              />

              <SavedSearches
                searches={mockSavedSearches}
                onLoad={(id) => console.log("Load search:", id)}
                onDelete={(id) => console.log("Delete search:", id)}
                onToggleAlerts={(id) => console.log("Toggle alerts:", id)}
              />
            </div>

            {/* Properties List */}
            <div className="lg:col-span-2">
              <PropertySort
                onSortChange={setSortBy}
                totalResults={filteredProperties.length}
              />

              <PropertyGrid
                properties={filteredProperties}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
