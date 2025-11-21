"use client";

import { useState, useEffect, useMemo } from "react";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

interface PropertyValuationProps {
  estimatedValue: number;
  confidenceLevel: "high" | "medium" | "low";
  pricePerSqm?: number;
  comparableCount?: number;
  className?: string;
}

export function PropertyValuation({
  estimatedValue,
  confidenceLevel,
  pricePerSqm,
  comparableCount = 3,
  className,
}: PropertyValuationProps) {
  const [showAIProcess, setShowAIProcess] = useState(false);
  const [aiStep, setAiStep] = useState(0);
  const [animatedValue, setAnimatedValue] = useState(0);

  const confidenceColors = {
    high: "text-green-600 bg-green-50",
    medium: "text-yellow-600 bg-yellow-50",
    low: "text-orange-600 bg-orange-50",
  };

  const confidenceLabels = {
    high: "High Confidence",
    medium: "Medium Confidence",
    low: "Low Confidence",
  };

  const aiSteps = useMemo(
    () => [
      {
        label: "Analyzing location data",
        icon: "📍",
        value: estimatedValue * 0.2,
      },
      {
        label: "Comparing similar properties",
        icon: "🏘️",
        value: estimatedValue * 0.4,
      },
      {
        label: "Evaluating property features",
        icon: "🏠",
        value: estimatedValue * 0.6,
      },
      {
        label: "Calculating market trends",
        icon: "📈",
        value: estimatedValue * 0.8,
      },
      { label: "Finalizing valuation", icon: "✅", value: estimatedValue },
    ],
    [estimatedValue]
  );

  useEffect(() => {
    if (showAIProcess && aiStep < aiSteps.length) {
      const timer = setTimeout(() => {
        setAiStep((prev) => prev + 1);
        setAnimatedValue(aiSteps[aiStep].value);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [showAIProcess, aiStep, aiSteps]);

  const handleShowProcess = () => {
    setShowAIProcess(true);
    setAiStep(0);
    setAnimatedValue(0);
  };

  const handleReset = () => {
    setShowAIProcess(false);
    setAiStep(0);
    setAnimatedValue(0);
  };

  return (
    <div
      className={cn(
        "bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
            Nyumba AI Estimate
            <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
              AI
            </span>
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {showAIProcess && aiStep > 0
              ? formatCurrency(animatedValue)
              : formatCurrency(estimatedValue)}
          </p>
        </div>
        <div
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            confidenceColors[confidenceLevel]
          )}
        >
          {confidenceLabels[confidenceLevel]}
        </div>
      </div>

      {/* AI Process Visualization */}
      {showAIProcess && (
        <div className="mb-4 p-4 bg-white rounded-lg border border-blue-200">
          <div className="space-y-3">
            {aiSteps.map((step, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 p-2 rounded transition-all duration-500 ${
                  idx < aiStep
                    ? "bg-green-50 border border-green-200"
                    : idx === aiStep
                    ? "bg-blue-50 border border-blue-300 animate-pulse"
                    : "bg-gray-50 border border-gray-200 opacity-50"
                }`}
              >
                <div className="text-2xl">{step.icon}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {step.label}
                  </div>
                </div>
                {idx < aiStep && (
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {aiStep >= aiSteps.length && (
            <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-300 animate-fadeIn">
              <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
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
                Valuation Complete!
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-100">
        {pricePerSqm && (
          <div>
            <p className="text-xs text-gray-500">Price per m²</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(pricePerSqm)}
            </p>
          </div>
        )}
        <div>
          <p className="text-xs text-gray-500">Based on</p>
          <p className="text-lg font-semibold text-gray-900">
            {comparableCount} comparables
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-blue-100">
        <p className="text-xs text-gray-500 mb-3">
          AI-powered valuation based on location, size, amenities, and recent
          comparable sales.
        </p>
        {!showAIProcess ? (
          <Button size="sm" onClick={handleShowProcess} className="w-full">
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              See AI Calculation Process
            </span>
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            className="w-full"
          >
            Reset Demo
          </Button>
        )}
      </div>
    </div>
  );
}
