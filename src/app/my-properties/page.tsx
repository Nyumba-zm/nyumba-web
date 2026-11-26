"use client";

import { AuthGuard } from "@/components/auth";
import { useMyProperties, usePublishProperty } from "@/lib/hooks";
import { getErrorMessage } from "@/lib/errors/apiError";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ErrorState } from "@/components/shared/ErrorState";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import Link from "next/link";

function MyPropertiesContent() {
  const { data: propertiesData, isLoading, error, refetch } = useMyProperties();
  const publishProperty = usePublishProperty();
  const { addToast } = useToast();

  const properties = propertiesData?.items ?? [];

  const handlePublish = (propertyId: string) => {
    publishProperty.mutate(propertyId, {
      onSuccess: () => addToast("Listing published", "success"),
      onError: (publishError) => addToast(getErrorMessage(publishError), "error"),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
              <p className="text-gray-600 mt-1">
                Manage your property listings
              </p>
            </div>
            <Link href="/sell">
              <Button>Add New Property</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {error ? (
          <ErrorState
            title="Couldn't load your listings"
            message={getErrorMessage(error)}
            onRetry={() => refetch()}
          />
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-4 animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
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
              No Properties Yet
            </h2>
            <p className="text-gray-600 mb-8">
              Start listing your properties to reach potential buyers and renters
            </p>
            <Link href="/sell">
              <Button size="lg">List Your First Property</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {properties.length} of {propertiesData?.total ?? 0}{" "}
                {propertiesData?.total === 1 ? "listing" : "listings"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div key={property.id} className="relative">
                  <PropertyCard property={property} />

                  {property.status === "draft" && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => handlePublish(property.id)}
                        disabled={publishProperty.isPending}
                      >
                        Publish
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function MyPropertiesPage() {
  return (
    <AuthGuard>
      <MyPropertiesContent />
    </AuthGuard>
  );
}
