"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  questions: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    category: "Eligibility",
    questions: [
      {
        question: "What is the minimum income required for a mortgage in Zambia?",
        answer:
          "Most banks require a minimum monthly income of K12,000-K25,000 depending on the loan amount and bank. Your debt-to-income ratio (total monthly debt payments including the new mortgage) should not exceed 40% of your gross monthly income.",
      },
      {
        question: "Can non-Zambian citizens get a mortgage?",
        answer:
          "Yes, non-Zambian citizens can obtain mortgages, but additional requirements apply. You'll need ministerial consent from the Ministry of Lands, and banks typically require higher deposits (30-40%) and may have stricter income verification requirements.",
      },
      {
        question: "Can self-employed individuals qualify for a mortgage?",
        answer:
          "Yes, self-employed individuals can qualify. You'll need to provide 2-3 years of audited financial statements, a valid tax clearance certificate from ZRA, business registration documents from PACRA, and 12 months of business bank statements showing consistent income.",
      },
      {
        question: "What is the age limit for mortgage applicants?",
        answer:
          "Most banks accept applicants aged 21-60 years. The mortgage must typically be fully repaid before the borrower turns 65, which may limit the loan tenure for older applicants.",
      },
    ],
  },
  {
    category: "Interest Rates & Costs",
    questions: [
      {
        question: "What are typical mortgage interest rates in Zambia?",
        answer:
          "Mortgage interest rates in Zambia typically range from 21-30% per annum, depending on the bank, loan amount, your credit profile, and relationship with the bank. Premium customers and those with larger deposits may access lower rates.",
      },
      {
        question: "What additional costs should I budget for?",
        answer:
          "Beyond the deposit, budget for: Processing fee (1-2% of loan), property valuation (K2,000-K5,000), legal/conveyancing fees (1-2% of property value), stamp duty, insurance premiums (life and property), and Property Transfer Tax (5%, paid by seller but affects negotiations).",
      },
      {
        question: "Are there penalties for early repayment?",
        answer:
          "Early repayment policies vary by bank. Some banks allow early repayment without penalty, while others charge 1-3% of the outstanding balance. Always confirm this before signing your mortgage agreement.",
      },
      {
        question: "Are there any tax benefits for mortgage holders?",
        answer:
          "Currently, Zambia does not offer significant tax deductions for mortgage interest payments like some other countries. However, tax laws can change, so consult with a tax advisor for your specific situation.",
      },
    ],
  },
  {
    category: "Process & Timeline",
    questions: [
      {
        question: "How long does mortgage approval take?",
        answer:
          "From application to approval typically takes 2-4 weeks, depending on how quickly you submit complete documentation and the bank's processing times. Pre-approval can be faster (1-2 weeks) as it doesn't require property valuation.",
      },
      {
        question: "How long does the entire property transfer take?",
        answer:
          "The complete process from sale agreement to title transfer and moving in typically takes 2-4 months. Factors affecting this include Ministry of Lands processing times, bank approval speed, whether consent is required (for non-citizens), and any title issues to resolve.",
      },
      {
        question: "Can I get pre-approved before finding a property?",
        answer:
          "Yes, and it's recommended! Pre-approval shows sellers you're a serious buyer with confirmed financing. It typically lasts 3-6 months and helps you understand exactly what you can afford before house hunting.",
      },
    ],
  },
  {
    category: "Property Requirements",
    questions: [
      {
        question: "What type of properties can be mortgaged?",
        answer:
          "Properties must have a clear leasehold title (Certificate of Title), be on State Land (not customary/traditional land), and meet the bank's valuation requirements. The property must also be adequately insured.",
      },
      {
        question: "Can I get a mortgage for land or construction?",
        answer:
          "Some banks offer construction loans or land purchase loans, but terms are typically stricter. Expect higher deposit requirements (30-40%), shorter repayment periods, and the loan may be released in stages tied to construction milestones.",
      },
      {
        question: "What if the property has an existing mortgage?",
        answer:
          "This is common and manageable. The seller's existing mortgage must be discharged at or before transfer. Your bank will coordinate with the seller's bank to ensure the existing charge is cleared and your new mortgage is registered.",
      },
      {
        question: "Can I buy property in any location in Zambia?",
        answer:
          "You can buy property anywhere in Zambia where State Land with leasehold title is available. Properties on customary land cannot be mortgaged until converted to leasehold. Some banks may have preferences for urban properties due to easier valuation and resale.",
      },
    ],
  },
];

export function MortgageFAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("Eligibility");

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const currentCategory = faqData.find((c) => c.category === activeCategory);

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {faqData.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(cat.category)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeCategory === cat.category
                ? "bg-primary-600 text-white"
                : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700"
            )}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {currentCategory?.questions.map((item, idx) => {
          const itemId = `${activeCategory}-${idx}`;
          const isOpen = openItems.includes(itemId);

          return (
            <div
              key={idx}
              className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(itemId)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-medium text-stone-900 dark:text-stone-50 pr-4">
                  {item.question}
                </span>
                <svg
                  className={cn(
                    "w-5 h-5 text-stone-500 dark:text-stone-400 flex-shrink-0 transition-transform",
                    isOpen && "rotate-180"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  isOpen ? "max-h-96" : "max-h-0"
                )}
              >
                <div className="px-6 pb-4">
                  <p className="text-stone-600 dark:text-stone-400">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact CTA */}
      <div className="mt-8 bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 text-center">
        <h4 className="font-semibold text-stone-900 dark:text-stone-50 mb-2">
          Still have questions?
        </h4>
        <p className="text-stone-600 dark:text-stone-400 mb-4">
          Our mortgage specialists are here to help you navigate the process.
        </p>
        <button className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
          Contact Us
        </button>
      </div>
    </div>
  );
}
