"use client";

import Link from "next/link";
import Image from "next/image";
import type { Property } from "@/types/property";
import { formatCurrency } from "@/lib/utils/format";
import { formatLocation } from "@/lib/utils/property";
import { useSavedPropertyIds } from "@/lib/hooks";
import { useToast } from "@/components/ui/Toast";
import { Badge } from "@/components/ui/Badge";
import { VerificationBadge } from "@/components/features/verification";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { addToast } = useToast();
  const { isSaved, toggleSaved } = useSavedPropertyIds();
  const saved = isSaved(property.id);
  const primaryImage = property.images.find((img) => img.isPrimary) ?? property.images[0];

  const handleSaveClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const nowSaved = toggleSaved(property.id);
    addToast(nowSaved ? "Saved on this device" : "Removed from saved", nowSaved ? "success" : "info");
  };

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
        <div className="relative h-56 bg-gray-100 dark:bg-gray-700">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={property.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500 dark:text-gray-400">
              No photo yet
            </div>
          )}

          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {property.status === "rented" && (
              <Badge variant="danger" size="md">
                Rented
              </Badge>
            )}
            {property.status === "sold" && (
              <Badge variant="danger" size="md">
                Sold
              </Badge>
            )}
            {property.status === "draft" && (
              <Badge variant="warning" size="md">
                Draft
              </Badge>
            )}
          </div>

          {property.isVerified && (
            <div className="absolute bottom-2 left-2">
              <VerificationBadge isVerified type="listing" />
            </div>
          )}

          <button
            type="button"
            onClick={handleSaveClick}
            aria-label={saved ? "Remove from saved" : "Save property"}
            aria-pressed={saved}
            className="absolute top-2 right-2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={saved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              className={saved ? "text-red-500" : "text-gray-600 dark:text-gray-300"}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {formatCurrency(property.price, property.currency)}
            {property.listingType === "rent" && (
              <span className="text-base text-gray-600 dark:text-gray-400">/month</span>
            )}
          </p>

          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">
            {property.title}
          </h3>

          <div className="flex space-x-4 text-gray-600 dark:text-gray-400 mb-3 text-sm">
            <span>
              <strong className="text-gray-900 dark:text-gray-200">{property.bedrooms}</strong> beds
            </span>
            <span>
              <strong className="text-gray-900 dark:text-gray-200">{property.bathrooms}</strong> baths
            </span>
            <span>
              <strong className="text-gray-900 dark:text-gray-200">{property.areaSqm}</strong> m²
            </span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-sm">{formatLocation(property)}</p>
        </div>
      </div>
    </Link>
  );
}
