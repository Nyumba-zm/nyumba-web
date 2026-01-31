"use client";

import { cn } from "@/lib/utils/cn";

const applicationSteps = [
  {
    step: 1,
    title: "Check Your Eligibility",
    description: "Review income requirements and gather initial documents",
    details: [
      "Minimum income K12,000-K25,000/month (varies by bank)",
      "Debt-to-income ratio below 40%",
      "Clean credit history (no defaults in 12 months)",
      "Age 21-60 years",
    ],
    documents: ["NRC/Passport", "Proof of address"],
    duration: "1 day",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    step: 2,
    title: "Gather Income Documents",
    description: "Prepare proof of income based on your employment type",
    details: [
      "Employed: Pay slips, employment letter, bank statements",
      "Self-employed: Audited financials, tax clearance, business registration",
      "Banks require 6-12 months of income history",
    ],
    documents: [
      "3-6 months pay slips",
      "Employment confirmation letter",
      "6 months bank statements",
      "NAPSA statement (optional)",
    ],
    duration: "1-2 weeks",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    step: 3,
    title: "Get Pre-Approved",
    description: "Submit application to receive pre-approval letter",
    details: [
      "Complete bank's mortgage application form",
      "Submit all required documents",
      "Bank assesses creditworthiness",
      "Receive pre-approval letter (valid 3-6 months)",
    ],
    documents: [
      "Completed application form",
      "All income documents",
      "ID documents",
    ],
    duration: "1-2 weeks",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    step: 4,
    title: "Find Your Property",
    description: "Search for property within your approved budget",
    details: [
      "Browse listings on Nyumba",
      "Consider location, size, and amenities",
      "Verify property has clear title deed",
      "Negotiate price with seller",
    ],
    documents: [
      "Property listing details",
      "Seller's title deed copy",
    ],
    duration: "Varies",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    step: 5,
    title: "Property Valuation",
    description: "Bank arranges independent property valuation",
    details: [
      "Bank appoints approved valuer",
      "Valuation confirms market value",
      "Bank approves loan based on valuation",
      "Valuation typically costs K2,000-K5,000",
    ],
    documents: [
      "Title deed",
      "Survey diagram",
      "Building plans (if available)",
    ],
    duration: "1-2 weeks",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    step: 6,
    title: "Final Approval & Signing",
    description: "Complete loan documentation and sign mortgage deed",
    details: [
      "Review final loan offer",
      "Sign mortgage agreement",
      "Arrange insurance (life & property)",
      "Pay processing fees",
    ],
    documents: [
      "Signed loan agreement",
      "Insurance certificates",
      "Processing fee payment",
    ],
    duration: "1 week",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    step: 7,
    title: "Registration & Disbursement",
    description: "Mortgage registered and funds released",
    details: [
      "Mortgage registered at Lands Registry",
      "Title deed held by bank as security",
      "Funds disbursed to seller/developer",
      "Property transfer completed",
    ],
    documents: [
      "Registered mortgage deed",
      "Transfer documents",
    ],
    duration: "2-4 weeks",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    step: 8,
    title: "Move In & Repay",
    description: "Take possession and begin monthly repayments",
    details: [
      "Receive keys and take possession",
      "Set up direct debit for repayments",
      "Keep insurance current",
      "Build equity over time",
    ],
    documents: [
      "Completion certificate",
      "Utility transfer forms",
    ],
    duration: "Ongoing",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

export function ApplicationSteps() {
  return (
    <div className="space-y-6">
      {/* Timeline */}
      <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 p-6 mb-8">
        <h4 className="font-semibold text-stone-900 dark:text-stone-50 mb-4">
          Typical Timeline
        </h4>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-stone-600 dark:text-stone-400">
              Pre-approval: 1-2 weeks
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary-500" />
            <span className="text-stone-600 dark:text-stone-400">
              Property search: Varies
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-stone-600 dark:text-stone-400">
              Final approval: 2-4 weeks
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-stone-600 dark:text-stone-400">
              Registration: 2-4 weeks
            </span>
          </div>
        </div>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-3">
          Total process typically takes 2-4 months from application to moving in.
        </p>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-2 gap-6">
        {applicationSteps.map((step) => (
          <div
            key={step.step}
            className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0">
                {step.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-stone-900 dark:text-stone-50">
                    Step {step.step}: {step.title}
                  </h3>
                  <span className="text-xs bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 px-2 py-1 rounded-full">
                    {step.duration}
                  </span>
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
                  {step.description}
                </p>

                <ul className="space-y-1 mb-3">
                  {step.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-stone-600 dark:text-stone-400 flex items-start gap-2"
                    >
                      <span className="text-primary-600 dark:text-primary-400">
                        •
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {step.documents.map((doc, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-2 py-1 rounded"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
