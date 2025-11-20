"use client";

import { useState, useMemo } from "react";
import { Property } from "@/types/property";
import { formatCurrency } from "@/lib/utils/format";
import Link from "next/link";
import Image from "next/image";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const primaryImage =
    property.images.find((img) => img.isPrimary) || property.images[0];

  // Check if property is saved
  const getSavedStatus = () => {
    if (typeof window === "undefined") return false;
    const savedProperties = JSON.parse(
      localStorage.getItem("savedProperties") || "[]"
    );
    return savedProperties.includes(property.id);
  };

  const [isSaved, setIsSaved] = useState(getSavedStatus);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const savedProperties = JSON.parse(
      localStorage.getItem("savedProperties") || "[]"
    );

    if (isSaved) {
      const updated = savedProperties.filter(
        (id: string) => id !== property.id
      );
      localStorage.setItem("savedProperties", JSON.stringify(updated));
      setIsSaved(false);
    } else {
      savedProperties.push(property.id);
      localStorage.setItem("savedProperties", JSON.stringify(savedProperties));
      setIsSaved(true);
    }
  };

  // Check if property is new (within last 7 days)
  const isNew = useMemo(() => {
    const now = new Date();
    const created = new Date(property.createdAt);
    const daysSinceCreated = Math.floor(
      (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysSinceCreated <= 7;
  }, [property.createdAt]);

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
        <div className="relative h-56">
          <Image
            src={primaryImage?.url || "/placeholder.jpg"}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {property.isFeatured && (
              <div className="bg-secondary-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                Featured
              </div>
            )}
            {isNew && (
              <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                New
              </div>
            )}
            {property.status === "sold" && (
              <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Sold
              </div>
            )}
          </div>

          {/* Save Heart Icon */}
          <button
            onClick={handleSaveClick}
            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isSaved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              className={isSaved ? "text-red-500" : "text-gray-600"}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <p className="text-2xl font-bold text-gray-900 mb-2">
            {formatCurrency(property.price)}
            {property.listingType === "rent" && (
              <span className="text-base text-gray-600">/month</span>
            )}
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {property.title}
          </h3>

          <div className="flex space-x-4 text-gray-600 mb-3 text-sm">
            <span>
              <strong>{property.bedrooms}</strong> beds
            </span>
            <span>
              <strong>{property.bathrooms}</strong> baths
            </span>
            <span>
              <strong>{property.squareMeters}</strong> m²
            </span>
          </div>

          <p className="text-gray-700 text-sm">
            {property.neighborhood}, {property.city}
          </p>
        </div>
      </div>
    </Link>
  );
}
