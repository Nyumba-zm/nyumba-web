"use client";

import { useMemo } from "react";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { mockProperties } from "@/lib/mockData";
import { useProperties } from "@/lib/hooks";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function RentPage() {
  // Fetch rental properties from API
  const { data: apiData, isLoading, error } = useProperties({ listingType: "rent" });

  // Use API data with mock fallback
  const rentProperties = useMemo(() => {
    if (apiData?.items && apiData.items.length > 0) {
      return apiData.items;
    }
    // Fallback to filtered mock data
    return mockProperties.filter((property) => property.listingType === "rent");
  }, [apiData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16" style={{ backgroundColor: "#0f766e" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#ffffff" }}
          >
            Properties for Rent
          </h1>
          <p className="text-lg md:text-xl" style={{ color: "#ffffff" }}>
            Find your perfect rental home in Lusaka and across Zambia
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Error state - show warning but still display fallback data */}
        {error && !isLoading && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              Unable to load latest properties. Showing cached results.
            </p>
          </div>
        )}

        {isLoading ? (
          <PropertyGrid properties={[]} isLoading={true} />
        ) : rentProperties.length === 0 ? (
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Rental Properties Available
            </h2>
            <p className="text-gray-600 mb-8">
              We currently don&apos;t have any properties available for rent.
              Check back soon or browse our properties for sale.
            </p>
            <Link href="/properties">
              <Button>Browse All Properties</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-gray-600">
                Showing {rentProperties.length}{" "}
                {rentProperties.length === 1 ? "property" : "properties"}
              </p>
            </div>
            <PropertyGrid properties={rentProperties} />
          </>
        )}
      </div>
    </div>
  );
}
