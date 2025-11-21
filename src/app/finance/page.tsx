"use client";

import { useState } from "react";
import {
  LenderCard,
  LenderComparison,
  MultiBankMatcher,
} from "@/components/features/finance";
import { mockLenders } from "@/lib/mockFeatureData";
import { Button } from "@/components/ui/Button";

export default function LendersPage() {
  const [selectedLenders, setSelectedLenders] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleCompare = (lenderId: string) => {
    setSelectedLenders((prev) => {
      if (prev.includes(lenderId)) {
        return prev.filter((id) => id !== lenderId);
      }
      if (prev.length < 3) {
        return [...prev, lenderId];
      }
      return prev;
    });
  };

  const handleApply = (lenderId: string) => {
    console.log("Apply for loan with lender:", lenderId);
    // TODO: Navigate to application page or open modal
  };

  const recommendedLender = mockLenders.reduce((prev, current) =>
    current.rating > prev.rating ? current : prev
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find the Best Home Loan
          </h1>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl">
            Compare mortgage rates from Zambia&apos;s top lenders. Get
            pre-qualified in minutes and find the perfect financing for your
            dream home.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-2">🏦</div>
              <h3 className="text-xl font-semibold mb-2">Compare Rates</h3>
              <p className="text-primary-100">
                View and compare interest rates from multiple lenders in one
                place
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Fast Approval</h3>
              <p className="text-primary-100">
                Get pre-qualified quickly with our streamlined application
                process
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-primary-100">
                Our AI recommends the best lenders based on your unique profile
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Multi-Bank Matcher */}
        <div className="mb-12">
          <MultiBankMatcher />
        </div>

        <div className="border-t-2 border-gray-200 my-12" />

        {/* Comparison Bar */}
        {selectedLenders.length > 0 && (
          <div className="bg-primary-50 border-2 border-primary-300 rounded-lg p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-primary-900 font-medium">
                {selectedLenders.length} lender
                {selectedLenders.length > 1 ? "s" : ""} selected for comparison
              </p>
              <p className="text-xs text-primary-700">
                Select up to 3 lenders to compare side-by-side
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedLenders([])}
                className="flex-1 sm:flex-none"
              >
                Clear Selection
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowComparison(true)}
                disabled={selectedLenders.length < 2}
                className="flex-1 sm:flex-none"
              >
                Compare Selected
              </Button>
            </div>
          </div>
        )}

        {/* Lenders Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Available Lenders
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockLenders.map((lender) => (
              <LenderCard
                key={lender.id}
                lender={lender}
                isRecommended={lender.id === recommendedLender.id}
                isSelected={selectedLenders.includes(lender.id)}
                onCompare={handleCompare}
                onApply={handleApply}
              />
            ))}
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Understanding Home Loans in Zambia
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                💰 What to Consider
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Interest rates and how they affect monthly payments
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Processing fees and other upfront costs
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Loan tenure and its impact on total repayment
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Your monthly income and debt-to-income ratio
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                📋 Required Documents
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  National Registration Card (NRC)
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Proof of income (pay slips, bank statements)
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Property valuation report
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Proof of deposit (usually 20% of property value)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Modal */}
      {showComparison && (
        <LenderComparison
          lenders={mockLenders.filter((l) => selectedLenders.includes(l.id))}
          onClose={() => setShowComparison(false)}
          onApply={handleApply}
        />
      )}
    </div>
  );
}
