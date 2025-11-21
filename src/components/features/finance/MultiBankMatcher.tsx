"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatCurrency } from "@/lib/utils/format";

interface BankMatch {
  name: string;
  logo: string;
  interestRate: number;
  approved: boolean;
  processingTime: number;
  maxLoan: number;
}

export function MultiBankMatcher() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    income: "",
    loanAmount: "",
    employment: "",
  });
  const [isMatching, setIsMatching] = useState(false);
  const [matches, setMatches] = useState<BankMatch[]>([]);
  const [currentBank, setCurrentBank] = useState(0);

  const banks = useMemo<BankMatch[]>(
    () => [
      {
        name: "Zanaco Bank",
        logo: "🏦",
        interestRate: 14.5,
        approved: true,
        processingTime: 7,
        maxLoan: 2000000,
      },
      {
        name: "FNB Zambia",
        logo: "🏦",
        interestRate: 15.2,
        approved: true,
        processingTime: 5,
        maxLoan: 1800000,
      },
      {
        name: "Standard Chartered",
        logo: "🏦",
        interestRate: 13.8,
        approved: true,
        processingTime: 10,
        maxLoan: 2500000,
      },
      {
        name: "Indo Zambia Bank",
        logo: "🏦",
        interestRate: 16.0,
        approved: false,
        processingTime: 14,
        maxLoan: 1500000,
      },
      {
        name: "Atlas Mara Bank",
        logo: "🏦",
        interestRate: 15.5,
        approved: true,
        processingTime: 8,
        maxLoan: 1900000,
      },
    ],
    []
  );

  useEffect(() => {
    if (isMatching && currentBank < banks.length) {
      const timer = setTimeout(() => {
        setMatches((prev) => [...prev, banks[currentBank]]);
        setCurrentBank((prev) => prev + 1);
        
        // Stop matching when all banks are processed
        if (currentBank + 1 >= banks.length) {
          setIsMatching(false);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isMatching, currentBank, banks]);

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
    setFormData({ income: "", loanAmount: "", employment: "" });
  };

  const approvedMatches = matches.filter((m) => m.approved);
  const bestMatch =
    approvedMatches.length > 0
      ? approvedMatches.reduce((prev, current) =>
          current.interestRate < prev.interestRate ? current : prev
        )
      : null;

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-8 shadow-lg">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-3">
          Multi-Bank Mortgage Matcher
        </h3>
        <p className="text-gray-600">
          One application. All banks. Best rates. Instant pre-qualification.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div
          className={`flex items-center gap-2 ${
            step >= 0 ? "text-primary-600" : "text-gray-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step >= 0
                ? "bg-primary-600 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            1
          </div>
          <span className="text-sm font-medium">Your Details</span>
        </div>
        <div className="w-12 h-1 bg-gray-200">
          <div
            className="h-full bg-primary-600 transition-all duration-500"
            style={{ width: step >= 1 ? "100%" : "0%" }}
          />
        </div>
        <div
          className={`flex items-center gap-2 ${
            step >= 1 ? "text-primary-600" : "text-gray-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step >= 1
                ? "bg-primary-600 text-white"
                : "bg-gray-200 text-gray-400"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Income (ZMW)
            </label>
            <Input
              type="number"
              placeholder="15,000"
              value={formData.income}
              onChange={(e) =>
                setFormData({ ...formData, income: e.target.value })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Desired Loan Amount (ZMW)
            </label>
            <Input
              type="number"
              placeholder="500,000"
              value={formData.loanAmount}
              onChange={(e) =>
                setFormData({ ...formData, loanAmount: e.target.value })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employment Status
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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

          <p className="text-xs text-gray-500 text-center">
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
              <div className="inline-flex items-center gap-3 bg-primary-50 px-6 py-3 rounded-full border-2 border-primary-300">
                <div className="animate-spin w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full" />
                <span className="font-semibold text-primary-700">
                  Matching with banks... ({currentBank}/{banks.length})
                </span>
              </div>
            </div>
          )}

          {/* Bank Matches */}
          <div className="space-y-4 mb-8">
            {matches.map((bank, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-xl border-2 transition-all duration-500 animate-slideIn ${
                  bank.approved
                    ? "bg-green-50 border-green-300"
                    : "bg-red-50 border-red-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{bank.logo}</div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        {bank.name}
                      </h4>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-gray-600">
                          Rate: <strong>{bank.interestRate}%</strong>
                        </span>
                        <span className="text-gray-600">
                          Processing:{" "}
                          <strong>{bank.processingTime} days</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {bank.approved ? (
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
                {bank.approved && (
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Max Loan Amount</p>
                        <p className="text-lg font-bold text-gray-900">
                          {formatCurrency(bank.maxLoan)}
                        </p>
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
                    <div className="text-6xl">{bestMatch.logo}</div>
                    <div>
                      <div className="text-3xl font-bold">{bestMatch.name}</div>
                      <div className="text-primary-100 text-lg">
                        {bestMatch.interestRate}% interest rate
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-primary-100 text-sm">
                        Monthly Payment
                      </div>
                      <div className="text-2xl font-bold">
                        {formatCurrency(
                          parseInt(formData.loanAmount) * 0.015 || 0
                        )}
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
                <p>
                  Unfortunately, none of the banks approved your application at
                  this time.
                </p>
              )}
            </div>
          )}

          {!isMatching && (
            <div className="flex gap-4">
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1"
              >
                Start Over
              </Button>
              {bestMatch && (
                <Button className="flex-1">Apply to {bestMatch.name}</Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
