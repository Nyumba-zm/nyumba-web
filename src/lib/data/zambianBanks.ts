// Zambian Banks Mortgage Data
// Source: Bank of Zambia regulated financial institutions

export interface MortgageProduct {
  name: string;
  interestRate: { min: number; max: number };
  loanTenure: { min: number; max: number }; // years
  maxLTV: number; // Loan-to-Value percentage
  minDeposit: number; // percentage
  processingFee: number; // percentage
  maxLoanAmount: number; // ZMW
  minIncome: number; // ZMW monthly
  targetAudience: string[];
  features: string[];
}

export interface ZambianBank {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  website: string;
  mortgageProducts: MortgageProduct[];
  contactInfo: {
    phone: string;
    email: string;
    headquarters: string;
  };
  features: string[];
  rating: number;
  reviewCount: number;
  established: number;
  regulatedBy: string;
}

export const zambianBanks: ZambianBank[] = [
  {
    id: "standard-chartered",
    name: "Standard Chartered Bank Zambia",
    shortName: "Standard Chartered",
    logo: "/images/banks/stanchart.png",
    website: "https://www.sc.com/zm",
    mortgageProducts: [
      {
        name: "Mortgage Plus",
        interestRate: { min: 21, max: 25 },
        loanTenure: { min: 5, max: 25 },
        maxLTV: 85,
        minDeposit: 15,
        processingFee: 1.0,
        maxLoanAmount: 15000000,
        minIncome: 25000,
        targetAudience: ["High Net Worth", "Professionals", "Expatriates"],
        features: [
          "Lowest interest rates in market",
          "Highest loan amounts available",
          "International transfers supported",
          "Dedicated relationship manager",
          "Flexible repayment options",
        ],
      },
    ],
    contactInfo: {
      phone: "+260 211 374500",
      email: "zmretail@sc.com",
      headquarters: "Standard Chartered House, Cairo Road, Lusaka",
    },
    features: [
      "Global bank with 150+ years presence",
      "Premium banking services",
      "Expatriate banking expertise",
      "Wealth management services",
    ],
    rating: 4.6,
    reviewCount: 650,
    established: 1906,
    regulatedBy: "Bank of Zambia",
  },
  {
    id: "stanbic",
    name: "Stanbic Bank Zambia",
    shortName: "Stanbic",
    logo: "/images/banks/stanbic.png",
    website: "https://www.stanbicbank.co.zm",
    mortgageProducts: [
      {
        name: "Home Loan",
        interestRate: { min: 22, max: 26 },
        loanTenure: { min: 5, max: 25 },
        maxLTV: 80,
        minDeposit: 20,
        processingFee: 1.0,
        maxLoanAmount: 10000000,
        minIncome: 20000,
        targetAudience: ["Employed", "Business Owners", "Professionals"],
        features: [
          "Competitive interest rates",
          "Premium banking relationship",
          "Investment advisory included",
          "Foreign currency options available",
          "Online application process",
        ],
      },
    ],
    contactInfo: {
      phone: "+260 211 370000",
      email: "zmcustomercare@stanbic.com",
      headquarters: "Stanbic House, Cairo Road, Lusaka",
    },
    features: [
      "Part of Standard Bank Group",
      "Pan-African presence",
      "Corporate banking expertise",
      "Digital banking solutions",
    ],
    rating: 4.5,
    reviewCount: 890,
    established: 1991,
    regulatedBy: "Bank of Zambia",
  },
  {
    id: "absa",
    name: "Absa Bank Zambia",
    shortName: "Absa",
    logo: "/images/banks/absa.png",
    website: "https://www.absa.co.zm",
    mortgageProducts: [
      {
        name: "Home Loan",
        interestRate: { min: 23, max: 27 },
        loanTenure: { min: 5, max: 20 },
        maxLTV: 80,
        minDeposit: 20,
        processingFee: 1.5,
        maxLoanAmount: 7500000,
        minIncome: 18000,
        targetAudience: ["Employed", "Self-Employed", "Professionals"],
        features: [
          "Pre-approval available online",
          "Offset account option",
          "Rate lock guarantee (90 days)",
          "Mobile banking integration",
          "No early settlement penalty",
        ],
      },
    ],
    contactInfo: {
      phone: "+260 211 367000",
      email: "absa.zambia@absa.africa",
      headquarters: "Absa House, Cairo Road, Lusaka",
    },
    features: [
      "Formerly Barclays Bank",
      "International network",
      "Mobile banking leader",
      "Low processing fees",
    ],
    rating: 4.3,
    reviewCount: 1100,
    established: 1918,
    regulatedBy: "Bank of Zambia",
  },
  {
    id: "zanaco",
    name: "Zambia National Commercial Bank",
    shortName: "Zanaco",
    logo: "/images/banks/zanaco.png",
    website: "https://www.zanaco.co.zm",
    mortgageProducts: [
      {
        name: "Home Loan",
        interestRate: { min: 24, max: 28 },
        loanTenure: { min: 5, max: 20 },
        maxLTV: 80,
        minDeposit: 20,
        processingFee: 1.5,
        maxLoanAmount: 5000000,
        minIncome: 15000,
        targetAudience: ["Employed", "Self-Employed", "First-time Buyers"],
        features: [
          "Flexible repayment terms",
          "No hidden fees",
          "Life insurance included",
          "Property valuation assistance",
          "Dedicated mortgage advisors",
        ],
      },
    ],
    contactInfo: {
      phone: "+260 211 228574",
      email: "customercare@zanaco.co.zm",
      headquarters: "Zanaco House, Cairo Road, Lusaka",
    },
    features: [
      "Largest Zambian-owned bank",
      "Extensive branch network (70+ branches)",
      "Mobile banking app (Xapit)",
      "Government partnership",
    ],
    rating: 4.2,
    reviewCount: 1250,
    established: 1969,
    regulatedBy: "Bank of Zambia",
  },
  {
    id: "fnb",
    name: "First National Bank Zambia",
    shortName: "FNB",
    logo: "/images/banks/fnb.png",
    website: "https://www.fnbzambia.co.zm",
    mortgageProducts: [
      {
        name: "Home Loan",
        interestRate: { min: 24, max: 28 },
        loanTenure: { min: 5, max: 20 },
        maxLTV: 75,
        minDeposit: 25,
        processingFee: 2.0,
        maxLoanAmount: 5000000,
        minIncome: 15000,
        targetAudience: ["Employed", "First-time Buyers"],
        features: [
          "Online application portal",
          "Quick disbursement (7-14 days)",
          "Customer support 24/7",
          "First-time buyer programs",
          "eBucks rewards integration",
        ],
      },
    ],
    contactInfo: {
      phone: "+260 211 366800",
      email: "info@fnbzambia.co.zm",
      headquarters: "FNB House, Cairo Road, Lusaka",
    },
    features: [
      "Part of FirstRand Group",
      "Innovative digital banking",
      "Rewards program (eBucks)",
      "Extensive ATM network",
    ],
    rating: 4.1,
    reviewCount: 780,
    established: 2008,
    regulatedBy: "Bank of Zambia",
  },
  {
    id: "access-bank",
    name: "Access Bank Zambia",
    shortName: "Access Bank",
    logo: "/images/banks/access-bank.png",
    website: "https://www.accessbankplc.com/zambia",
    mortgageProducts: [
      {
        name: "Home Loan",
        interestRate: { min: 23, max: 27 },
        loanTenure: { min: 5, max: 20 },
        maxLTV: 80,
        minDeposit: 20,
        processingFee: 1.5,
        maxLoanAmount: 5000000,
        minIncome: 15000,
        targetAudience: ["Employed", "Business Owners", "Women Entrepreneurs"],
        features: [
          "Pan-African network access",
          "Women-focused programs (W Initiative)",
          "Digital solutions",
          "Flexible repayment options",
          "Sustainability initiatives",
        ],
      },
    ],
    contactInfo: {
      phone: "+260 211 227652",
      email: "zambiainfo@accessbankplc.com",
      headquarters: "Access Bank House, Cairo Road, Lusaka",
    },
    features: [
      "Africa's largest bank by customers",
      "Women empowerment focus",
      "Sustainability leader",
      "Digital innovation",
    ],
    rating: 4.1,
    reviewCount: 520,
    established: 2020,
    regulatedBy: "Bank of Zambia",
  },
  {
    id: "atlas-mara",
    name: "Atlas Mara Bank Zambia",
    shortName: "Atlas Mara",
    logo: "/images/banks/atlas-mara.png",
    website: "https://www.atlasmara.com",
    mortgageProducts: [
      {
        name: "Home Ownership Loan",
        interestRate: { min: 24, max: 28 },
        loanTenure: { min: 5, max: 20 },
        maxLTV: 75,
        minDeposit: 25,
        processingFee: 1.5,
        maxLoanAmount: 4000000,
        minIncome: 15000,
        targetAudience: ["Employed", "Diaspora", "Returning Residents"],
        features: [
          "Diaspora banking services",
          "Regional presence (7 countries)",
          "Digital-first approach",
          "Competitive rates",
          "Personalized service",
        ],
      },
    ],
    contactInfo: {
      phone: "+260 211 229279",
      email: "info.zambia@atlasmara.com",
      headquarters: "Atlas Mara House, Lusaka",
    },
    features: [
      "Sub-Saharan Africa focus",
      "Diaspora services",
      "Digital banking",
      "SME lending expertise",
    ],
    rating: 4.0,
    reviewCount: 380,
    established: 2014,
    regulatedBy: "Bank of Zambia",
  },
  {
    id: "indo-zambia",
    name: "Indo Zambia Bank",
    shortName: "IZB",
    logo: "/images/banks/izb.png",
    website: "https://www.izb.co.zm",
    mortgageProducts: [
      {
        name: "Home Finance",
        interestRate: { min: 25, max: 30 },
        loanTenure: { min: 5, max: 15 },
        maxLTV: 70,
        minDeposit: 30,
        processingFee: 2.0,
        maxLoanAmount: 3000000,
        minIncome: 12000,
        targetAudience: ["Employed", "Small Business Owners"],
        features: [
          "Personalized service",
          "Flexible terms negotiable",
          "SME friendly",
          "Quick processing",
          "No prepayment penalty",
        ],
      },
    ],
    contactInfo: {
      phone: "+260 211 227793",
      email: "info@izb.co.zm",
      headquarters: "IZB House, Buteko Place, Lusaka",
    },
    features: [
      "Indo-Zambian partnership",
      "SME focus",
      "Personal banking",
      "Trade finance expertise",
    ],
    rating: 3.9,
    reviewCount: 420,
    established: 1984,
    regulatedBy: "Bank of Zambia",
  },
];

