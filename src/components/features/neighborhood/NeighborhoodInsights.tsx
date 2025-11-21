"use client";

import { cn } from "@/lib/utils/cn";

interface NeighborhoodData {
  area: string;
  safetyScore: number; // 1-10
  amenities: {
    schools: number;
    hospitals: number;
    shopping: number;
    restaurants: number;
  };
  distanceToCenter: number; // in km
  publicTransport: "excellent" | "good" | "fair" | "limited";
  description: string;
}

interface NeighborhoodInsightsProps {
  data: NeighborhoodData;
  className?: string;
}

export function NeighborhoodInsights({
  data,
  className,
}: NeighborhoodInsightsProps) {
  const transportColors = {
    excellent: "text-green-700 bg-green-50",
    good: "text-blue-700 bg-blue-50",
    fair: "text-yellow-700 bg-yellow-50",
    limited: "text-orange-700 bg-orange-50",
  };

  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 p-6",
        className
      )}
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        About {data.area}
      </h3>

      <p className="text-gray-600 mb-6">{data.description}</p>

      {/* Safety Score */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Safety Score
          </span>
          <span className="text-sm font-semibold text-gray-900">
            {data.safetyScore}/10
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${data.safetyScore * 10}%` }}
          />
        </div>
      </div>

      {/* Amenities */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            🏫
          </div>
          <div>
            <p className="text-sm text-gray-500">Schools</p>
            <p className="font-semibold text-gray-900">
              {data.amenities.schools} nearby
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            🏥
          </div>
          <div>
            <p className="text-sm text-gray-500">Hospitals</p>
            <p className="font-semibold text-gray-900">
              {data.amenities.hospitals} nearby
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            🛍️
          </div>
          <div>
            <p className="text-sm text-gray-500">Shopping</p>
            <p className="font-semibold text-gray-900">
              {data.amenities.shopping} centers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            🍴
          </div>
          <div>
            <p className="text-sm text-gray-500">Restaurants</p>
            <p className="font-semibold text-gray-900">
              {data.amenities.restaurants}+ options
            </p>
          </div>
        </div>
      </div>

      {/* Transport & Distance */}
      <div className="pt-4 border-t border-gray-200 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Distance to City Center</span>
          <span className="font-semibold text-gray-900">
            {data.distanceToCenter} km
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Public Transport</span>
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium capitalize",
              transportColors[data.publicTransport]
            )}
          >
            {data.publicTransport}
          </span>
        </div>
      </div>
    </div>
  );
}
