"use client";

import { PropertyGrid } from "@/components/property/PropertyGrid";
import { mockProperties } from "@/lib/mockData";
import { ListingType } from "@/types/property";

export default function RentPage() {
  // Filter properties for rent
  const rentProperties = mockProperties.filter(
    (property) => property.listingType === ListingType.RENT
  );

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
        {rentProperties.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Rental Properties Available
            </h2>
            <p className="text-gray-600 mb-8">
              We currently don&apos;t have any properties available for rent.
              Check back soon or browse our properties for sale.
            </p>
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
