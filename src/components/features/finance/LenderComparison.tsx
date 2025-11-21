"use client";

import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

interface Lender {
  id: string;
  name: string;
  logo?: string;
  interestRate: number;
  minTenure: number;
  maxTenure: number;
  processingFee: number;
  maxLoanAmount: number;
  features: string[];
  rating: number;
}

interface LenderComparisonProps {
  lenders: Lender[];
  onClose: () => void;
  onApply: (lenderId: string) => void;
}

export function LenderComparison({
  lenders,
  onClose,
  onApply,
}: LenderComparisonProps) {
  if (lenders.length === 0) return null;

  // Calculate best values for highlighting
  const lowestRate = Math.min(...lenders.map((l) => l.interestRate));
  const lowestFee = Math.min(...lenders.map((l) => l.processingFee));
  const highestLoan = Math.max(...lenders.map((l) => l.maxLoanAmount));
  const highestRating = Math.max(...lenders.map((l) => l.rating));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Lender Comparison</h2>
              <p className="text-primary-100 text-sm">
                Compare {lenders.length} lender{lenders.length > 1 ? "s" : ""}{" "}
                side by side
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="flex-1 overflow-auto p-6">
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(${lenders.length}, minmax(280px, 1fr))`,
            }}
          >
            {lenders.map((lender) => (
              <div
                key={lender.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                {/* Lender Header */}
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg text-gray-900">
                      {lender.name}
                    </h3>
                    {lender.logo && (
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                        <span className="text-xl">{lender.logo}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "text-sm",
                          i < Math.floor(lender.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        )}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                      {lender.rating.toFixed(1)}
                    </span>
                    {lender.rating === highestRating && (
                      <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                        Highest Rated
                      </span>
                    )}
                  </div>
                </div>

                {/* Comparison Details */}
                <div className="p-4 space-y-4">
                  {/* Interest Rate */}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Interest Rate</p>
                    <div className="flex items-baseline gap-2">
                      <p
                        className={cn(
                          "text-2xl font-bold",
                          lender.interestRate === lowestRate
                            ? "text-green-600"
                            : "text-gray-900"
                        )}
                      >
                        {lender.interestRate}%
                      </p>
                      {lender.interestRate === lowestRate && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          Lowest
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Processing Fee */}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Processing Fee</p>
                    <div className="flex items-baseline gap-2">
                      <p
                        className={cn(
                          "text-lg font-semibold",
                          lender.processingFee === lowestFee
                            ? "text-green-600"
                            : "text-gray-900"
                        )}
                      >
                        {lender.processingFee}%
                      </p>
                      {lender.processingFee === lowestFee && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          Lowest
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Loan Tenure */}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Loan Tenure</p>
                    <p className="text-base font-semibold text-gray-900">
                      {lender.minTenure} - {lender.maxTenure} years
                    </p>
                  </div>

                  {/* Max Loan Amount */}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Maximum Loan</p>
                    <div className="flex items-baseline gap-2">
                      <p
                        className={cn(
                          "text-base font-semibold",
                          lender.maxLoanAmount === highestLoan
                            ? "text-green-600"
                            : "text-gray-900"
                        )}
                      >
                        {formatCurrency(lender.maxLoanAmount)}
                      </p>
                      {lender.maxLoanAmount === highestLoan && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          Highest
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Key Features</p>
                    <ul className="space-y-1.5">
                      {lender.features.slice(0, 4).map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-gray-700 flex items-start gap-1.5"
                        >
                          <span className="text-primary-600 mt-0.5">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Apply Button */}
                  <Button
                    className="w-full"
                    onClick={() => {
                      onApply(lender.id);
                      onClose();
                    }}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Monthly Payment Estimate */}
          <div className="mt-8 bg-primary-50 border border-primary-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              💰 Monthly Payment Estimate
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Based on a K1,000,000 loan over 20 years:
            </p>
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: `repeat(${lenders.length}, 1fr)` }}
            >
              {lenders.map((lender) => {
                const loanAmount = 1000000;
                const years = 20;
                const monthlyRate = lender.interestRate / 100 / 12;
                const numPayments = years * 12;
                const monthlyPayment =
                  (loanAmount *
                    monthlyRate *
                    Math.pow(1 + monthlyRate, numPayments)) /
                  (Math.pow(1 + monthlyRate, numPayments) - 1);

                return (
                  <div key={lender.id} className="text-center">
                    <p className="text-xs text-gray-600 mb-1">{lender.name}</p>
                    <p className="text-xl font-bold text-primary-700">
                      {formatCurrency(monthlyPayment)}/mo
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              💡 Tip: Consider total cost over the loan period, not just the
              interest rate
            </p>
            <Button variant="outline" onClick={onClose}>
              Close Comparison
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
