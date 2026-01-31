// Bank of Zambia Regulatory Information
// Source: Bank of Zambia Guidelines and Banking & Financial Services Act

export interface BOZRegulation {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: "document" | "shield" | "chart" | "building" | "identification";
  lastUpdated: string;
  source: string;
}

export interface BOZPolicy {
  id: string;
  name: string;
  currentRate: number;
  description: string;
  effectiveDate: string;
  impactOnMortgages: string;
}

export interface MortgageFee {
  name: string;
  range: string;
  description: string;
  paidTo: string;
}

export const bozRegulations: BOZRegulation[] = [
  {
    id: "lending-guidelines",
    title: "Mortgage Lending Guidelines",
    description:
      "BOZ requirements for banks offering mortgage products to Zambian residents.",
    details: [
      "Maximum Loan-to-Value (LTV) ratio of 80-85% for residential properties",
      "Debt-to-Income ratio should not exceed 40% of gross monthly income",
      "Mandatory property valuation by BOZ-approved valuers",
      "Comprehensive credit assessment required before approval",
      "Life and property insurance mandatory for all mortgage loans",
      "Banks must maintain adequate capital reserves for mortgage portfolios",
      "Minimum loan tenure of 5 years, maximum typically 25 years",
    ],
    icon: "document",
    lastUpdated: "2024",
    source: "Bank of Zambia Banking and Financial Services Act",
  },
  {
    id: "consumer-protection",
    title: "Consumer Protection",
    description:
      "Rights and protections for mortgage borrowers under Zambian law.",
    details: [
      "Full disclosure of all fees, charges, and total cost of credit",
      "14-day cooling-off period for mortgage agreements",
      "Right to early repayment without excessive penalties",
      "Clear communication of interest rate changes (30 days notice)",
      "Complaints handling procedures must be in place",
      "Financial literacy materials must be provided to borrowers",
      "Prohibition of predatory lending practices",
      "Right to receive loan statements regularly",
    ],
    icon: "shield",
    lastUpdated: "2024",
    source: "Financial Consumer Protection Guidelines",
  },
  {
    id: "interest-rate-policy",
    title: "Interest Rate Framework",
    description: "How BOZ monetary policy affects mortgage interest rates.",
    details: [
      "Policy rate set by Monetary Policy Committee (MPC) quarterly",
      "Banks set mortgage rates based on policy rate plus risk margin",
      "Variable rate mortgages adjust with policy rate changes",
      "Fixed rate mortgages may be offered for initial periods (1-5 years)",
      "Rate changes must be communicated 30 days in advance",
      "Maximum spread guidelines for different loan categories",
      "Current mortgage rates typically range from 21-30% per annum",
    ],
    icon: "chart",
    lastUpdated: "2024",
    source: "BOZ Monetary Policy Framework",
  },
  {
    id: "property-valuation",
    title: "Property Valuation Standards",
    description:
      "Requirements for property valuation in mortgage transactions.",
    details: [
      "Valuations must be conducted by registered valuers",
      "Zambia Institute of Valuers (ZIV) members preferred",
      "Valuation valid for 3-6 months depending on market conditions",
      "Independent valuation required (not affiliated with borrower)",
      "Detailed valuation report with comparable sales data required",
      "Re-valuation required for loan restructuring",
      "Banks may require second valuation for high-value properties",
    ],
    icon: "building",
    lastUpdated: "2024",
    source: "Property Valuation Guidelines",
  },
  {
    id: "aml-kyc",
    title: "Anti-Money Laundering & KYC",
    description:
      "Identity verification and source of funds requirements for mortgages.",
    details: [
      "Valid National Registration Card (NRC) or passport required",
      "Proof of residential address (utility bills, tenancy agreement)",
      "Source of funds documentation for deposit amount",
      "Employment verification letter for salaried borrowers",
      "Business registration for self-employed applicants",
      "Enhanced due diligence for high-value transactions (above K5M)",
      "Ongoing monitoring of mortgage accounts",
      "Suspicious activity reporting requirements",
    ],
    icon: "identification",
    lastUpdated: "2024",
    source: "Financial Intelligence Centre Act",
  },
];

