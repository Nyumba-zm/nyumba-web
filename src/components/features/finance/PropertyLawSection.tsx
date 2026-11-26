"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import {
  propertyLaws,
  propertyTransferSteps,
  stampDutyRates,
} from "@/lib/data/zambianPropertyLaw";

type TabType = "laws" | "transfer" | "fees";

export function PropertyLawSection() {
  const [activeTab, setActiveTab] = useState<TabType>("laws");
  const [selectedLaw, setSelectedLaw] = useState(propertyLaws[0].id);

  const tabs: { id: TabType; label: string }[] = [
    { id: "laws", label: "Property Laws" },
    { id: "transfer", label: "Transfer Process" },
    { id: "fees", label: "Stamp Duty & Fees" },
  ];

  const currentLaw = propertyLaws.find((l) => l.id === selectedLaw);

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-5 py-2.5 rounded-lg font-medium text-sm transition-all",
              activeTab === tab.id
                ? "bg-primary-600 text-white shadow-md"
                : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Laws Tab */}
      {activeTab === "laws" && (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Law Selection */}
          <div className="space-y-2">
            {propertyLaws.map((law) => (
              <button
                key={law.id}
                onClick={() => setSelectedLaw(law.id)}
                className={cn(
                  "w-full text-left p-4 rounded-lg transition-all",
                  selectedLaw === law.id
                    ? "bg-primary-600 text-white"
                    : "bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700"
                )}
              >
                <div className="font-semibold text-sm">{law.title}</div>
                <div
                  className={cn(
                    "text-xs mt-1",
                    selectedLaw === law.id
                      ? "text-primary-100"
                      : "text-stone-500 dark:text-stone-400"
                  )}
                >
                  {law.chapter}
                </div>
              </button>
            ))}
          </div>

          {/* Law Details */}
          {currentLaw && (
            <div className="md:col-span-2 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 p-6">
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-2">
                {currentLaw.title}
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
                {currentLaw.chapter}
              </p>

              <p className="text-stone-600 dark:text-stone-400 mb-6">
                {currentLaw.description}
              </p>

              <div className="mb-6">
                <h4 className="font-semibold text-stone-900 dark:text-stone-50 mb-3">
                  Key Provisions
                </h4>
                <ul className="space-y-2">
                  {currentLaw.keyProvisions.map((provision, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400"
                    >
                      <svg
                        className="w-4 h-4 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{provision}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-stone-900 dark:text-stone-50 mb-2">
                  Relevance to Mortgages
                </h4>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  {currentLaw.relevanceToMortgages}
                </p>
              </div>

              <p className="text-xs text-stone-500 dark:text-stone-400 mt-4">
                Source: {currentLaw.source}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Transfer Process Tab */}
      {activeTab === "transfer" && (
        <div className="space-y-4">
          {propertyTransferSteps.map((step, idx) => (
            <div
              key={step.step}
              className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50">
                      {step.title}
                    </h3>
                    <span className="text-sm bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 px-3 py-1 rounded-full">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 mb-4">
                    {step.description}
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                        Required Documents
                      </div>
                      <ul className="space-y-1">
                        {step.documents.map((doc, i) => (
                          <li
                            key={i}
                            className="text-sm text-stone-600 dark:text-stone-400 flex items-start gap-1"
                          >
                            <span className="text-primary-600 dark:text-primary-400">
                              •
                            </span>
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                        Estimated Cost
                      </div>
                      <p className="text-sm text-stone-600 dark:text-stone-400">
                        {step.estimatedCost}
                      </p>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                        Responsible Party
                      </div>
                      <p className="text-sm text-stone-600 dark:text-stone-400">
                        {step.responsible}
                      </p>
                    </div>
                  </div>

                  {step.tips.length > 0 && (
                    <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
                      <div className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">
                        Tips
                      </div>
                      <ul className="space-y-1">
                        {step.tips.map((tip, i) => (
                          <li
                            key={i}
                            className="text-sm text-amber-700 dark:text-amber-400"
                          >
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {idx < propertyTransferSteps.length - 1 && (
                <div className="ml-5 mt-4 h-8 border-l-2 border-dashed border-stone-300 dark:border-stone-600" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Fees Tab */}
      {activeTab === "fees" && (
        <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 dark:bg-stone-900">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-stone-900 dark:text-stone-50">
                    Document
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-stone-900 dark:text-stone-50">
                    Rate
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-stone-900 dark:text-stone-50">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-700">
                {stampDutyRates.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 text-sm font-medium text-stone-900 dark:text-stone-100">
                      {item.document}
                    </td>
                    <td className="px-6 py-4 text-sm text-primary-600 dark:text-primary-400 font-semibold">
                      {item.rate}
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600 dark:text-stone-400">
                      {item.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900">
            <h4 className="font-semibold text-stone-900 dark:text-stone-50 mb-2">
              Exemptions
            </h4>
            <ul className="grid md:grid-cols-2 gap-2">
              <li className="text-sm text-stone-600 dark:text-stone-400">
                • Government and quasi-government transactions
              </li>
              <li className="text-sm text-stone-600 dark:text-stone-400">
                • Charitable organizations (with approval)
              </li>
              <li className="text-sm text-stone-600 dark:text-stone-400">
                • Certain agricultural land transfers
              </li>
              <li className="text-sm text-stone-600 dark:text-stone-400">
                • Inheritance transfers (conditions apply)
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
