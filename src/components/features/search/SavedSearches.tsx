"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

interface SavedSearch {
  id: string;
  name: string;
  filters: {
    location: string;
    priceRange: string;
    bedrooms: string;
  };
  resultCount: number;
  lastChecked: string;
  alertsEnabled: boolean;
}

interface SavedSearchesProps {
  searches: SavedSearch[];
  onLoad?: (searchId: string) => void;
  onDelete?: (searchId: string) => void;
  onToggleAlerts?: (searchId: string) => void;
  className?: string;
}

export function SavedSearches({
  searches,
  onLoad,
  onDelete,
  onToggleAlerts,
  className,
}: SavedSearchesProps) {
  if (searches.length === 0) {
    return (
      <div
        className={cn(
          "bg-white rounded-lg border border-gray-200 p-8 text-center",
          className
        )}
      >
        <div className="text-4xl mb-3">🔍</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Saved Searches
        </h3>
        <p className="text-sm text-gray-600">
          Save your searches to quickly access them later and get alerts for new
          listings.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn("bg-white rounded-lg border border-gray-200", className)}
    >
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Saved Searches</h3>
      </div>

      <div className="divide-y divide-gray-100">
        {searches.map((search) => (
          <div
            key={search.id}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {search.name}
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>📍 {search.filters.location}</p>
                  <p>💰 {search.filters.priceRange}</p>
                  <p>🛏️ {search.filters.bedrooms}</p>
                </div>
              </div>

              <button
                onClick={() => onToggleAlerts?.(search.id)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  search.alertsEnabled
                    ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                    : "text-gray-400 hover:bg-gray-100"
                )}
                title={
                  search.alertsEnabled ? "Alerts enabled" : "Alerts disabled"
                }
              >
                🔔
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                {search.resultCount} properties • Last checked{" "}
                {search.lastChecked}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onLoad?.(search.id)}
                >
                  Load
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete?.(search.id)}
                  className="text-red-600 hover:text-red-700 hover:border-red-300"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
