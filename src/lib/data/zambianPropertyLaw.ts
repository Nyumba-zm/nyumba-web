// Zambian Property Law and Transfer Process
// Source: Laws of Zambia, Ministry of Lands

export interface PropertyLaw {
  id: string;
  title: string;
  chapter: string;
  description: string;
  keyProvisions: string[];
  relevanceToMortgages: string;
  source: string;
}

export interface TransferStep {
  step: number;
  title: string;
  description: string;
  duration: string;
  documents: string[];
  estimatedCost: string;
  responsible: string;
  tips: string[];
}

export interface DocumentRequirement {
  category: string;
  icon: string;
  documents: {
    name: string;
    description: string;
    mandatory: boolean;
    obtainedFrom: string;
    estimatedCost?: string;
    validityPeriod?: string;
  }[];
}

export interface StampDutyRate {
  document: string;
  rate: string;
  notes: string;
}

export const propertyLaws: PropertyLaw[] = [
  {
    id: "lands-act",
    title: "The Lands Act",
    chapter: "Cap 184",
    description:
      "Primary legislation governing land tenure, administration, and alienation in Zambia. Establishes the framework for land ownership and transfer.",
    keyProvisions: [
      "All land in Zambia is vested in the President on behalf of the people",
      "Land may be held under State Land (leasehold) or Customary Tenure",
      "Leasehold terms typically 99 years for residential property",
      "Conversion of customary land to leasehold is possible with proper process",
      "Non-Zambian citizens may acquire land with ministerial consent",
      "Land cannot be used as security without a proper title deed",
      "Ground rent payable annually to the government",
    ],
    relevanceToMortgages:
      "Title deeds are required for mortgage security. Banks require clear leasehold title before approving loans. Properties on customary land generally cannot be mortgaged until converted to leasehold.",
    source: "Laws of Zambia, Chapter 184",
  },
  {
    id: "lands-deeds-registry",
    title: "Lands and Deeds Registry Act",
    chapter: "Cap 185",
    description:
      "Governs registration of land titles and all transactions affecting land in Zambia.",
    keyProvisions: [
      "All land transactions must be registered at the Lands Registry",
      "Registry maintained by Ministry of Lands and Natural Resources",
      "Title searches available for due diligence purposes",
      "Mortgages must be registered as encumbrances on title",
      "Caveat system available for protecting third-party interests",
      "Certificate of Title is conclusive evidence of ownership",
      "Duplicate certificates issued for lost titles (with affidavit)",
    ],
    relevanceToMortgages:
      "The mortgage must be registered on the title deed as an encumbrance. Banks always conduct title searches before approval to verify ownership and check for existing charges.",
    source: "Laws of Zambia, Chapter 185",
  },
  {
    id: "property-transfer-tax",
    title: "Property Transfer Tax Act",
    chapter: "Cap 340",
    description:
      "Establishes tax obligations on property transfers and related transactions.",
    keyProvisions: [
      "Property Transfer Tax (PTT) charged at 5% of property open market value",
      "Payable by the transferor (seller) at time of transfer",
      "Must be paid before registration can be effected",
      "Exemptions available for certain government and charitable transfers",
      "Tax clearance certificate required from ZRA",
      "Penalties apply for late payment or non-compliance",
      "Valuation for PTT purposes done by ZRA-approved valuers",
    ],
    relevanceToMortgages:
      "Buyers should budget for the overall transaction cost. While PTT is paid by the seller, it affects the net proceeds and negotiating position. Banks require proof of tax clearance for completion.",
    source: "Property Transfer Tax Act, Chapter 340",
  },
  {
    id: "survey-act",
    title: "Survey Act",
    chapter: "Cap 188",
    description:
      "Governs land surveying, boundary determination, and cadastral records.",
    keyProvisions: [
      "All land must be surveyed before title issuance",
      "Surveys conducted by licensed land surveyors only",
      "Cadastral surveys required for any subdivision",
      "Survey diagrams filed with Survey Department",
      "Boundary disputes resolved through official survey",
      "Aerial and GPS surveys permitted for large areas",
      "Survey beacons protected by law",
    ],
    relevanceToMortgages:
      "Banks require verified survey diagrams showing exact boundaries. Properties with boundary disputes or unclear surveys may face delays or rejection for mortgage financing.",
    source: "Laws of Zambia, Chapter 188",
  },
  {
    id: "urban-regional-planning",
    title: "Urban and Regional Planning Act",
    chapter: "No. 3 of 2015",
    description:
      "Regulates development, land use zoning, and building standards.",
    keyProvisions: [
      "Zoning regulations determine permitted land use",
      "Building permits required before any construction",
      "Planning permission needed for change of use",
      "Development control and enforcement by local authorities",
      "Environmental impact assessments for certain developments",
      "Infrastructure requirements for new developments",
      "Non-conforming uses may be grandfathered",
    ],
    relevanceToMortgages:
      "Banks verify planning compliance before approval. Properties with planning issues, illegal extensions, or zoning violations may not qualify for mortgage financing.",
    source: "Urban and Regional Planning Act No. 3 of 2015",
  },
];

