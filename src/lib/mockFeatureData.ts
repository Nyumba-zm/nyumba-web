// Mock data for feature components
export const mockNeighborhoodData = {
  kabulonga: {
    area: "Kabulonga",
    safetyScore: 8,
    amenities: {
      schools: 5,
      hospitals: 3,
      shopping: 4,
      restaurants: 12,
    },
    distanceToCenter: 8.5,
    publicTransport: "good" as const,
    description:
      "Kabulonga is an upscale residential area known for its leafy streets, excellent schools, and proximity to major shopping centers. Popular with expatriates and professionals.",
  },
  chillabombwe: {
    area: "Chillabombwe",
    safetyScore: 6,
    amenities: {
      schools: 3,
      hospitals: 2,
      shopping: 2,
      restaurants: 6,
    },
    distanceToCenter: 25,
    publicTransport: "fair" as const,
    description:
      "A mining town in the Copperbelt Province with a growing residential sector. Affordable housing options with developing infrastructure.",
  },
  roma: {
    area: "Roma",
    safetyScore: 9,
    amenities: {
      schools: 4,
      hospitals: 2,
      shopping: 5,
      restaurants: 15,
    },
    distanceToCenter: 5,
    publicTransport: "excellent" as const,
    description:
      "One of Lusaka's most prestigious neighborhoods, Roma offers luxury living with top-tier amenities, embassies, and diplomatic residences.",
  },
};

export const mockComparableProperties = [
  {
    id: "1",
    title: "4 Bed House in Kabulonga",
    price: 1850000,
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    distance: 0.5,
    soldDate: "2 months ago",
  },
  {
    id: "2",
    title: "3 Bed House in Kabulonga East",
    price: 1650000,
    bedrooms: 3,
    bathrooms: 2,
    area: 280,
    distance: 1.2,
    soldDate: "1 month ago",
  },
  {
    id: "3",
    title: "4 Bed House in Kabulonga West",
    price: 2100000,
    bedrooms: 4,
    bathrooms: 4,
    area: 420,
    distance: 0.8,
    soldDate: "3 weeks ago",
  },
];

export const mockLenders = [
  {
    id: "zanaco",
    name: "Zanaco Bank",
    logo: "🏦",
    interestRate: 14.5,
    minTenure: 5,
    maxTenure: 25,
    processingFee: 1.5,
    maxLoanAmount: 5000000,
    features: [
      "No hidden fees",
      "Fast approval process",
      "Flexible repayment options",
      "Insurance included",
    ],
    rating: 4.5,
  },
  {
    id: "fbnbank",
    name: "FBN Bank",
    logo: "🏢",
    interestRate: 15.0,
    minTenure: 5,
    maxTenure: 20,
    processingFee: 2.0,
    maxLoanAmount: 3000000,
    features: [
      "Competitive rates",
      "Online application",
      "Customer support 24/7",
      "Quick disbursement",
    ],
    rating: 4.2,
  },
  {
    id: "stanbic",
    name: "Stanbic Bank",
    logo: "💼",
    interestRate: 13.5,
    minTenure: 10,
    maxTenure: 30,
    processingFee: 1.0,
    maxLoanAmount: 10000000,
    features: [
      "Lowest interest rates",
      "Premium service",
      "Relationship manager",
      "Investment advisory",
    ],
    rating: 4.8,
  },
  {
    id: "absa",
    name: "Absa Bank",
    logo: "🏛️",
    interestRate: 14.0,
    minTenure: 5,
    maxTenure: 25,
    processingFee: 1.5,
    maxLoanAmount: 7000000,
    features: [
      "Pre-approval available",
      "Mobile banking",
      "Low processing fees",
      "Offset account option",
    ],
    rating: 4.4,
  },
];

export const mockSavedSearches = [
  {
    id: "1",
    name: "Family Home in Kabulonga",
    filters: {
      location: "Kabulonga",
      priceRange: "K1.5M - K2.5M",
      bedrooms: "3-4 bedrooms",
    },
    resultCount: 12,
    lastChecked: "2 hours ago",
    alertsEnabled: true,
  },
  {
    id: "2",
    name: "Affordable Apartments",
    filters: {
      location: "Lusaka",
      priceRange: "K500K - K1M",
      bedrooms: "2 bedrooms",
    },
    resultCount: 28,
    lastChecked: "1 day ago",
    alertsEnabled: false,
  },
  {
    id: "3",
    name: "Investment Properties",
    filters: {
      location: "City Center",
      priceRange: "K2M - K5M",
      bedrooms: "Any",
    },
    resultCount: 7,
    lastChecked: "3 days ago",
    alertsEnabled: true,
  },
];
