"use client";

import { useState } from "react";

interface DataPoint {
  month: string;
  price: number;
  sales: number;
}

export function MarketTrends() {
  const [selectedArea, setSelectedArea] = useState("lusaka-central");
  const [animatedData, setAnimatedData] = useState<DataPoint[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const marketData: Record<string, DataPoint[]> = {
    "lusaka-central": [
      { month: "Jan", price: 1200000, sales: 45 },
      { month: "Feb", price: 1250000, sales: 52 },
      { month: "Mar", price: 1280000, sales: 48 },
      { month: "Apr", price: 1320000, sales: 58 },
      { month: "May", price: 1350000, sales: 61 },
      { month: "Jun", price: 1400000, sales: 67 },
      { month: "Jul", price: 1450000, sales: 72 },
      { month: "Aug", price: 1480000, sales: 69 },
      { month: "Sep", price: 1520000, sales: 75 },
      { month: "Oct", price: 1580000, sales: 82 },
      { month: "Nov", price: 1620000, sales: 88 },
      { month: "Dec", price: 1650000, sales: 95 },
    ],
    kabulonga: [
      { month: "Jan", price: 1800000, sales: 32 },
      { month: "Feb", price: 1850000, sales: 35 },
      { month: "Mar", price: 1900000, sales: 38 },
      { month: "Apr", price: 1950000, sales: 42 },
      { month: "May", price: 2000000, sales: 45 },
      { month: "Jun", price: 2080000, sales: 48 },
      { month: "Jul", price: 2150000, sales: 52 },
      { month: "Aug", price: 2200000, sales: 55 },
      { month: "Sep", price: 2280000, sales: 58 },
      { month: "Oct", price: 2350000, sales: 62 },
      { month: "Nov", price: 2420000, sales: 65 },
      { month: "Dec", price: 2500000, sales: 70 },
    ],
    "roma-park": [
      { month: "Jan", price: 2200000, sales: 28 },
      { month: "Feb", price: 2280000, sales: 30 },
      { month: "Mar", price: 2350000, sales: 32 },
      { month: "Apr", price: 2420000, sales: 35 },
      { month: "May", price: 2500000, sales: 38 },
      { month: "Jun", price: 2600000, sales: 40 },
      { month: "Jul", price: 2700000, sales: 42 },
      { month: "Aug", price: 2800000, sales: 45 },
      { month: "Sep", price: 2900000, sales: 48 },
      { month: "Oct", price: 3000000, sales: 50 },
      { month: "Nov", price: 3100000, sales: 52 },
      { month: "Dec", price: 3200000, sales: 55 },
    ],
  };

  const currentData = marketData[selectedArea];
  const maxPrice = Math.max(...currentData.map((d) => d.price));
  const maxSales = Math.max(...currentData.map((d) => d.sales));

  const startAnimation = (area: string) => {
    setSelectedArea(area);
    setIsAnimating(true);
    setAnimatedData([]);

    const data = marketData[area];
    let index = 0;

    const interval = setInterval(() => {
      if (index < data.length) {
        setAnimatedData((prev) => [...prev, data[index]]);
        index++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 300);
  };

  const getPriceChange = () => {
    if (animatedData.length < 2) return 0;
    const first = animatedData[0];
    const last = animatedData[animatedData.length - 1];
    if (!first || !last || !first.price || !last.price) return 0;
    return ((last.price - first.price) / first.price) * 100;
  };

  const getTotalSales = () => {
    if (animatedData.length === 0) return 0;
    return animatedData.reduce((sum, d) => sum + (d?.sales || 0), 0);
  };

  const dataToDisplay =
    isAnimating || animatedData.length > 0 ? animatedData : currentData;

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-8 shadow-lg">
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-3">
          Market Trends & Analytics
        </h3>
        <p className="text-gray-600">
          Real-time property price trends and sales volume across Lusaka
        </p>
      </div>

      {/* Area Selector */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Select Area:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: "lusaka-central", name: "Lusaka Central", icon: "🏙️" },
            { id: "kabulonga", name: "Kabulonga", icon: "🏡" },
            { id: "roma-park", name: "Roma Park", icon: "🌳" },
          ].map((area) => (
            <button
              key={area.id}
              onClick={() => startAnimation(area.id)}
              disabled={isAnimating}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedArea === area.id
                  ? "border-primary-600 bg-primary-50 shadow-md"
                  : "border-gray-300 hover:border-primary-300"
              } ${isAnimating ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="text-3xl mb-2">{area.icon}</div>
              <div className="font-semibold">{area.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      {dataToDisplay.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fadeIn">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
            <div className="text-sm text-gray-600 mb-2">Price Growth</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              +{getPriceChange().toFixed(1)}%
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 11-2 0V9.414l-4.293 4.293a1 1 0 01-1.414 0L8 11.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0L11 11.586 14.586 8H13a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Year-to-date
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
            <div className="text-sm text-gray-600 mb-2">Total Sales</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {getTotalSales()}
            </div>
            <div className="text-sm text-gray-600">Properties sold</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
            <div className="text-sm text-gray-600 mb-2">Average Price</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              K
              {dataToDisplay.length > 0
                ? (
                    dataToDisplay.reduce((sum, d) => sum + (d?.price || 0), 0) /
                    dataToDisplay.length /
                    1000
                  ).toFixed(0)
                : 0}
              k
            </div>
            <div className="text-sm text-gray-600">This year</div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-900">
            Price Trends (2024)
          </h4>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
              <span className="text-gray-600">Average Price</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
              <span className="text-gray-600">Sales Volume</span>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="flex items-end justify-between gap-2 h-64">
          {dataToDisplay.map((data, index) => {
            if (!data) return null;

            const priceHeight = (data.price / maxPrice) * 100;
            const salesHeight = (data.sales / maxSales) * 100;

            return (
              <div
                key={data.month || index}
                className="flex-1 flex flex-col items-center gap-2"
              >
                {/* Price Bar */}
                <div className="w-full flex flex-col items-center">
                  <div
                    className="w-full bg-primary-500 rounded-t transition-all duration-500 relative group"
                    style={{
                      height: `${priceHeight}%`,
                      minHeight: "20px",
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      K{((data.price || 0) / 1000).toFixed(0)}k
                    </div>
                  </div>
                  {/* Sales Bar */}
                  <div
                    className="w-full bg-secondary-500 rounded-t transition-all duration-500 mt-1 relative group"
                    style={{
                      height: `${salesHeight / 2}%`,
                      minHeight: "10px",
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      {data.sales || 0} sales
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  {data.month || ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insights */}
      {dataToDisplay.length === currentData.length && !isAnimating && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl border-2 border-teal-200">
            <div className="text-3xl mb-3">📈</div>
            <h4 className="font-semibold text-gray-900 mb-2">Market Insight</h4>
            <p className="text-sm text-gray-600">
              {selectedArea === "lusaka-central" &&
                "Lusaka Central shows steady growth with increasing demand for modern apartments and townhouses."}
              {selectedArea === "kabulonga" &&
                "Kabulonga remains a premium neighborhood with strong year-over-year appreciation and high-value properties."}
              {selectedArea === "roma-park" &&
                "Roma Park leads in luxury properties with diplomatic residences driving consistent high-value transactions."}
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200">
            <div className="text-3xl mb-3">💡</div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Investment Potential
            </h4>
            <p className="text-sm text-gray-600">
              Based on current trends, this area shows{" "}
              <span className="font-semibold">strong investment potential</span>{" "}
              with consistent price appreciation and healthy sales activity.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
