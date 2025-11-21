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
  const [interestRate, setInterestRate] = useState(15);
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

  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 p-6",
        className
      )}
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Mortgage Calculator
      </h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interest Rate (%)
          </label>
          <Input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Term (years)
          </label>
          <Input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Results */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Monthly Payment</p>
          <p className="text-3xl font-bold text-gray-900">
            {formatCurrency(monthlyPayment)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-100">
          <div>
            <p className="text-xs text-gray-600">Total Payment</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(totalPayment)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Total Interest</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(totalInterest)}
            </p>
          </div>
        </div>
      </div>

      <Button className="w-full mt-6">Get Pre-Qualified</Button>
    </div>
  );
}
