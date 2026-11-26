"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { type ZambianBank } from "@/lib/data/zambianBanks";

interface BankCardProps {
  bank: ZambianBank;
  isSelected?: boolean;
  onSelect?: (bankId: string) => void;
  onApply?: (bankId: string) => void;
  className?: string;
}

export function BankCard({
  bank,
  isSelected = false,
  onSelect,
  onApply,
  className,
}: BankCardProps) {
  const product = bank.mortgageProducts[0];

  return (
    <div
      className={cn(
        "bg-white dark:bg-stone-800 rounded-xl border p-6 hover:shadow-lg transition-all",
        isSelected
          ? "border-primary-600 dark:border-primary-500 border-2 shadow-md"
          : "border-stone-200 dark:border-stone-700",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
              {bank.shortName.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-50">
              {bank.shortName}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-sm",
                    i < Math.floor(bank.rating)
                      ? "text-yellow-400"
                      : "text-stone-300 dark:text-stone-600"
                  )}
                >
                  ★
                </span>
              ))}
              <span className="text-xs text-stone-500 dark:text-stone-400 ml-1">
                ({bank.reviewCount})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interest Rate - Highlighted */}
      <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mb-4">
        <div className="text-sm text-stone-600 dark:text-stone-400 mb-1">
          Interest Rate
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            {product.interestRate.min}
          </span>
          <span className="text-lg text-stone-500 dark:text-stone-400">
            - {product.interestRate.max}%
          </span>
        </div>
        <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          per annum
        </div>
      </div>

      {/* Key Details */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div>
          <div className="text-stone-500 dark:text-stone-400">Max Loan</div>
          <div className="font-semibold text-stone-900 dark:text-stone-100">
            K{(product.maxLoanAmount / 1000000).toFixed(1)}M
          </div>
        </div>
        <div>
          <div className="text-stone-500 dark:text-stone-400">Min Deposit</div>
          <div className="font-semibold text-stone-900 dark:text-stone-100">
            {product.minDeposit}%
          </div>
        </div>
        <div>
          <div className="text-stone-500 dark:text-stone-400">Tenure</div>
          <div className="font-semibold text-stone-900 dark:text-stone-100">
            {product.loanTenure.min}-{product.loanTenure.max} years
          </div>
        </div>
        <div>
          <div className="text-stone-500 dark:text-stone-400">Processing</div>
          <div className="font-semibold text-stone-900 dark:text-stone-100">
            {product.processingFee}%
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-4">
        <div className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
          Key Features
        </div>
        <ul className="space-y-1">
          {product.features.slice(0, 3).map((feature, idx) => (
            <li
              key={idx}
              className="text-sm text-stone-600 dark:text-stone-400 flex items-start gap-2"
            >
              <svg
                className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant={isSelected ? "primary" : "outline"}
          size="sm"
          className="flex-1"
          onClick={() => onSelect?.(bank.id)}
        >
          {isSelected ? "✓ Selected" : "Compare"}
        </Button>
        <Button size="sm" className="flex-1" onClick={() => onApply?.(bank.id)}>
          Apply
        </Button>
      </div>
    </div>
  );
}