export const propertyTransferSteps: TransferStep[] = [
  {
    step: 1,
    title: "Sale Agreement",
    description:
      "Buyer and seller negotiate and sign a formal sale agreement, usually with a 10% deposit.",
    duration: "1-2 weeks",
    documents: [
      "Sale Agreement (prepared by lawyer)",
      "Identification documents (NRC/Passport) of both parties",
      "Proof of deposit payment",
      "Existing title deed copy",
    ],
    estimatedCost: "Legal fees: 1-2% of purchase price",
    responsible: "Conveyancing Lawyer",
    tips: [
      "Ensure the sale agreement includes all conditions (subject to finance, survey, etc.)",
      "Negotiate who pays for which costs upfront",
      "Include a timeline for completion",
    ],
  },
  {
    step: 2,
    title: "Title Search & Due Diligence",
    description:
      "Conduct official title search at Lands Registry to verify ownership and check for encumbrances.",
    duration: "1-2 weeks",
    documents: [
      "Title search report from Lands Registry",
      "Rates clearance certificate from local council",
      "Survey diagram verification",
      "Check for any caveats or restrictions",
    ],
    estimatedCost: "Search fee: K500-K1,000",
    responsible: "Conveyancing Lawyer",
    tips: [
      "Always conduct a fresh search, even if seller provides old documents",
      "Verify ground rent is up to date",
      "Check for any pending litigation on the property",
    ],
  },
  {
    step: 3,
    title: "Mortgage Application",
    description:
      "Apply to bank for mortgage pre-approval and arrange property valuation.",
    duration: "2-4 weeks",
    documents: [
      "Mortgage application form",
      "Income verification (pay slips, employment letter)",
      "Bank statements (6 months)",
      "Property valuation report",
      "Life insurance application",
      "Copy of sale agreement",
    ],
    estimatedCost: "Valuation: K2,000-K5,000; Processing fee: 1-2%",
    responsible: "Borrower / Bank",
    tips: [
      "Get pre-approved before property hunting to know your budget",
      "Compare offers from multiple banks",
      "Prepare all documents in advance to speed up approval",
    ],
  },
  {
    step: 4,
    title: "Property Transfer Tax Payment",
    description:
      "Seller pays Property Transfer Tax (5% of property value) at ZRA.",
    duration: "1-2 weeks",
    documents: [
      "PTT assessment form from ZRA",
      "Sale agreement copy",
      "Title deed copy",
      "Valuation report for PTT purposes",
      "Tax clearance certificate (after payment)",
    ],
    estimatedCost: "5% of property value (paid by seller)",
    responsible: "Seller / Seller's Lawyer",
    tips: [
      "This is legally the seller's responsibility, but sometimes negotiated",
      "ZRA may conduct their own valuation if sale price seems low",
      "PTT must be paid before registration can proceed",
    ],
  },
  {
    step: 5,
    title: "Consent & Approvals",
    description:
      "Obtain necessary consents (Commissioner of Lands consent required for non-citizens and companies).",
    duration: "2-8 weeks",
    documents: [
      "Consent application form",
      "Company documents (if applicable)",
      "Board resolution (for companies)",
      "Investment proof (for foreigners)",
      "Proposed use declaration",
    ],
    estimatedCost: "Consent fee: K500-K2,000",
    responsible: "Ministry of Lands",
    tips: [
      "Consent is required for ALL non-Zambian buyers",
      "Corporate purchases also require consent",
      "Processing times vary - follow up regularly",
    ],
  },
  {
    step: 6,
    title: "Mortgage Registration",
    description:
      "Bank's mortgage is registered as an encumbrance on the title deed.",
    duration: "1-2 weeks",
    documents: [
      "Mortgage deed (prepared by bank's lawyers)",
      "Power of attorney (if required)",
      "Life insurance certificate",
      "Property insurance certificate",
      "Loan offer letter (signed)",
    ],
    estimatedCost: "Registration: 0.5% of loan amount (max K50,000)",
    responsible: "Bank's Lawyers",
    tips: [
      "Mortgage registration happens before or simultaneously with transfer",
      "Banks hold the original title deed as security",
      "Ensure you understand all mortgage terms before signing",
    ],
  },
  {
    step: 7,
    title: "Transfer of Title",
    description:
      "Title deed is transferred to buyer's name at the Lands Registry.",
    duration: "2-4 weeks",
    documents: [
      "Assignment/Transfer deed",
      "Original title deed",
      "PTT certificate",
      "Rates clearance",
      "Consent letter (if required)",
      "Stamp duty payment receipts",
    ],
    estimatedCost: "Transfer fee: 0.5% of property value",
    responsible: "Ministry of Lands / Conveyancing Lawyer",
    tips: [
      "Processing times at Lands Registry can vary significantly",
      "Consider expedited processing if available",
      "Ensure all documents are correctly prepared to avoid rejection",
    ],
  },
  {
    step: 8,
    title: "Completion & Handover",
    description:
      "Final payment made, keys handed over, and property possession transferred.",
    duration: "1 week",
    documents: [
      "Completion statement",
      "Discharge of seller's mortgage (if any)",
      "Utility transfer forms (ZESCO, water)",
      "Keys and access devices",
      "Final inspection report",
    ],
    estimatedCost: "Final legal fees settlement",
    responsible: "All Parties",
    tips: [
      "Conduct a final inspection before completion",
      "Take meter readings for utilities on handover day",
      "Ensure all agreed fixtures are present",
    ],
  },
];

