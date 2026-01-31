"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

interface LoanCalculatorProps {
  propertyPrice?: number;
  className?: string;
}

export function LoanCalculator({
  propertyPrice = 500000,
  className,
}: LoanCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(propertyPrice * 0.8);
  const [interestRate, setInterestRate] = useState(24);
  const [loanTerm, setLoanTerm] = useState(20);

  const calculateMonthlyPayment = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    return monthlyPayment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * loanTerm * 12;
  const totalInterest = totalPayment - loanAmount;

  // Affordability indicator (assuming 40% DTI)
  const requiredIncome = (monthlyPayment / 0.4);

  return (
    <div
      className={cn(
        "bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 p-6",
        className
      )}
    >
      <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-50 mb-6">
        Mortgage Calculator
      </h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
            Loan Amount (ZMW)
          </label>
          <Input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
            Interest Rate (%)
          </label>
          <Input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Typical rates in Zambia: 21-30%
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
            Loan Term (years)
          </label>
          <div className="flex gap-2">
            {[10, 15, 20, 25].map((term) => (
              <button
                key={term}
                onClick={() => setLoanTerm(term)}
                className={cn(
                  "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                  loanTerm === term
                    ? "bg-primary-600 text-white"
                    : "bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600"
                )}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 rounded-xl p-6 space-y-4">
        <div>
          <p className="text-sm text-stone-600 dark:text-stone-400 mb-1">
            Monthly Payment
          </p>
          <p className="text-3xl font-bold text-stone-900 dark:text-stone-50">
            {formatCurrency(monthlyPayment)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-200 dark:border-primary-700">
          <div>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Total Payment
            </p>
            <p className="text-lg font-semibold text-stone-900 dark:text-stone-50">
              {formatCurrency(totalPayment)}
            </p>
          </div>
          <div>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Total Interest
            </p>
            <p className="text-lg font-semibold text-stone-900 dark:text-stone-50">
              {formatCurrency(totalInterest)}
            </p>
          </div>
        </div>

        {/* Affordability Indicator */}
        <div className="pt-4 border-t border-primary-200 dark:border-primary-700">
          <p className="text-xs text-stone-600 dark:text-stone-400 mb-1">
            Minimum Income Required (40% DTI)
          </p>
          <p className="text-lg font-semibold text-primary-700 dark:text-primary-400">
            {formatCurrency(requiredIncome)}/month
          </p>
        </div>
      </div>

      <Button className="w-full mt-6">Get Pre-Qualified</Button>

      <p className="text-xs text-stone-500 dark:text-stone-400 text-center mt-3">
        This is an estimate. Actual rates and payments may vary.
      </p>
    </div>
  );
}
