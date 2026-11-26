"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useProperty, useSavedPropertyIds } from "@/lib/hooks";
import { getErrorMessage, isApiError } from "@/lib/errors/apiError";
import { formatCurrency, formatRelativeTime } from "@/lib/utils/format";
import { buildWhatsAppEnquiryLink, formatFullAddress, listingUrl } from "@/lib/utils/property";
import {
  LISTING_TYPE_LABELS,
  PROPERTY_STATUS_LABELS,
  PROPERTY_TYPE_LABELS,
} from "@/types/property";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { ContactModal } from "@/components/property/ContactModal";
import { VerificationBadge } from "@/components/features/verification";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";

function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50" aria-busy="true">
      <div className="h-72 md:h-[500px] w-full bg-gray-200 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 space-y-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2" />
            <div className="h-12 bg-gray-200 rounded animate-pulse w-1/3" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const propertyId = params.id;
  const { addToast } = useToast();
  const [showContactModal, setShowContactModal] = useState(false);
  const { isSaved, toggleSaved } = useSavedPropertyIds();
  const { data: property, isLoading, error, refetch } = useProperty(propertyId);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (error && !(isApiError(error) && error.isNotFoundError())) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <ErrorState
          title="Couldn't load this property"
          message={getErrorMessage(error)}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <EmptyState
          title="Property not found"
          description="This listing doesn't exist or is no longer available."
          actionLabel="Browse properties"
          actionHref="/properties"
        />
      </div>
    );
  }

  const [primaryImage, ...otherImages] = property.images;
  const saved = isSaved(property.id);
  const whatsAppHref = property.seller.whatsappLink
    ? buildWhatsAppEnquiryLink(property.seller.whatsappLink, property, listingUrl(property.id))
    : undefined;

  const handleSave = () => {
    const nowSaved = toggleSaved(property.id);
    addToast(nowSaved ? "Saved on this device" : "Removed from saved", nowSaved ? "success" : "info");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-72 md:h-[500px] w-full bg-gray-200">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={property.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">No photos yet</div>
        )}
      </div>

      {otherImages.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 flex gap-3 overflow-x-auto">
          {otherImages.map((image, index) => (
            <a
              key={image.url}
              href={image.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-md"
            >
              <Image
                src={image.url}
                alt={`${property.title} photo ${index + 2}`}
                fill
                className="object-cover"
                unoptimized
              />
            </a>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <p className="text-gray-600">{formatFullAddress(property)}</p>
                </div>
                <VerificationBadge isVerified={property.isVerified} type="listing" />
              </div>

              <div className="text-4xl font-bold text-primary-500 mb-2">
                {formatCurrency(property.price, property.currency)}
                {property.listingType === "rent" && (
                  <span className="text-lg text-gray-500 font-normal">/month</span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-6">
                {property.isNegotiable ? "Negotiable" : "Fixed price"}
                {property.lastConfirmedAvailableAt &&
                  ` · Confirmed available ${formatRelativeTime(property.lastConfirmedAvailableAt)}`}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                  <div className="text-gray-600 text-sm">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                  <div className="text-gray-600 text-sm">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{property.areaSqm}</div>
                  <div className="text-gray-600 text-sm">Square Metres</div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {property.amenities.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity) => (
                      <li key={amenity} className="flex items-center text-gray-700 capitalize">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="mr-2 text-primary-500"
                          aria-hidden="true"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {amenity.replace(/_/g, " ")}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
              <strong>No viewing fees on Nyumba.</strong> Never pay anyone to view a property.
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Interested?</h3>
              <p className="text-sm text-gray-600 mb-4">Listed by {property.seller.name}</p>

              <div className="space-y-3 mb-6">
                {whatsAppHref && (
                  <a href={whatsAppHref} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white" size="lg">
                      WhatsApp the seller
                    </Button>
                  </a>
                )}
                <Button
                  className="w-full"
                  size="lg"
                  variant={whatsAppHref ? "outline" : "primary"}
                  onClick={() => setShowContactModal(true)}
                >
                  Contact options
                </Button>
                <Button
                  className="w-full"
                  size="lg"
                  variant="outline"
                  onClick={handleSave}
                  aria-pressed={saved}
                >
                  {saved ? "Saved" : "Save property"}
                </Button>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Property Details</h4>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Property Type</dt>
                    <dd className="font-medium text-gray-900">
                      {PROPERTY_TYPE_LABELS[property.propertyType]}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Listing</dt>
                    <dd className="font-medium text-gray-900">
                      {LISTING_TYPE_LABELS[property.listingType]}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Status</dt>
                    <dd className="font-medium text-gray-900">
                      {PROPERTY_STATUS_LABELS[property.status]}
                    </dd>
                  </div>
                  {property.yearBuilt && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Year Built</dt>
                      <dd className="font-medium text-gray-900">{property.yearBuilt}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Views</dt>
                    <dd className="font-medium text-gray-900">{property.viewCount}</dd>
                  </div>
                </dl>
              </div>

              <div className="border-t mt-6 pt-6">
                <Link href="/properties">
                  <Button variant="outline" className="w-full">
                    ← Back to all properties
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showContactModal && (
        <ContactModal property={property} onClose={() => setShowContactModal(false)} />
      )}
    </div>
  );
}