export const documentRequirements: DocumentRequirement[] = [
  {
    category: "Personal Identification",
    icon: "identification",
    documents: [
      {
        name: "National Registration Card (NRC)",
        description: "Valid green NRC for Zambian citizens",
        mandatory: true,
        obtainedFrom: "National Registration Office",
        validityPeriod: "Lifetime (if undamaged)",
      },
      {
        name: "Passport",
        description: "Valid passport for non-citizens",
        mandatory: true,
        obtainedFrom: "Immigration Department",
        validityPeriod: "As per passport expiry",
      },
      {
        name: "Proof of Address",
        description: "Utility bill or bank statement (less than 3 months old)",
        mandatory: true,
        obtainedFrom: "Utility company / Bank",
        validityPeriod: "3 months",
      },
      {
        name: "Passport Photos",
        description: "Recent passport-size photographs",
        mandatory: true,
        obtainedFrom: "Photo studio",
        estimatedCost: "K50-K100",
      },
    ],
  },
  {
    category: "Income Verification (Employed)",
    icon: "briefcase",
    documents: [
      {
        name: "Employment Letter",
        description:
          "Confirmation of employment, position, and salary from employer",
        mandatory: true,
        obtainedFrom: "Employer (HR Department)",
        validityPeriod: "3 months",
      },
      {
        name: "Pay Slips",
        description: "Last 3-6 months pay slips showing salary breakdown",
        mandatory: true,
        obtainedFrom: "Employer",
      },
      {
        name: "Bank Statements",
        description: "6 months statements showing salary deposits and expenses",
        mandatory: true,
        obtainedFrom: "Your bank",
        estimatedCost: "K50-K200",
      },
      {
        name: "NAPSA Statement",
        description: "National Pension Scheme contributions record",
        mandatory: false,
        obtainedFrom: "NAPSA",
        estimatedCost: "Free",
      },
    ],
  },
  {
    category: "Income Verification (Self-Employed)",
    icon: "building",
    documents: [
      {
        name: "Business Registration Certificate",
        description: "PACRA certificate and company documents",
        mandatory: true,
        obtainedFrom: "PACRA",
        validityPeriod: "Must be current",
      },
      {
        name: "Tax Clearance Certificate",
        description: "ZRA tax compliance certificate",
        mandatory: true,
        obtainedFrom: "Zambia Revenue Authority",
        validityPeriod: "1 year",
        estimatedCost: "Free if compliant",
      },
      {
        name: "Audited Financial Statements",
        description: "2-3 years audited accounts showing business performance",
        mandatory: true,
        obtainedFrom: "Registered Accountant/Auditor",
        estimatedCost: "K5,000-K20,000",
      },
      {
        name: "Business Bank Statements",
        description: "12 months business account statements",
        mandatory: true,
        obtainedFrom: "Business bank",
      },
    ],
  },
  {
    category: "Property Documents",
    icon: "document",
    documents: [
      {
        name: "Certificate of Title",
        description: "Original title deed showing current ownership",
        mandatory: true,
        obtainedFrom: "Seller / Ministry of Lands",
      },
      {
        name: "Survey Diagram",
        description: "Approved survey showing property boundaries and area",
        mandatory: true,
        obtainedFrom: "Survey Department",
        estimatedCost: "K1,500-K3,000 for new survey",
      },
      {
        name: "Rates Clearance Certificate",
        description: "Proof that council rates are paid up to date",
        mandatory: true,
        obtainedFrom: "Local Council",
        estimatedCost: "K100-K500",
      },
      {
        name: "Valuation Report",
        description: "Professional property valuation by registered valuer",
        mandatory: true,
        obtainedFrom: "Bank-approved Valuer",
        estimatedCost: "K2,000-K5,000",
        validityPeriod: "3-6 months",
      },
      {
        name: "Building Plans (if applicable)",
        description: "Approved building plans from local council",
        mandatory: false,
        obtainedFrom: "Local Council / Seller",
      },
    ],
  },
];

