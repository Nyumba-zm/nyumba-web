// Zambian cities and neighborhoods for property search

export interface CityData {
  city: string;
  neighborhoods: string[];
}

export const ZAMBIAN_CITIES: CityData[] = [
  {
    city: "Lusaka",
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
