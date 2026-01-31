"use client";

import { useState, useEffect, useMemo } from "react";
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
import { useProperty, useSimilarProperties, useTrackPropertyView, useSaveProperty } from "@/lib/hooks";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/components/ui/Toast";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const { isAuthenticated } = useAuthStore();
  const { addToast } = useToast();
  const [showContactModal, setShowContactModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Fetch property from API
  const { data: apiProperty, isLoading, error } = useProperty(propertyId);
  const { data: similarProperties } = useSimilarProperties(propertyId, 4);
  const trackView = useTrackPropertyView();
  const saveProperty = useSaveProperty();

  // Track view on mount
  useEffect(() => {
    if (propertyId) {
      trackView.mutate(propertyId);
    }
  }, [propertyId]);

  // Use API data with mock fallback
  const property = useMemo(() => {
    if (apiProperty) {
      return apiProperty;
    }
    // Fallback to mock data
    return mockProperties.find((p) => p.id === propertyId);
  }, [apiProperty, propertyId]);

  const handleSaveProperty = () => {
    if (!isAuthenticated) {
      addToast("Please log in to save properties", "info");
      return;
    }

    saveProperty.mutate(propertyId, {
      onSuccess: () => {
        setIsSaved(!isSaved);
        addToast(isSaved ? "Property removed from saved" : "Property saved!", "success");
      },
      onError: () => {
        addToast("Failed to save property", "error");
      },
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Image skeleton */}
        <div className="h-96 md:h-[500px] w-full bg-gray-200 animate-pulse" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="h-10 bg-gray-200 rounded animate-pulse mb-4 w-3/4" />
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-6 w-1/2" />
                <div className="h-12 bg-gray-200 rounded animate-pulse mb-6 w-1/3" />
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="h-8 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The property you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/properties">
            <Button>Browse Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  const primaryImage =
    property.images.find((img) => img.isPrimary) || property.images[0];

  const isVerified = property.isVerified ?? property.isFeatured ?? false;

  // Valuation data
  const estimatedValue = property.price * 1.05;
  const squareMeters = property.squareMeters ?? property.areaSqm ?? 1;
  const pricePerSqm = Math.round(property.price / squareMeters);

  // Neighborhood data
  const neighborhood = property.neighborhood ?? property.city ?? "unknown";
  const neighborhoodKey = neighborhood
    .toLowerCase()
    .replace(/\s+/g, "") as keyof typeof mockNeighborhoodData;
  const neighborhoodData =
    mockNeighborhoodData[neighborhoodKey] || mockNeighborhoodData.kabulonga;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Error banner */}
      {error && (
        <div className="bg-yellow-50 border-b border-yellow-200 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-sm text-yellow-800">
              Some data may be outdated. Showing cached information.
            </p>
          </div>
        </div>
      )}

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
                    {property.address ?? property.street}, {neighborhood},{" "}
                    {property.city}
                  </p>
                </div>
                <VerificationBadge isVerified={isVerified} type="listing" />
              </div>

              <div className="text-4xl font-bold text-primary-500 mb-6">
                {formatCurrency(property.price)}
                {property.listingType === "rent" && (
                  <span className="text-lg text-gray-500 font-normal">/month</span>
                )}
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
                    {squareMeters}
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
              comparableCount={similarProperties?.length ?? mockComparableProperties.length}
              className="mb-6"
            />

            {/* Comparable Properties */}
            <ComparableProperties
              comparables={mockComparableProperties}
              className="mb-6"
            />

            {/* Neighborhood Insights */}
            <NeighborhoodInsights data={neighborhoodData} className="mb-6" />

            {/* Loan Calculator - only for sale properties */}
            {property.listingType === "sale" && (
              <LoanCalculator propertyPrice={property.price} className="mb-6" />
            )}
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
                <Button
                  className="w-full"
                  size="lg"
                  variant="outline"
                  onClick={handleSaveProperty}
                  disabled={saveProperty.isPending}
                >
                  {saveProperty.isPending
                    ? "Saving..."
                    : isSaved
                    ? "Saved"
                    : "Save Property"}
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
                      {property.viewCount ?? 0}
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