export const bozPolicies: BOZPolicy[] = [
  {
    id: "policy-rate",
    name: "Monetary Policy Rate",
    currentRate: 12.5,
    description:
      "The benchmark interest rate set by BOZ that influences all lending rates in the economy.",
    effectiveDate: "November 2024",
    impactOnMortgages:
      "Mortgage rates typically range from policy rate + 10-18% depending on risk assessment and bank margin.",
  },
  {
    id: "statutory-reserve",
    name: "Statutory Reserve Ratio",
    currentRate: 9.0,
    description:
      "Percentage of deposits banks must hold with BOZ, affecting their lending capacity.",
    effectiveDate: "2024",
    impactOnMortgages:
      "Higher reserves reduce bank liquidity available for mortgage lending, potentially affecting approval rates.",
  },
  {
    id: "overnight-rate",
    name: "Overnight Lending Rate",
    currentRate: 13.5,
    description: "Rate at which BOZ lends to commercial banks overnight.",
    effectiveDate: "2024",
    impactOnMortgages:
      "Affects short-term funding costs for banks, indirectly influencing mortgage pricing.",
  },
];

export const mortgageFees: MortgageFee[] = [
  {
    name: "Processing Fee",
    range: "1-2% of loan amount",
    description:
      "Bank's fee for processing and underwriting the loan application",
    paidTo: "Bank",
  },
  {
    name: "Valuation Fee",
    range: "K2,000 - K5,000",
    description: "Professional property valuation cost by registered valuer",
    paidTo: "Valuation Company",
  },
  {
    name: "Legal Fees (Conveyancing)",
    range: "1-2% of property value",
    description: "Lawyer fees for title search, documentation, and registration",
    paidTo: "Lawyer",
  },
  {
    name: "Mortgage Registration",
    range: "0.5% of loan amount",
    description: "Government fee to register mortgage on title deed",
    paidTo: "Ministry of Lands",
  },
  {
    name: "Life Insurance Premium",
    range: "0.3-0.5% annually",
    description: "Mandatory life cover to protect loan in case of death",
    paidTo: "Insurance Company",
  },
  {
    name: "Property Insurance",
    range: "0.1-0.3% annually",
    description: "Insurance covering fire, flood, and other property risks",
    paidTo: "Insurance Company",
  },
  {
    name: "Survey Fee",
    range: "K1,500 - K3,000",
    description: "Land survey verification if required by bank",
    paidTo: "Survey Department",
  },
  {
    name: "Stamp Duty",
    range: "See property transfer rates",
    description: "Government tax on various mortgage documents",
    paidTo: "Government (ZRA)",
  },
];

export const hiddenCosts = [
  "Annual facility management fees (some banks charge K500-K2,000/year)",
  "Early repayment penalties (typically 1-3% of outstanding balance)",
  "Rate change notification fees (rare, but some banks charge)",
  "Account maintenance fees (usually K50-K200/month)",
  "Arrears/late payment fees (usually 2-5% of overdue amount)",
  "Insurance renewal processing fees",
  "Statement request fees (for additional copies)",
];

export const eligibilityCriteria = {
  general: [
    "Zambian citizen or legal resident with valid work permit",
    "Age 21-60 years (loan must be repaid before age 65)",
    "Minimum 2 years employment history",
    "Clean credit record (no defaults in last 12 months)",
    "Debt-to-income ratio below 40%",
  ],
  employed: [
    "Confirmed employment letter",
    "Minimum 6 months with current employer",
    "Monthly income at least K12,000-K25,000 (varies by bank)",
    "NAPSA contributions up to date",
  ],
  selfEmployed: [
    "Business operating for at least 2-3 years",
    "Audited financial statements",
    "Tax compliance certificate from ZRA",
    "Consistent business income demonstrated",
  ],
  diaspora: [
    "Valid Zambian passport or NRC",
    "Proof of income from foreign employer",
    "Bank statements from country of residence",
    "May require Zambian guarantor",
    "Higher deposit requirements (typically 30-40%)",
  ],
};

export const creditScoreFactors = [
  {
    factor: "Payment History",
    weight: "35%",
    description: "Track record of paying bills and loans on time",
  },
  {
    factor: "Credit Utilization",
    weight: "30%",
    description: "How much of available credit is being used",
  },
  {
    factor: "Credit History Length",
    weight: "15%",
    description: "How long you've had credit accounts",
  },
  {
    factor: "Credit Mix",
    weight: "10%",
    description: "Variety of credit types (loans, cards, etc.)",
  },
  {
    factor: "New Credit Inquiries",
    weight: "10%",
    description: "Recent applications for new credit",
  },
];
