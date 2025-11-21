"use client";

import { useState, useEffect, useRef } from "react";

interface AmenityScore {
  category: string;
  score: number;
  icon: string;
}

interface Facility {
  name: string;
  type: string;
  distance: number;
  rating: number;
  icon: string;
}

interface NeighborhoodData {
  name: string;
  safetyScore: number;
  walkability: number;
  transitScore: number;
  amenities: AmenityScore[];
  facilities: Facility[];
  averagePrice: number;
  priceChange: number;
  population: number;
}

export function NeighborhoodInsightsDemo() {
  const [selectedArea, setSelectedArea] = useState<string>("lusaka-central");
  const [animatedSafety, setAnimatedSafety] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const neighborhoods: Record<string, NeighborhoodData> = {
    "lusaka-central": {
      name: "Lusaka Central",
      safetyScore: 85,
      walkability: 78,
      transitScore: 82,
      amenities: [
        { category: "Schools", score: 90, icon: "🏫" },
        { category: "Healthcare", score: 85, icon: "🏥" },
        { category: "Shopping", score: 95, icon: "🛒" },
        { category: "Parks", score: 70, icon: "🌳" },
        { category: "Restaurants", score: 88, icon: "🍽️" },
      ],
      facilities: [
        {
          name: "International School of Lusaka",
          type: "School",
          distance: 1.2,
          rating: 4.8,
          icon: "🏫",
        },
        {
          name: "Levy Mwanawasa Hospital",
          type: "Hospital",
          distance: 2.5,
          rating: 4.5,
          icon: "🏥",
        },
        {
          name: "Manda Hill Shopping Mall",
          type: "Shopping",
          distance: 0.8,
          rating: 4.7,
          icon: "🛒",
        },
        {
          name: "Showgrounds Park",
          type: "Park",
          distance: 1.5,
          rating: 4.2,
          icon: "🌳",
        },
      ],
      averagePrice: 1200000,
      priceChange: 8.5,
      population: 45000,
    },
    kabulonga: {
      name: "Kabulonga",
      safetyScore: 92,
      walkability: 65,
      transitScore: 70,
      amenities: [
        { category: "Schools", score: 95, icon: "🏫" },
        { category: "Healthcare", score: 90, icon: "🏥" },
        { category: "Shopping", score: 80, icon: "🛒" },
        { category: "Parks", score: 85, icon: "🌳" },
        { category: "Restaurants", score: 92, icon: "🍽️" },
      ],
      facilities: [
        {
          name: "American International School",
          type: "School",
          distance: 0.9,
          rating: 4.9,
          icon: "🏫",
        },
        {
          name: "Fairview Hospital",
          type: "Hospital",
          distance: 1.8,
          rating: 4.6,
          icon: "🏥",
        },
        {
          name: "East Park Mall",
          type: "Shopping",
          distance: 2.2,
          rating: 4.8,
          icon: "🛒",
        },
      ],
      averagePrice: 1850000,
      priceChange: 12.3,
      population: 28000,
    },
  };

  const currentNeighborhood = neighborhoods[selectedArea];

  // Handle area changes - reset animation state
  const handleAreaChange = (area: string) => {
    setSelectedArea(area);
    setShowDetails(false);
    setAnimatedSafety(0);
    setTimeout(() => setShowDetails(true), 100);
  };

  // Separate effect for animation - only runs when showDetails changes
  useEffect(() => {
    if (animationRef.current) {
      clearInterval(animationRef.current);
      animationRef.current = null;
    }

    if (!showDetails) {
      return;
    }

    // Start animation from 0
    let currentValue = 0;
    const targetValue = currentNeighborhood.safetyScore;
    const increment = targetValue / 50;

    animationRef.current = setInterval(() => {
      currentValue = Math.min(currentValue + increment, targetValue);
      setAnimatedSafety(currentValue);

      if (currentValue >= targetValue && animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
    }, 20);

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [showDetails, currentNeighborhood.safetyScore]);

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-8 shadow-lg">
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-3">
          Neighborhood Insights
        </h3>
        <p className="text-gray-600">
          Explore detailed information about local amenities, safety, and
          community features
        </p>
      </div>

      {/* Area Selector */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Select Area to Explore:
        </label>
        <div className="flex gap-4">
          <button
            onClick={() => handleAreaChange("lusaka-central")}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              selectedArea === "lusaka-central"
                ? "border-primary-600 bg-primary-50 shadow-md"
                : "border-gray-300 hover:border-primary-300"
            }`}
          >
            <div className="text-2xl mb-2">🏙️</div>
            <div className="font-semibold">Lusaka Central</div>
          </button>
          <button
            onClick={() => handleAreaChange("kabulonga")}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              selectedArea === "kabulonga"
                ? "border-primary-600 bg-primary-50 shadow-md"
                : "border-gray-300 hover:border-primary-300"
            }`}
          >
            <div className="text-2xl mb-2">🏡</div>
            <div className="font-semibold">Kabulonga</div>
          </button>
        </div>
      </div>

      {!showDetails ? (
        <div className="text-center py-12">
          <button
            onClick={() => setShowDetails(true)}
            className="px-8 py-4 text-black rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            View Neighborhood Analysis
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-fadeIn">
          {/* Safety & Walkability Scores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Safety Score */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🛡️</span>
                <h4 className="font-semibold text-gray-900">Safety Score</h4>
              </div>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#10b981"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(animatedSafety / 100) * 352} 352`}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-green-600">
                    {Math.round(animatedSafety)}
                  </span>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600">
                Very Safe Area
              </p>
            </div>

            {/* Walkability */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🚶</span>
                <h4 className="font-semibold text-gray-900">Walkability</h4>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {currentNeighborhood.walkability}
                </div>
                <div className="w-full bg-blue-200 rounded-full h-3 mb-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                    style={{
                      width: `${currentNeighborhood.walkability}%`,
                    }}
                  />
                </div>
                <p className="text-sm text-gray-600">Very Walkable</p>
              </div>
            </div>

            {/* Transit Score */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🚌</span>
                <h4 className="font-semibold text-gray-900">Transit Score</h4>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {currentNeighborhood.transitScore}
                </div>
                <div className="w-full bg-purple-200 rounded-full h-3 mb-3">
                  <div
                    className="bg-purple-600 h-3 rounded-full transition-all duration-1000"
                    style={{
                      width: `${currentNeighborhood.transitScore}%`,
                    }}
                  />
                </div>
                <p className="text-sm text-gray-600">Good Transit</p>
              </div>
            </div>
          </div>

          {/* Amenities Radar */}
          <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Amenity Ratings
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {currentNeighborhood.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="text-center animate-slideIn"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="text-4xl mb-2">{amenity.icon}</div>
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    {amenity.category}
                  </div>
                  <div className="relative w-full h-24 bg-gray-200 rounded-lg overflow-hidden">
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-primary-600 to-primary-400 transition-all duration-1000"
                      style={{
                        height: `${amenity.score}%`,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-white drop-shadow-md">
                        {amenity.score}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Facilities */}
          <div className="p-6 bg-white rounded-xl border-2 border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📍</span>
              Nearby Facilities
            </h4>
            <div className="space-y-4">
              {currentNeighborhood.facilities.map((facility, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition animate-slideIn"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-3xl">{facility.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {facility.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {facility.type}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(facility.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500">
                        {facility.rating} rating
                      </div>
                    </div>
                    <div className="text-right min-w-[80px]">
                      <div className="font-semibold text-primary-600">
                        {facility.distance} km
                      </div>
                      <div className="text-xs text-gray-500">distance</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border-2 border-yellow-200">
              <div className="text-sm text-gray-600 mb-2">Average Price</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                K{(currentNeighborhood.averagePrice / 1000).toFixed(0)}k
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 11-2 0V9.414l-4.293 4.293a1 1 0 01-1.414 0L8 11.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0L11 11.586 14.586 8H13a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                +{currentNeighborhood.priceChange}% this year
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border-2 border-indigo-200">
              <div className="text-sm text-gray-600 mb-2">Population</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {(currentNeighborhood.population / 1000).toFixed(0)}k
              </div>
              <div className="text-sm text-gray-600">residents</div>
            </div>

            <div className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl border-2 border-pink-200">
              <div className="text-sm text-gray-600 mb-2">Area Type</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {selectedArea === "lusaka-central"
                  ? "Urban Center"
                  : "Residential"}
              </div>
              <div className="text-sm text-gray-600">classification</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
