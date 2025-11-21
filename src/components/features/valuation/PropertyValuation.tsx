"use client";

import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

interface PropertyValuationProps {
  estimatedValue: number;
  confidenceLevel: "high" | "medium" | "low";
  pricePerSqm?: number;
  comparableCount?: number;
  className?: string;
}

export function PropertyValuation({
  estimatedValue,
  confidenceLevel,
  pricePerSqm,
  comparableCount = 3,
  className,
}: PropertyValuationProps) {
  const confidenceColors = {
    high: "text-green-600 bg-green-50",
    medium: "text-yellow-600 bg-yellow-50",
    low: "text-orange-600 bg-orange-50",
  };

  const confidenceLabels = {
    high: "High Confidence",
    medium: "Medium Confidence",
    low: "Low Confidence",
  };

  return (
    <div
      className={cn(
        "bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            Nyumba AI Estimate
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {formatCurrency(estimatedValue)}
          </p>
        </div>
        <div
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            confidenceColors[confidenceLevel]
          )}
        >
          {confidenceLabels[confidenceLevel]}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-100">
        {pricePerSqm && (
          <div>
            <p className="text-xs text-gray-500">Price per m²</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(pricePerSqm)}
            </p>
          </div>
        )}
        <div>
          <p className="text-xs text-gray-500">Based on</p>
          <p className="text-lg font-semibold text-gray-900">
            {comparableCount} comparables
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-blue-100">
        <p className="text-xs text-gray-500">
          AI-powered valuation based on location, size, amenities, and recent
          comparable sales.
        </p>
      </div>
    </div>
  );
}
