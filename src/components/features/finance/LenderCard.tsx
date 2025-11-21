"use client";

import { Button } from "@/components/ui/Button";
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

interface LenderCardProps {
  lender: Lender;
  isRecommended?: boolean;
  isSelected?: boolean;
  className?: string;
  onCompare?: (lenderId: string) => void;
  onApply?: (lenderId: string) => void;
}

export function LenderCard({
  lender,
  isRecommended = false,
  isSelected = false,
  className,
  onCompare,
  onApply,
}: LenderCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow",
        isRecommended && "border-primary-600 border-2",
        className
      )}
    >
      {isRecommended && (
        <div className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
          Recommended for You
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{lender.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-lg",
                    i < Math.floor(lender.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  )}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {lender.rating.toFixed(1)}
            </span>
          </div>
        </div>
        {lender.logo && (
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">{lender.logo}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Interest Rate</p>
          <p className="text-2xl font-bold text-primary-600">
            {lender.interestRate}%
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Loan Tenure</p>
          <p className="text-lg font-semibold text-gray-900">
            {lender.minTenure}-{lender.maxTenure} years
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Processing Fee</p>
          <p className="text-lg font-semibold text-gray-900">
            {lender.processingFee}%
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Max Loan</p>
          <p className="text-lg font-semibold text-gray-900">
            {(lender.maxLoanAmount / 1000000).toFixed(1)}M
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Key Features</p>
        <ul className="space-y-1">
          {lender.features.slice(0, 3).map((feature, idx) => (
            <li
              key={idx}
              className="text-sm text-gray-600 flex items-center gap-2"
            >
              <span className="text-green-500">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2">
        <Button
          variant={isSelected ? "primary" : "outline"}
          className="flex-1"
          onClick={() => onCompare?.(lender.id)}
        >
          {isSelected ? "✓ Selected" : "Compare"}
        </Button>
        <Button className="flex-1" onClick={() => onApply?.(lender.id)}>
          Apply Now
        </Button>
      </div>
    </div>
  );
}
