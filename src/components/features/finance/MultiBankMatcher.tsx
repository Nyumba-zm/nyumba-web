"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatCurrency } from "@/lib/utils/format";
import { zambianBanks, type ZambianBank } from "@/lib/data/zambianBanks";

interface BankMatch {
  bank: ZambianBank;
  approved: boolean;
  interestRate: number;
  maxLoan: number;
  processingTime: number;
  monthlyPayment: number;
}

export function MultiBankMatcher() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    income: "",
    loanAmount: "",
    employment: "",
    deposit: "",
  });
  const [isMatching, setIsMatching] = useState(false);
  const [matches, setMatches] = useState<BankMatch[]>([]);
  const [currentBank, setCurrentBank] = useState(0);

  useEffect(() => {
    if (isMatching && currentBank < zambianBanks.length) {
      const timer = setTimeout(() => {
        const bank = zambianBanks[currentBank];
        const income = parseInt(formData.income) || 0;
        const loanAmount = parseInt(formData.loanAmount) || 0;
        const product = bank.mortgageProducts[0];

        // Calculate if approved based on income and loan amount
        const maxAffordable = income * 12 * 5; // Rough 5x annual income
        const meetsIncomeReq = income >= product.minIncome;
        const meetsLoanReq = loanAmount <= product.maxLoanAmount;
        const approved = meetsIncomeReq && meetsLoanReq && loanAmount <= maxAffordable;

        // Calculate monthly payment
        const rate = product.interestRate.min / 100 / 12;
        const months = 20 * 12;
        const monthlyPayment = approved
          ? (loanAmount * rate * Math.pow(1 + rate, months)) /
            (Math.pow(1 + rate, months) - 1)
          : 0;

        const match: BankMatch = {
          bank,
          approved,
          interestRate: product.interestRate.min,
          maxLoan: product.maxLoanAmount,
          processingTime: Math.floor(Math.random() * 10) + 7, // 7-14 days
          monthlyPayment,
        };

        setMatches((prev) => [...prev, match]);
        setCurrentBank((prev) => prev + 1);

        if (currentBank + 1 >= zambianBanks.length) {
          setIsMatching(false);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isMatching, currentBank, formData]);

  const handleStartMatching = () => {
    if (
      formData.income &&
      formData.loanAmount &&
      parseInt(formData.loanAmount) > 0
    ) {
      setIsMatching(true);
      setMatches([]);
      setCurrentBank(0);
      setStep(1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setIsMatching(false);
    setMatches([]);
    setCurrentBank(0);
    setFormData({ income: "", loanAmount: "", employment: "", deposit: "" });
  };

  const approvedMatches = matches.filter((m) => m.approved);
  const bestMatch =
    approvedMatches.length > 0
      ? approvedMatches.reduce((prev, current) =>
          current.interestRate < prev.interestRate ? current : prev
        )
      : null;

  return (
    <div className="bg-white dark:bg-stone-800 rounded-xl border-2 border-stone-200 dark:border-stone-700 p-8 shadow-lg">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-stone-900 dark:text-stone-50 mb-3">
          Multi-Bank Mortgage Matcher
        </h3>
        <p className="text-stone-600 dark:text-stone-400">
          One application. All banks. Best rates. Instant pre-qualification.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div
          className={`flex items-center gap-2 ${
            step >= 0 ? "text-primary-600 dark:text-primary-400" : "text-stone-400 dark:text-stone-500"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step >= 0
                ? "bg-primary-600 text-white"
                : "bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500"
            }`}
          >
            1
          </div>
          <span className="text-sm font-medium">Your Details</span>
        </div>
        <div className="w-12 h-1 bg-stone-200 dark:bg-stone-700">
          <div
            className="h-full bg-primary-600 transition-all duration-500"
            style={{ width: step >= 1 ? "100%" : "0%" }}
          />
        </div>
        <div
          className={`flex items-center gap-2 ${
            step >= 1 ? "text-primary-600 dark:text-primary-400" : "text-stone-400 dark:text-stone-500"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step >= 1
                ? "bg-primary-600 text-white"
                : "bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500"
            }`}
          >
            2
          </div>
          <span className="text-sm font-medium">Bank Matching</span>
        </div>
      </div>

      {step === 0 && (
        <div className="max-w-md mx-auto space-y-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
              Monthly Income (ZMW)
            </label>
            <Input
              type="number"
              placeholder="e.g. 15,000"
              value={formData.income}
              onChange={(e) =>
                setFormData({ ...formData, income: e.target.value })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
              Desired Loan Amount (ZMW)
            </label>
            <Input
              type="number"
              placeholder="e.g. 500,000"
              value={formData.loanAmount}
              onChange={(e) =>
                setFormData({ ...formData, loanAmount: e.target.value })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
              Available Deposit (ZMW)
            </label>
            <Input
              type="number"
              placeholder="e.g. 100,000"
              value={formData.deposit}
              onChange={(e) =>
                setFormData({ ...formData, deposit: e.target.value })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
              Employment Status
            </label>
            <select
              className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg
                         bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100
                         focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.employment}
              onChange={(e) =>
                setFormData({ ...formData, employment: e.target.value })
              }
            >
              <option value="">Select...</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self-Employed</option>
              <option value="business">Business Owner</option>
            </select>
          </div>

          <Button
            onClick={handleStartMatching}
            disabled={
              !formData.income || !formData.loanAmount || !formData.employment
            }
            className="w-full"
            size="lg"
          >
            Find My Best Rates
          </Button>

          <p className="text-xs text-stone-500 dark:text-stone-400 text-center">
            Your information is secure and will only be shared with banks you
            choose to apply to.
          </p>
        </div>
      )}

      {step === 1 && (
        <div>
          {/* Matching in progress */}
          {isMatching && (
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-3 bg-primary-50 dark:bg-primary-900/30 px-6 py-3 rounded-full border-2 border-primary-300 dark:border-primary-700">
                <div className="animate-spin w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full" />
                <span className="font-semibold text-primary-700 dark:text-primary-300">
                  Matching with banks... ({currentBank}/{zambianBanks.length})
                </span>
              </div>
            </div>
          )}

          {/* Bank Matches */}
          <div className="space-y-4 mb-8">
            {matches.map((match, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-xl border-2 transition-all duration-500 animate-fadeIn ${
                  match.approved
                    ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"
                    : "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-stone-100 dark:bg-stone-700 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {match.bank.shortName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-stone-900 dark:text-stone-50">
                        {match.bank.shortName}
                      </h4>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                        <span className="text-stone-600 dark:text-stone-400">
                          Rate: <strong className="text-stone-900 dark:text-stone-100">{match.interestRate}%</strong>
                        </span>
                        <span className="text-stone-600 dark:text-stone-400">
                          Processing:{" "}
                          <strong className="text-stone-900 dark:text-stone-100">{match.processingTime} days</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {match.approved ? (
                      <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Pre-Approved
                      </div>
                    ) : (
                      <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                        Not Qualified
                      </div>
                    )}
                  </div>
                </div>
                {match.approved && (
                  <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-700">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-stone-600 dark:text-stone-400">
                            Monthly Payment
                          </p>
                          <p className="text-lg font-bold text-stone-900 dark:text-stone-50">
                            {formatCurrency(match.monthlyPayment)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-stone-600 dark:text-stone-400">
                            Max Loan
                          </p>
                          <p className="text-lg font-bold text-stone-900 dark:text-stone-50">
                            {formatCurrency(match.maxLoan)}
                          </p>
                        </div>
                      </div>
                      <Button size="sm">Apply Now</Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Results Summary */}
          {!isMatching && matches.length > 0 && (
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-xl p-8 mb-6">
              <h4 className="text-2xl font-bold mb-4">Your Best Match</h4>
              {bestMatch ? (
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                      <span className="text-3xl font-bold">
                        {bestMatch.bank.shortName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">{bestMatch.bank.shortName}</div>
                      <div className="text-primary-100 text-lg">
                        {bestMatch.interestRate}% interest rate
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-primary-100 text-sm">
                        Monthly Payment
                      </div>
                      <div className="text-2xl font-bold">
                        {formatCurrency(bestMatch.monthlyPayment)}
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-primary-100 text-sm">Processing</div>
                      <div className="text-2xl font-bold">
                        {bestMatch.processingTime} days
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-primary-100 text-sm">Approved</div>
                      <div className="text-2xl font-bold">
                        {approvedMatches.length}/{matches.length}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-primary-100">
                  Unfortunately, none of the banks approved your application at
                  this time. Consider adjusting your loan amount or increasing your deposit.
                </p>
              )}
            </div>
          )}

          {!isMatching && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1"
              >
                Start Over
              </Button>
              {bestMatch && (
                <Button className="flex-1">
                  Apply to {bestMatch.bank.shortName}
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
