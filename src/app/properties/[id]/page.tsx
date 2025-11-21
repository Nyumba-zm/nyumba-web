"use client";

import { useState } from "react";
import { mockProperties } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils/format";
import { Button } from "@/components/ui/Button";
import { ContactModal } from "@/components/property/ContactModal";
import { VerificationBadge } from "@/components/features/verification";
import {
  PropertyValuation,
  ComparableProperties,
} from "@/components/features/valuation";
import { NeighborhoodInsights } from "@/components/features/neighborhood";
import { LoanCalculator } from "@/components/features/finance";
import {
  mockNeighborhoodData,
  mockComparableProperties,
} from "@/lib/mockFeatureData";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function PropertyDetailPage() {
  const params = useParams();
  const property = mockProperties.find((p) => p.id === params.id);
  const [showContactModal, setShowContactModal] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The property you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/properties">
            <Button>Back to Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  const primaryImage =
    property.images.find((img) => img.isPrimary) || property.images[0];

  // Mock verification status (would come from backend in production)
  const isVerified = property.isFeatured; // Using featured as proxy for verified

  // Mock valuation data
  const estimatedValue = property.price * 1.05; // Slight variance
  const pricePerSqm = Math.round(property.price / property.squareMeters);

  // Get neighborhood data
  const neighborhoodKey = property.neighborhood
    .toLowerCase()
    .replace(/\s+/g, "") as keyof typeof mockNeighborhoodData;
  const neighborhoodData =
    mockNeighborhoodData[neighborhoodKey] || mockNeighborhoodData.kabulonga;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="relative h-96 md:h-[500px] w-full">
        <Image
          src={primaryImage?.url || "/placeholder.jpg"}
          alt={property.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {property.isFeatured && (
          <div className="absolute top-4 left-4 bg-secondary-500 text-gray-900 text-sm font-bold px-4 py-2 rounded-full">
            Featured Property
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="mr-2"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {property.address}, {property.neighborhood}, {property.city}
                  </p>
                </div>
                <VerificationBadge isVerified={isVerified} type="listing" />
              </div>

              <div className="text-4xl font-bold text-primary-500 mb-6">
                {formatCurrency(property.price)}
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {property.bedrooms}
                  </div>
                  <div className="text-gray-600 text-sm">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {property.bathrooms}
                  </div>
                  <div className="text-gray-600 text-sm">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {property.squareMeters}
                  </div>
                  <div className="text-gray-600 text-sm">Square Meters</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Amenities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center text-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="mr-2 text-primary-500"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="mr-2 text-primary-500"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AI Valuation Section */}
            <PropertyValuation
              estimatedValue={estimatedValue}
              confidenceLevel="high"
              pricePerSqm={pricePerSqm}
              comparableCount={mockComparableProperties.length}
              className="mb-6"
            />

            {/* Comparable Properties */}
            <ComparableProperties
              comparables={mockComparableProperties}
              className="mb-6"
            />

            {/* Neighborhood Insights */}
            <NeighborhoodInsights data={neighborhoodData} className="mb-6" />

            {/* Loan Calculator */}
            <LoanCalculator propertyPrice={property.price} className="mb-6" />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Interested in this property?
              </h3>

              <div className="space-y-3 mb-6">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setShowContactModal(true)}
                >
                  Schedule a Tour
                </Button>
                <Button
                  className="w-full"
                  size="lg"
                  variant="outline"
                  onClick={() => setShowContactModal(true)}
                >
                  Contact Agent
                </Button>
                <Button className="w-full" size="lg" variant="outline">
                  Save Property
                </Button>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Property Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type:</span>
                    <span className="font-medium text-gray-900 capitalize">
                      {property.propertyType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listing Type:</span>
                    <span className="font-medium text-gray-900 capitalize">
                      {property.listingType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600 capitalize">
                      {property.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Views:</span>
                    <span className="font-medium text-gray-900">
                      {property.viewCount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t mt-6 pt-6">
                <Link href="/properties">
                  <Button variant="outline" className="w-full">
                    ← Back to All Properties
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <ContactModal
          property={property}
          onClose={() => setShowContactModal(false)}
        />
      )}
    </div>
  );
}
