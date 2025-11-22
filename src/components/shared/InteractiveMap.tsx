"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const Circle = dynamic(
  () => import("react-leaflet").then((mod) => mod.Circle),
  { ssr: false }
);

interface MapArea {
  id: string;
  name: string;
  lat: number;
  lng: number;
  properties: number;
  avgPrice: number;
  color: string;
}

interface Property {
  id: string;
  title: string;
  price: number;
  type: string;
  bedrooms: number;
  lat: number;
  lng: number;
  area: string;
}

export function InteractiveMap() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [isClient, setIsClient] = useState(false);
  const [customIcon, setCustomIcon] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    // Setup custom icons after client-side mount
    if (typeof window !== "undefined") {
      const L = require("leaflet");

      // Fix for default marker icon
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      // Custom property icon
      const propertyIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background-color: #f59e0b; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      });

      setCustomIcon(propertyIcon);
    }
  }, []);

  // Real coordinates for Lusaka neighborhoods
  const areas: MapArea[] = [
    {
      id: "lusaka-central",
      name: "Lusaka Central",
      lat: -15.4167,
      lng: 28.2833,
      properties: 234,
      avgPrice: 1500000,
      color: "#14b8a6",
    },
    {
      id: "kabulonga",
      name: "Kabulonga",
      lat: -15.3947,
      lng: 28.3236,
      properties: 156,
      avgPrice: 2200000,
      color: "#0d9488",
    },
    {
      id: "roma",
      name: "Roma",
      lat: -15.4389,
      lng: 28.3167,
      properties: 89,
      avgPrice: 2800000,
      color: "#0f766e",
    },
    {
      id: "woodlands",
      name: "Woodlands",
      lat: -15.4369,
      lng: 28.2519,
      properties: 178,
      avgPrice: 1200000,
      color: "#2dd4bf",
    },
    {
      id: "chelston",
      name: "Chelston",
      lat: -15.4556,
      lng: 28.3333,
      properties: 145,
      avgPrice: 1800000,
      color: "#5eead4",
    },
    {
      id: "olympia",
      name: "Olympia",
      lat: -15.375,
      lng: 28.3167,
      properties: 92,
      avgPrice: 1950000,
      color: "#99f6e4",
    },
  ];

  // Simulated properties with real coordinates near their areas
  const allProperties: Property[] = [
    // Lusaka Central
    {
      id: "1",
      title: "Modern Apartment",
      price: 1400000,
      type: "Apartment",
      bedrooms: 2,
      lat: -15.417,
      lng: 28.284,
      area: "lusaka-central",
    },
    {
      id: "2",
      title: "City Center Condo",
      price: 1600000,
      type: "Apartment",
      bedrooms: 3,
      lat: -15.4165,
      lng: 28.2825,
      area: "lusaka-central",
    },
    {
      id: "3",
      title: "Business Suite",
      price: 1500000,
      type: "Commercial",
      bedrooms: 0,
      lat: -15.416,
      lng: 28.285,
      area: "lusaka-central",
    },
    // Kabulonga
    {
      id: "4",
      title: "Luxury Villa",
      price: 2500000,
      type: "House",
      bedrooms: 5,
      lat: -15.395,
      lng: 28.324,
      area: "kabulonga",
    },
    {
      id: "5",
      title: "Family Home",
      price: 2100000,
      type: "House",
      bedrooms: 4,
      lat: -15.3945,
      lng: 28.323,
      area: "kabulonga",
    },
    {
      id: "6",
      title: "Executive Residence",
      price: 2300000,
      type: "House",
      bedrooms: 4,
      lat: -15.3955,
      lng: 28.3245,
      area: "kabulonga",
    },
    // Roma
    {
      id: "7",
      title: "Diplomatic Villa",
      price: 3000000,
      type: "House",
      bedrooms: 6,
      lat: -15.439,
      lng: 28.317,
      area: "roma",
    },
    {
      id: "8",
      title: "Premium Estate",
      price: 2800000,
      type: "House",
      bedrooms: 5,
      lat: -15.4385,
      lng: 28.316,
      area: "roma",
    },
    // Woodlands
    {
      id: "9",
      title: "Cozy Townhouse",
      price: 1100000,
      type: "Townhouse",
      bedrooms: 3,
      lat: -15.437,
      lng: 28.2525,
      area: "woodlands",
    },
    {
      id: "10",
      title: "Garden Home",
      price: 1300000,
      type: "House",
      bedrooms: 4,
      lat: -15.4365,
      lng: 28.2515,
      area: "woodlands",
    },
    // Chelston
    {
      id: "11",
      title: "Suburban Villa",
      price: 1900000,
      type: "House",
      bedrooms: 4,
      lat: -15.4558,
      lng: 28.3335,
      area: "chelston",
    },
    {
      id: "12",
      title: "Contemporary Home",
      price: 1700000,
      type: "House",
      bedrooms: 3,
      lat: -15.4552,
      lng: 28.333,
      area: "chelston",
    },
    // Olympia
    {
      id: "13",
      title: "Elegant Villa",
      price: 2000000,
      type: "House",
      bedrooms: 4,
      lat: -15.3755,
      lng: 28.317,
      area: "olympia",
    },
    {
      id: "14",
      title: "Modern Residence",
      price: 1900000,
      type: "House",
      bedrooms: 3,
      lat: -15.3745,
      lng: 28.316,
      area: "olympia",
    },
  ];

  const filteredProperties = selectedArea
    ? allProperties.filter((p) => p.area === selectedArea)
    : allProperties;

  // Lusaka center coordinates
  const lusakaCenter: [number, number] = [-15.4167, 28.2833];

  if (!isClient) {
    return (
      <div className="bg-white rounded-xl border-2 border-gray-200 p-8 shadow-lg">
        <div className="flex items-center justify-center h-[600px]">
          <div className="text-center">
            <div className="text-5xl mb-4">🗺️</div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-8 shadow-lg">
      <div className="mb-6">
        <h3 className="text-3xl font-bold text-gray-900 mb-3">
          Interactive Property Map
        </h3>
        <p className="text-gray-600">
          Explore real properties across Lusaka neighborhoods on an actual map
        </p>
      </div>

      {/* Area Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => {
            setSelectedArea(null);
            setSelectedProperty(null);
          }}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            !selectedArea
              ? "bg-primary-700 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Areas ({allProperties.length})
        </button>
        {areas.map((area) => (
          <button
            key={area.id}
            onClick={() => {
              setSelectedArea(area.id);
              setSelectedProperty(null);
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedArea === area.id
                ? "bg-primary-700 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {area.name} (
            {allProperties.filter((p) => p.area === area.id).length})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="rounded-xl overflow-hidden border-2 border-gray-300 shadow-lg h-[600px]">
            <MapContainer
              center={lusakaCenter}
              zoom={12}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Area circles */}
              {areas.map((area) => (
                <Circle
                  key={area.id}
                  center={[area.lat, area.lng]}
                  radius={800}
                  pathOptions={{
                    color: area.color,
                    fillColor: area.color,
                    fillOpacity: selectedArea === area.id ? 0.3 : 0.1,
                    weight: selectedArea === area.id ? 3 : 1,
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-bold text-lg">{area.name}</h4>
                      <p className="text-sm text-gray-600">
                        {area.properties} properties
                      </p>
                      <p className="text-sm font-semibold text-primary-700">
                        Avg: K{(area.avgPrice / 1000).toFixed(0)}k
                      </p>
                      <button
                        onClick={() => setSelectedArea(area.id)}
                        className="mt-2 px-3 py-1 bg-primary-700 text-white text-xs rounded hover:bg-primary-800"
                      >
                        Filter Properties
                      </button>
                    </div>
                  </Popup>
                </Circle>
              ))}

              {/* Property markers */}
              {filteredProperties.map((property) => (
                <Marker
                  key={property.id}
                  position={[property.lat, property.lng]}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => setSelectedProperty(property),
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-bold">{property.title}</h4>
                      <p className="text-sm text-gray-600">{property.type}</p>
                      {property.bedrooms > 0 && (
                        <p className="text-xs text-gray-500">
                          🛏️ {property.bedrooms} bedrooms
                        </p>
                      )}
                      <p className="text-lg font-bold text-primary-700 mt-1">
                        K{(property.price / 1000).toFixed(0)}k
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary-700"></div>
              <span>Neighborhood areas</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: "#f59e0b" }}
              ></div>
              <span>Property markers</span>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          {selectedProperty ? (
            <div className="bg-gradient-to-br from-primary-50 to-teal-50 p-6 rounded-xl border-2 border-primary-200">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                📍 Selected Property
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600">Title</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {selectedProperty.title}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Type</div>
                  <div className="font-medium text-gray-900">
                    {selectedProperty.type}
                  </div>
                </div>
                {selectedProperty.bedrooms > 0 && (
                  <div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                    <div className="font-medium text-gray-900">
                      {selectedProperty.bedrooms}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-gray-600">Price</div>
                  <div className="text-2xl font-bold text-primary-700">
                    K{(selectedProperty.price / 1000).toFixed(0)}k
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="w-full mt-3 px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : selectedArea ? (
            <>
              {areas
                .filter((a) => a.id === selectedArea)
                .map((area) => (
                  <div
                    key={area.id}
                    className="bg-gradient-to-br from-primary-50 to-teal-50 p-6 rounded-xl border-2 border-primary-200"
                  >
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      📍 {area.name}
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">
                          Total Properties
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {
                            allProperties.filter((p) => p.area === area.id)
                              .length
                          }
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Average Price
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          K{(area.avgPrice / 1000).toFixed(0)}k
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-200 text-center">
              <div className="text-5xl mb-3">🗺️</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Explore Lusaka
              </h4>
              <p className="text-sm text-gray-600">
                Click on area buttons above to filter properties, or click any
                marker on the map for details
              </p>
            </div>
          )}

          {/* Properties List */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
            <h4 className="text-lg font-bold text-gray-900 mb-3">
              🏠 Properties ({filteredProperties.length})
            </h4>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {filteredProperties.map((property) => (
                <button
                  key={property.id}
                  onClick={() => setSelectedProperty(property)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedProperty?.id === property.id
                      ? "border-primary-500 bg-primary-50 shadow-md"
                      : "border-gray-200 hover:border-primary-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-semibold text-gray-900 text-sm">
                    {property.title}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {property.type}
                    {property.bedrooms > 0 && ` • ${property.bedrooms} beds`}
                  </div>
                  <div className="text-lg font-bold text-primary-700 mt-1">
                    K{(property.price / 1000).toFixed(0)}k
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
