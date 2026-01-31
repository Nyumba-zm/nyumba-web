"use client";

import { useState, useMemo } from "react";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { PropertyFilters } from "@/components/property/PropertyFilters";
import { PropertySort } from "@/components/property/PropertySort";
import { AdvancedSearch, SavedSearches } from "@/components/features/search";
import { mockSavedSearches } from "@/lib/mockFeatureData";
import { mockProperties } from "@/lib/mockData";
import { useProperties } from "@/lib/hooks";
import { PropertyType, ListingType, type PropertySearchParams } from "@/types/property";
import { Button } from "@/components/ui/Button";

export default function PropertiesPage() {
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

  // Build API params from UI filters
  const apiParams: PropertySearchParams = useMemo(() => {
    const params: PropertySearchParams = {};

    if (filters.propertyType !== "all") {
      params.propertyType = [filters.propertyType];
    }
    if (filters.listingType !== "all") {
      params.listingType = filters.listingType;
    }
    if (filters.priceMin) {
      params.priceMin = parseInt(filters.priceMin);
    }
    if (filters.priceMax) {
      params.priceMax = parseInt(filters.priceMax);
    }
    if (filters.bedrooms) {
      params.bedroomsMin = parseInt(filters.bedrooms);
    }
    if (filters.bathrooms) {
      params.bathroomsMin = parseInt(filters.bathrooms);
    }
    if (filters.searchQuery) {
      params.searchQuery = filters.searchQuery;
    }

    // Map sort options
    switch (sortBy) {
      case "price-low":
      case "price-high":
        params.sortBy = "price";
        break;
      case "popular":
        params.sortBy = "view_count";
        break;
      case "newest":
      default:
        params.sortBy = "created_at";
        break;
    }

    return params;
  }, [filters, sortBy]);

  // Fetch from API
  const { data: apiData, isLoading, error } = useProperties(apiParams);

  // Use API data with mock fallback
  const properties = useMemo(() => {
    // If API returned data, use it
    if (apiData?.items && apiData.items.length > 0) {
      let sorted = [...apiData.items];

      // Client-side sorting for price direction (API doesn't know asc/desc)
      if (sortBy === "price-high") {
        sorted.sort((a, b) => b.price - a.price);
      } else if (sortBy === "price-low") {
        sorted.sort((a, b) => a.price - b.price);
      }

      return sorted;
    }

    // Fallback to mock data with client-side filtering
    let filtered = [...mockProperties];

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          (p.neighborhood?.toLowerCase().includes(query) ?? false) ||
          p.city.toLowerCase().includes(query) ||
          (p.address?.toLowerCase().includes(query) ?? false)
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

    // Price range filter
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
        filtered.sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0));
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
  }, [apiData, filters, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
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
        {/* Error state - show warning but still display fallback data */}
        {error && !isLoading && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              Unable to load latest properties. Showing cached results.
            </p>
          </div>
        )}

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
                totalResults={properties.length}
              />

              <PropertyGrid
                properties={properties}
                isLoading={isLoading}
              />

              {/* Empty state */}
              {!isLoading && properties.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No properties found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilters({
                        searchQuery: "",
                        propertyType: "all",
                        listingType: "all",
                        priceMin: "",
                        priceMax: "",
                        bedrooms: "",
                        bathrooms: "",
                      })
                    }
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
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
                totalResults={properties.length}
              />

              <PropertyGrid
                properties={properties}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
