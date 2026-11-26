"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FinanceHero,
  BankCard,
  LoanCalculator,
  MultiBankMatcher,
  BOZRegulationCard,
  PropertyLawSection,
  ApplicationSteps,
  MortgageFAQ,
} from "@/components/features/finance";
import { Button } from "@/components/ui/Button";
import { zambianBanks } from "@/lib/data/zambianBanks";
import { bozRegulations } from "@/lib/data/bozRegulations";

export default function FinancePage() {
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);

  const handleSelectBank = (bankId: string) => {
    setSelectedBanks((prev) => {
      if (prev.includes(bankId)) {
        return prev.filter((id) => id !== bankId);
      }
      if (prev.length < 3) {
        return [...prev, bankId];
      }
      return prev;
    });
  };

  const handleApplyBank = (bankId: string) => {
    const bank = zambianBanks.find((b) => b.id === bankId);
    if (bank) {
      window.open(bank.website, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      {/* 1. Hero Section */}
      <FinanceHero />

      {/* 2. Bank Partners Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-50 mb-4">
              Partner Banks
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-3xl mx-auto">
              Compare mortgage offerings from Zambia&apos;s leading banks.
              All banks are regulated by the Bank of Zambia.
            </p>
          </div>

          {/* Comparison Bar */}
          {selectedBanks.length > 0 && (
            <div className="bg-primary-50 dark:bg-primary-900/30 border-2 border-primary-300 dark:border-primary-700 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-primary-900 dark:text-primary-100 font-medium">
                  {selectedBanks.length} bank{selectedBanks.length > 1 ? "s" : ""}{" "}
                  selected for comparison
                </p>
                <p className="text-xs text-primary-700 dark:text-primary-300">
                  Select up to 3 banks to compare side-by-side
                </p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedBanks([])}
                  className="flex-1 sm:flex-none"
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          )}

          {/* Bank Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {zambianBanks.map((bank) => (
              <BankCard
                key={bank.id}
                bank={bank}
                isSelected={selectedBanks.includes(bank.id)}
                onSelect={handleSelectBank}
                onApply={handleApplyBank}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Mortgage Calculator Section */}
      <section
        id="calculator"
        className="py-16 lg:py-24 bg-stone-50 dark:bg-stone-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-50 mb-4">
              Mortgage Calculator
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-3xl mx-auto">
              Estimate your monthly payments and see how much home you can afford.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <LoanCalculator propertyPrice={1000000} />
          </div>
        </div>
      </section>

      {/* 4. Multi-Bank Matcher Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-50 mb-4">
              Find Your Best Rate
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-3xl mx-auto">
              Answer a few questions and get instant pre-qualification from
              multiple banks.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <MultiBankMatcher />
          </div>
        </div>
      </section>

      {/* 5. BOZ Regulations Section */}
      <section className="py-16 lg:py-24 bg-stone-50 dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-50 mb-4">
              Bank of Zambia Regulations
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-3xl mx-auto">
              Understanding the regulatory framework that protects borrowers
              and ensures fair lending practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bozRegulations.map((regulation) => (
              <BOZRegulationCard key={regulation.id} regulation={regulation} />
            ))}
          </div>

          {/* BOZ Info Box */}
          <div className="mt-12 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-16 h-16 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-8 h-8 text-primary-600 dark:text-primary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50 mb-2">
                  About the Bank of Zambia
                </h3>
                <p className="text-stone-600 dark:text-stone-400 mb-4">
                  The Bank of Zambia (BOZ) is the central bank responsible for
                  regulating and supervising all financial institutions in Zambia.
                  All mortgage providers must be licensed by BOZ and comply with
                  consumer protection guidelines.
                </p>
                <a
                  href="https://www.boz.zm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center gap-1"
                >
                  Visit Bank of Zambia Website
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Property Law Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-50 mb-4">
              Zambian Property Law
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-3xl mx-auto">
              Essential legal information for buying property in Zambia,
              including the transfer process and required documentation.
            </p>
          </div>

          <PropertyLawSection />
        </div>
      </section>

      {/* 7. How to Apply Section */}
      <section className="py-16 lg:py-24 bg-stone-50 dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-50 mb-4">
              How to Apply for a Mortgage
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-3xl mx-auto">
              Follow these steps to successfully obtain a mortgage in Zambia.
            </p>
          </div>

          <ApplicationSteps />
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-50 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-3xl mx-auto">
              Common questions about mortgages and property financing in Zambia.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <MortgageFAQ />
          </div>
        </div>
      </section>

      {/* 9. CTA Section */}
      <section className="py-16 lg:py-24 bg-primary-600 dark:bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
            Take the first step towards owning your dream home. Get pre-qualified
            with multiple banks in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary-700 hover:bg-stone-100 px-8"
            >
              Get Pre-Qualified Now
            </Button>
            <Link href="/properties">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8"
              >
                Browse Properties
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-primary-100">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>8 Partner Banks</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
