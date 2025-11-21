"use client";

import { useState, useEffect } from "react";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: "pending" | "active" | "completed";
  duration: string;
  tasks: string[];
}

export function TransactionPipeline() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps: Step[] = [
    {
      id: 1,
      title: "Offer Submitted",
      description: "Buyer submits purchase offer with initial deposit",
      icon: "📝",
      status: "pending",
      duration: "1-2 days",
      tasks: [
        "Offer price agreed",
        "Initial deposit (10%) paid",
        "Terms & conditions accepted",
        "Seller review pending",
      ],
    },
    {
      id: 2,
      title: "Property Inspection",
      description: "Professional inspection and valuation conducted",
      icon: "🔍",
      status: "pending",
      duration: "3-5 days",
      tasks: [
        "Schedule inspection appointment",
        "Structural assessment completed",
        "Valuation report generated",
        "Defects documented",
      ],
    },
    {
      id: 3,
      title: "Document Verification",
      description: "Legal documents and title deeds verified",
      icon: "📋",
      status: "pending",
      duration: "5-7 days",
      tasks: [
        "Title deed verification",
        "Land registry check",
        "Seller ownership confirmed",
        "Legal clearance obtained",
      ],
    },
    {
      id: 4,
      title: "Mortgage Approval",
      description: "Bank finalizes loan approval and disbursement",
      icon: "🏦",
      status: "pending",
      duration: "7-14 days",
      tasks: [
        "Bank appraisal completed",
        "Loan documents signed",
        "Insurance arranged",
        "Funds released to escrow",
      ],
    },
    {
      id: 5,
      title: "Final Payment",
      description: "Complete payment transfer and fund release",
      icon: "💰",
      status: "pending",
      duration: "1-2 days",
      tasks: [
        "Remaining balance paid",
        "Escrow funds verified",
        "Tax payments processed",
        "Transfer fees paid",
      ],
    },
    {
      id: 6,
      title: "Property Transfer",
      description: "Ownership transfer and key handover",
      icon: "🔑",
      status: "pending",
      duration: "1 day",
      tasks: [
        "Title deed transferred",
        "Keys handed over",
        "Utilities transferred",
        "Move-in ready!",
      ],
    },
  ];

  const [pipelineSteps, setPipelineSteps] = useState(steps);

  const startSimulation = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setPipelineSteps(steps.map((s) => ({ ...s, status: "pending" })));

    // Animate through steps
    let stepIndex = 0;
    const interval = setInterval(() => {
      setPipelineSteps((prev) =>
        prev.map((step, idx) => {
          if (idx < stepIndex) return { ...step, status: "completed" };
          if (idx === stepIndex) return { ...step, status: "active" };
          return { ...step, status: "pending" };
        })
      );

      setCurrentStep(stepIndex);
      stepIndex++;

      if (stepIndex > steps.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 2000);
  };

  const getStepColor = (status: string) => {
    if (status === "completed") return "bg-green-500 border-green-500";
    if (status === "active")
      return "bg-primary-500 border-primary-500 animate-pulse";
    return "bg-gray-300 border-gray-300";
  };

  const getLineColor = (index: number) => {
    if (currentStep > index) return "bg-green-500";
    return "bg-gray-300";
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-8 shadow-lg">
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-3">
          Transaction Pipeline
        </h3>
        <p className="text-gray-600">
          Watch how a property transaction flows from offer to ownership
        </p>
      </div>

      {!isAnimating && currentStep === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-6">🏠</div>
          <p className="text-gray-600 mb-6 text-lg">
            See the complete journey of a property purchase
          </p>
          <button
            onClick={startSimulation}
            className="px-8 py-4 text-black rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Start Transaction Simulation
          </button>
        </div>
      )}

      {(isAnimating || currentStep > 0) && (
        <div>
          {/* Timeline */}
          <div className="relative mb-12">
            {pipelineSteps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Step */}
                <div className="flex items-start gap-6 mb-8">
                  {/* Circle & Line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-3xl transition-all duration-500 ${getStepColor(
                        step.status
                      )}`}
                    >
                      {step.status === "completed" ? "✓" : step.icon}
                    </div>
                    {index < pipelineSteps.length - 1 && (
                      <div
                        className={`w-1 h-24 mt-2 transition-all duration-1000 ${getLineColor(
                          index
                        )}`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-bold text-gray-900">
                        {step.title}
                      </h4>
                      {step.status === "active" && (
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full animate-pulse">
                          In Progress
                        </span>
                      )}
                      {step.status === "completed" && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{step.description}</p>
                    <div className="text-sm text-gray-500 mb-4">
                      ⏱️ Typical duration: {step.duration}
                    </div>

                    {/* Tasks */}
                    {(step.status === "active" ||
                      step.status === "completed") && (
                      <div className="bg-gray-50 rounded-lg p-4 animate-slideIn">
                        <div className="text-sm font-semibold text-gray-700 mb-2">
                          Tasks:
                        </div>
                        <ul className="space-y-2">
                          {step.tasks.map((task, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-600"
                              style={{
                                animationDelay: `${idx * 100}ms`,
                              }}
                            >
                              <span
                                className={`text-lg ${
                                  step.status === "completed"
                                    ? "text-green-500"
                                    : "text-primary-500"
                                }`}
                              >
                                {step.status === "completed" ? "✓" : "•"}
                              </span>
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          {currentStep >= pipelineSteps.length && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 animate-fadeIn">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
                <div className="text-4xl mb-2">✅</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  Transaction Complete!
                </div>
                <div className="text-sm text-gray-600">
                  All steps successfully completed
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
                <div className="text-4xl mb-2">⏱️</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  21-35 Days
                </div>
                <div className="text-sm text-gray-600">
                  Average transaction time
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
                <div className="text-4xl mb-2">🎉</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  New Owner
                </div>
                <div className="text-sm text-gray-600">
                  Keys handed over successfully
                </div>
              </div>
            </div>
          )}

          {currentStep >= pipelineSteps.length && (
            <div className="text-center mt-8">
              <button
                onClick={startSimulation}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Restart Simulation
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
