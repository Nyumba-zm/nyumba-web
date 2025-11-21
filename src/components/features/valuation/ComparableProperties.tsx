"use client";

import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

interface ComparableProperty {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  distance: number; // in km
  soldDate?: string;
}

interface ComparablePropertiesProps {
  comparables: ComparableProperty[];
  className?: string;
}

export function ComparableProperties({
  comparables,
  className,
}: ComparablePropertiesProps) {
  return (
    <div
      className={cn("bg-white rounded-lg border border-gray-200", className)}
    >
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Comparable Properties
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Similar properties in the area used for valuation
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {comparables.map((comp) => (
          <div key={comp.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">{comp.title}</h4>
              <span className="text-sm text-gray-500">
                {comp.distance} km away
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{comp.bedrooms} beds</span>
                <span>{comp.bathrooms} baths</span>
                <span>{comp.area} m²</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(comp.price)}
                </p>
                {comp.soldDate && (
                  <p className="text-xs text-gray-500">Sold {comp.soldDate}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