// Helper functions
export function getBankById(id: string): ZambianBank | undefined {
  return zambianBanks.find((bank) => bank.id === id);
}

export function getBanksByMinDeposit(maxDeposit: number): ZambianBank[] {
  return zambianBanks.filter((bank) =>
    bank.mortgageProducts.some((p) => p.minDeposit <= maxDeposit)
  );
}

export function getLowestRateBanks(limit: number = 3): ZambianBank[] {
  return [...zambianBanks]
    .sort((a, b) => {
      const aMin = Math.min(...a.mortgageProducts.map((p) => p.interestRate.min));
      const bMin = Math.min(...b.mortgageProducts.map((p) => p.interestRate.min));
      return aMin - bMin;
    })
    .slice(0, limit);
}

export function getHighestRatedBanks(limit: number = 3): ZambianBank[] {
  return [...zambianBanks].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export function getBanksByMaxLoan(minLoan: number): ZambianBank[] {
  return zambianBanks.filter((bank) =>
    bank.mortgageProducts.some((p) => p.maxLoanAmount >= minLoan)
  );
}

export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  );
}

export function calculateAffordability(
  monthlyIncome: number,
  existingDebt: number = 0,
  maxDTI: number = 0.4
): number {
  const availableForMortgage = monthlyIncome * maxDTI - existingDebt;
  // Assuming 25% interest rate and 20 year term for estimation
  const rate = 0.25 / 12;
  const months = 20 * 12;
  return (
    (availableForMortgage * (Math.pow(1 + rate, months) - 1)) /
    (rate * Math.pow(1 + rate, months))
  );
}
