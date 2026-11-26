"use client";

import { AuthGuard } from "@/components/auth";
import { useAuthStore } from "@/store/authStore";
import { useMyProperties, usePropertiesByIds, useSavedPropertyIds } from "@/lib/hooks";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

function DashboardContent() {
  const { user } = useAuthStore();
  const { data: myPropertiesData, isLoading: loadingMyProperties } = useMyProperties();
  const { savedIds } = useSavedPropertyIds();
  const { properties: savedProperties } = usePropertiesByIds(
    savedIds.slice(0, 3)
  );

  const myProperties = myPropertiesData?.items ?? [];
  const isSeller = user?.role === "seller" || user?.role === "agent" || user?.role === "admin";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome back, {user?.firstName || "User"}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your properties and account from here
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link href="/saved-properties">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Saved Properties</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {savedIds.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {isSeller && (
            <Link href="/my-properties">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">My Listings</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {loadingMyProperties ? "..." : (myPropertiesData?.total ?? 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
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
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties">
              <Button>Browse Properties</Button>
            </Link>
            {isSeller && (
              <Link href="/sell">
                <Button variant="outline">List a Property</Button>
              </Link>
            )}
            <Link href="/profile">
              <Button variant="outline">Edit Profile</Button>
            </Link>
          </div>
        </div>

        {/* Saved Properties Preview */}
        {savedProperties.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Saved Properties</h2>
              <Link
                href="/saved-properties"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}

        {/* My Properties Preview (for sellers) */}
        {isSeller && myProperties.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">My Properties</h2>
              <Link
                href="/my-properties"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myProperties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {savedIds.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No saved properties yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start browsing and save properties you&apos;re interested in
            </p>
            <Link href="/properties">
              <Button>Browse Properties</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
