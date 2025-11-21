"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export default function TrustPage() {
  const [verificationStep, setVerificationStep] = useState(0);
  const [fraudScore, setFraudScore] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  const verificationSteps = [
    { label: "Document Upload", icon: "📄", status: "completed" },
    { label: "ID Verification", icon: "🆔", status: "completed" },
    { label: "Title Deed Check", icon: "📜", status: "completed" },
    { label: "Agent Background", icon: "👤", status: "completed" },
    { label: "Property Inspection", icon: "🏠", status: "completed" },
    { label: "Fraud Analysis", icon: "🔍", status: "completed" },
  ];

  const documents = [
    { name: "Title Deed", status: "verified", confidence: 98 },
    { name: "NRC", status: "verified", confidence: 100 },
    { name: "Survey Plan", status: "verified", confidence: 95 },
    { name: "Council Letter", status: "verified", confidence: 92 },
    { name: "Offer Letter", status: "pending", confidence: 0 },
  ];

  const fraudSignals = [
    { check: "Duplicate listing detection", status: "pass", color: "green" },
    { check: "Price anomaly detection", status: "pass", color: "green" },
    { check: "Document authenticity", status: "pass", color: "green" },
    { check: "Owner verification", status: "pass", color: "green" },
    { check: "Historical scam patterns", status: "pass", color: "green" },
  ];

  useEffect(() => {
    if (isVerifying && verificationStep < verificationSteps.length) {
      const timer = setTimeout(() => {
        setVerificationStep((prev) => prev + 1);
        setFraudScore((prev) => Math.min(prev + 17, 100));
      }, 800);
      return () => clearTimeout(timer);
    } else if (isVerifying && verificationStep === verificationSteps.length) {
      const timer = setTimeout(() => {
        setIsVerifying(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [verificationStep, isVerifying, verificationSteps.length]);

  const startVerification = () => {
    setVerificationStep(0);
    setFraudScore(0);
    setIsVerifying(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <svg
                className="w-5 h-5 text-success-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">
                Zambia&apos;s First Real Estate Trust Layer
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Built on Trust, Powered by Verification
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Every listing. Every agent. Every document. Verified through our
              advanced fraud-resistant system. Zero tolerance for scams.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-100"
              >
                See How It Works
              </Button>
              <Link href="/properties">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Browse Verified Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                100%
              </div>
              <div className="text-sm text-gray-600">Listings Verified</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                98.7%
              </div>
              <div className="text-sm text-gray-600">Fraud Detection Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                5,000+
              </div>
              <div className="text-sm text-gray-600">Verified Documents</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                Zero
              </div>
              <div className="text-sm text-gray-600">Successful Scams</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Verification Demo */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Watch Verification in Action
            </h2>
            <p className="text-xl text-gray-600">
              See how we authenticate every listing in real-time
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Verification Process */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Verification Process
                </h3>
                <Button
                  onClick={startVerification}
                  disabled={isVerifying}
                  size="sm"
                >
                  {isVerifying ? "Verifying..." : "Run Demo"}
                </Button>
              </div>

              <div className="space-y-4 mb-8">
                {verificationSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-500 ${
                      idx < verificationStep
                        ? "bg-success-50 border-2 border-success-300"
                        : idx === verificationStep && isVerifying
                        ? "bg-primary-50 border-2 border-primary-300 animate-pulse"
                        : "bg-gray-50 border-2 border-gray-200"
                    }`}
                  >
                    <div className="text-3xl">{step.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {step.label}
                      </div>
                    </div>
                    {idx < verificationStep && (
                      <svg
                        className="w-6 h-6 text-success-600"
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

              {/* Trust Score */}
              <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-lg p-6 border-2 border-success-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700">
                    Trust Score
                  </span>
                  <span className="text-3xl font-bold text-success-700">
                    {fraudScore}%
                  </span>
                </div>
                <div className="h-3 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-success-400 to-success-600 transition-all duration-500 ease-out"
                    style={{ width: `${fraudScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Document Status */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Document Authentication
                </h3>
                <div className="space-y-4">
                  {documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">📄</div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {doc.name}
                          </div>
                          {doc.status === "verified" && (
                            <div className="text-xs text-gray-600">
                              Confidence: {doc.confidence}%
                            </div>
                          )}
                        </div>
                      </div>
                      <Badge
                        variant={
                          doc.status === "verified" ? "success" : "default"
                        }
                      >
                        {doc.status === "verified" ? "✓ Verified" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Fraud Detection
                </h3>
                <div className="space-y-3">
                  {fraudSignals.map((signal, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-700">
                        {signal.check}
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full bg-${signal.color}-500`}
                        />
                        <span className="text-xs font-semibold text-success-600">
                          PASS
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Trust Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The 6-Layer Trust System
            </h2>
            <p className="text-xl text-gray-600">
              Every listing passes through multiple verification checkpoints
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🆔",
                title: "Identity Verification",
                description:
                  "All sellers and agents verified with government-issued IDs and biometric checks",
              },
              {
                icon: "📜",
                title: "Document Authentication",
                description:
                  "Title deeds, survey plans, and legal documents validated with authorities",
              },
              {
                icon: "🏠",
                title: "Property Inspection",
                description:
                  "Physical verification by certified inspectors ensures property exists and matches listing",
              },
              {
                icon: "🔍",
                title: "AI Fraud Detection",
                description:
                  "Machine learning algorithms identify duplicate listings and suspicious patterns",
              },
              {
                icon: "💰",
                title: "Price Validation",
                description:
                  "AI checks for price anomalies that may indicate fraud or misrepresentation",
              },
              {
                icon: "👥",
                title: "Background Checks",
                description:
                  "Agents undergo thorough background and reputation screening",
              },
            ].map((layer, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-5xl mb-4">{layer.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {layer.title}
                </h3>
                <p className="text-gray-600">{layer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Guarantee */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-12 border-2 border-primary-300">
            <div className="text-6xl mb-6">🛡️</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Nyumba Trust Guarantee
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              If you encounter a fraudulent listing that passed our verification
              system, we&apos;ll refund 100% of any fees paid and compensate you
              for your losses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties">
                <Button size="lg">Browse Verified Properties</Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