export const stampDutyRates: StampDutyRate[] = [
  {
    document: "Sale Agreement",
    rate: "K500 (flat rate)",
    notes: "Fixed rate regardless of property value",
  },
  {
    document: "Assignment/Transfer Deed",
    rate: "0.5% of property value",
    notes: "Paid when registering transfer at Lands Registry",
  },
  {
    document: "Mortgage Deed",
    rate: "0.5% of loan amount",
    notes: "Maximum of K50,000 applies",
  },
  {
    document: "Lease Agreement",
    rate: "K200-K500",
    notes: "Depends on lease term and value",
  },
  {
    document: "Power of Attorney",
    rate: "K100 (flat rate)",
    notes: "Required if signing through representative",
  },
  {
    document: "Caveat",
    rate: "K200",
    notes: "To protect interest in property",
  },
];

export const stampDutyExemptions = [
  "Government and quasi-government transactions",
  "Charitable organizations (with Ministry approval)",
  "Certain agricultural land transfers",
  "Transfers between spouses (in some circumstances)",
  "Inheritance transfers (subject to conditions)",
];

export const commonIssues = [
  {
    issue: "Incomplete Title",
    description:
      "Property may have provisional title or pending issues at Lands Registry",
    solution:
      "Engage lawyer to resolve before proceeding; may require additional surveys or documentation",
    timeToResolve: "2-6 months",
  },
  {
    issue: "Boundary Disputes",
    description: "Neighboring property owners dispute the boundaries",
    solution:
      "Official survey by licensed surveyor; may require court resolution",
    timeToResolve: "3-12 months",
  },
  {
    issue: "Outstanding Rates",
    description: "Unpaid council rates creating arrears on property",
    solution: "Seller must clear all arrears before transfer can proceed",
    timeToResolve: "1-4 weeks",
  },
  {
    issue: "Existing Mortgage",
    description: "Property has existing bank charge that must be discharged",
    solution: "Seller's bank provides discharge upon loan settlement",
    timeToResolve: "2-4 weeks",
  },
  {
    issue: "Matrimonial Property",
    description: "Spouse consent required for sale of matrimonial home",
    solution: "Both spouses must sign sale documents",
    timeToResolve: "As needed",
  },
  {
    issue: "Estate Property",
    description: "Property forms part of a deceased person's estate",
    solution: "Letters of administration and court approval required",
    timeToResolve: "3-12 months",
  },
];

export const totalTransferTimeline = {
  minimum: "2 months",
  typical: "3-4 months",
  complex: "6-12 months",
  factors: [
    "Ministry of Lands processing times",
    "Bank approval speed",
    "Document completeness",
    "Whether consent is required",
    "Any title issues to resolve",
  ],
};
