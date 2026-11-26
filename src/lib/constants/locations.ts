// Zambian reference data for property search and listing forms.

/** The 10 provinces of Zambia (matches `ZambianProvince` in the backend shared kernel). */
export const ZAMBIAN_PROVINCES = [
  'Central',
  'Copperbelt',
  'Eastern',
  'Luapula',
  'Lusaka',
  'Muchinga',
  'Northern',
  'North-Western',
  'Southern',
  'Western',
] as const;

export type ZambianProvince = (typeof ZAMBIAN_PROVINCES)[number];

export interface CityData {
  city: string;
  province: ZambianProvince;
  neighborhoods: string[];
}

export const ZAMBIAN_CITIES: CityData[] = [
  {
    city: "Lusaka",
    province: "Lusaka",
    neighborhoods: [
      "Kabulonga",
      "Rhodes Park",
      "Ibex Hill",
      "Woodlands",
      "Sunningdale",
      "Roma",
      "Olympia",
      "Mass Media",
      "Chelston",
      "Makeni",
      "Avondale",
      "Northmead",
      "Kalundu",
      "Chilenje",
      "Kabwata",
      "Emmasdale",
      "PHI",
      "Garden House",
      "Longacres",
      "Showgrounds",
    ],
  },
  {
    city: "Ndola",
    province: "Copperbelt",
    neighborhoods: [
      "Kansenshi",
      "Northrise",
      "Itawa",
      "Hillcrest",
      "Ndeke",
      "Chipulukusu",
      "Masala",
      "Lubuto",
    ],
  },
  {
    city: "Kitwe",
    province: "Copperbelt",
    neighborhoods: [
      "Parklands",
      "Riverside",
      "Nkana East",
      "Nkana West",
      "Chimwemwe",
      "Garneton",
      "Kwacha",
      "Mindolo",
    ],
  },
  {
    city: "Livingstone",
    province: "Southern",
    neighborhoods: [
      "Dambwa",
      "Linda",
      "Maramba",
      "Highlands",
      "Nottie Broadie",
      "Town Centre",
    ],
  },
  {
    city: "Kabwe",
    province: "Central",
    neighborhoods: [
      "Highridge",
      "Natuseko",
      "Makululu",
      "Railway",
      "Luangwa",
    ],
  },
  {
    city: "Chingola",
    province: "Copperbelt",
    neighborhoods: [
      "Nchanga North",
      "Nchanga South",
      "Riverside",
      "Kabundi",
    ],
  },
];

export const POPULAR_SEARCHES = [
  { label: "Houses in Kabulonga", city: "Lusaka", neighborhood: "Kabulonga" },
  { label: "Apartments in Woodlands", city: "Lusaka", neighborhood: "Woodlands" },
  { label: "Rentals in Rhodes Park", city: "Lusaka", neighborhood: "Rhodes Park" },
  { label: "Land in Makeni", city: "Lusaka", neighborhood: "Makeni" },
  { label: "Houses in Ibex Hill", city: "Lusaka", neighborhood: "Ibex Hill" },
  { label: "Properties in Ndola", city: "Ndola", neighborhood: undefined },
];

export const getAllLocations = (): { city: string; neighborhood?: string; display: string }[] => {
  const locations: { city: string; neighborhood?: string; display: string }[] = [];

  ZAMBIAN_CITIES.forEach((cityData) => {
    // Add city itself
    locations.push({
      city: cityData.city,
      neighborhood: undefined,
      display: cityData.city,
    });

    // Add each neighborhood
    cityData.neighborhoods.forEach((neighborhood) => {
      locations.push({
        city: cityData.city,
        neighborhood,
        display: `${neighborhood}, ${cityData.city}`,
      });
    });
  });

  return locations;
};

export const searchLocations = (
  query: string
): { city: string; neighborhood?: string; display: string }[] => {
  if (!query.trim()) {
    return [];
  }

  const lowerQuery = query.toLowerCase();
  const allLocations = getAllLocations();

  return allLocations.filter((loc) =>
    loc.display.toLowerCase().includes(lowerQuery)
  );
};

/** Province for a known city (case-insensitive), used to pre-fill listing forms. */
export const provinceForCity = (city: string): ZambianProvince | undefined =>
  ZAMBIAN_CITIES.find((c) => c.city.toLowerCase() === city.trim().toLowerCase())?.province;
