"use client";

import Link from "next/link";
import { useState } from "react";

export default function AboutPage() {
  const [activeDiff, setActiveDiff] = useState<number | null>(null);

  const differentiators = [
    {
      number: 1,
      icon: "🛡️",
      title: "Trust Problem Solved",
      subtitle: "Verified Real Estate Layer",
      description:
        "We solve the trust problem at the core of Zambia's real estate by authenticating agents, documents, and listings—eliminating scams and fraud.",
      features: [
        "Government ID verification",
        "Document authentication",
        "AI fraud detection",
        "Background checks",
      ],
      color: "from-blue-400 to-blue-600",
    },
    {
      number: 2,
      icon: "🔄",
      title: "End-to-End Platform",
      subtitle: "Not Just Listings",
      description:
        "Nyumba manages the full journey: search → evaluate → verify → finance → inspect → insure → close.",
      features: [
        "Property search & discovery",
        "AI valuation & pricing",
        "Financing & mortgages",
        "Inspection & closing",
      ],
      color: "from-green-400 to-green-600",
    },
    {
      number: 3,
      icon: "🤖",
      title: "AI-Powered Pricing",
      subtitle: "First in Zambia",
      description:
        "Fair market pricing using AI valuation, comparable analysis, and neighborhood insights—bringing transparency to Zambian real estate.",
      features: [
        "Comparable properties analysis",
        "Demand heatmaps",
        "Condition scoring",
        "Price anomaly detection",
      ],
      color: "from-purple-400 to-purple-600",
    },
    {
      number: 4,
      icon: "🏦",
      title: "Built-in Financing",
      subtitle: "Multi-Bank Gateway",
      description:
        "One form → all banks → matched offers → digital submission. Nyumba is the first multi-bank mortgage gateway in Zambia.",
      features: [
        "One-form pre-qualification",
        "Compare all lenders",
        "Digital application",
        "Real-time approval tracking",
      ],
      color: "from-yellow-400 to-yellow-600",
    },
    {
      number: 5,
      icon: "🌍",
      title: "Built for Africa",
      subtitle: "Not Copied from Abroad",
      description:
        "Designed for informal markets, fragmented records, scam-heavy channels, and mobile-first behavior—Africa's actual reality.",
      features: [
        "Hybrid formal/informal data",
        "Mobile-optimized experience",
        "Local payment integration",
        "Zambian market expertise",
      ],
      color: "from-orange-400 to-orange-600",
    },
    {
      number: 6,
      icon: "🤝",
      title: "Unified Ecosystem",
      subtitle: "B2C + B2B Combined",
      description:
        "Buyers, sellers, agents, banks, inspectors, insurers, and contractors all operate in one connected system.",
      features: [
        "Multi-sided marketplace",
        "Seamless collaboration",
        "Unified communication",
        "Integrated workflows",
      ],
      color: "from-red-400 to-red-600",
    },
    {
      number: 7,
      icon: "⚡",
      title: "Friction Eliminated",
      subtitle: "Fully Digital Process",
      description:
        "From viewing to documentation to payments, Nyumba replaces WhatsApp chaos and offline clutter with a complete digital experience.",
      features: [
        "Digital documentation",
        "Online payments",
        "Virtual tours",
        "E-signatures",
      ],
      color: "from-pink-400 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Nyumba
            </h1>
            <p className="text-xl text-primary-100">
              We&apos;re revolutionizing real estate in Zambia by making
              property transactions transparent, secure, and accessible to
              everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Who We Are */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nyumba is Zambia&apos;s leading property marketplace platform,
                built by a team passionate about transforming the real estate
                industry. We understand the challenges that buyers, sellers, and
                renters face in the Zambian market, and we&apos;re here to
                change that.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Founded with a vision to simplify property transactions, Nyumba
                combines cutting-edge technology with local expertise to create
                a platform that serves the unique needs of the Zambian real
                estate market.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our team brings together expertise in technology, real estate,
                finance, and customer service to deliver a comprehensive
                solution that makes property transactions seamless and
                trustworthy.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border border-primary-200">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    1000+
                  </div>
                  <div className="text-sm text-gray-700">Properties Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    500+
                  </div>
                  <div className="text-sm text-gray-700">Verified Users</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    50+
                  </div>
                  <div className="text-sm text-gray-700">Partner Lenders</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    95%
                  </div>
                  <div className="text-sm text-gray-700">
                    Customer Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Nyumba Different */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Makes Nyumba Different?
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              We&apos;re not just another property listing site. Nyumba is
              Zambia&apos;s first end-to-end digital real estate infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {differentiators.map((diff, idx) => (
              <div
                key={idx}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 ${
                  activeDiff === idx
                    ? "border-white shadow-2xl"
                    : "border-white/20"
                } hover:border-white hover:bg-white/20 transition-all duration-300 cursor-pointer`}
                onClick={() => setActiveDiff(activeDiff === idx ? null : idx)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`text-5xl bg-gradient-to-br ${diff.color} rounded-xl p-3 flex-shrink-0`}
                  >
                    {diff.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                        {diff.number}
                      </div>
                      <h3 className="text-2xl font-bold">{diff.title}</h3>
                    </div>
                    <p className="text-primary-100 text-sm font-medium mb-3">
                      {diff.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-white/90 mb-4 leading-relaxed">
                  {diff.description}
                </p>

                {activeDiff === idx && (
                  <div className="mt-6 pt-6 border-t border-white/20 animate-fadeIn">
                    <h4 className="text-sm font-semibold mb-3 text-primary-100">
                      KEY FEATURES:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {diff.features.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <svg
                            className="w-4 h-4 text-success-400 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 text-xs text-primary-200 flex items-center gap-1">
                  {activeDiff === idx ? (
                    <>
                      <span>Click to collapse</span>
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Click to learn more</span>
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 border-2 border-white/30">
              <p className="text-2xl font-bold mb-2">
                Nyumba = NoBroker + AI + Multi-Bank Financing
              </p>
              <p className="text-primary-100">
                Built specifically for African markets where trust and
                transparency matter most
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Do
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We provide a comprehensive suite of services designed to make
              every step of your property journey easier and more secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Property Marketplace
              </h3>
              <p className="text-gray-600">
                Browse thousands of verified properties for sale and rent across
                Zambia with advanced search filters and detailed listings.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Verification & KYC
              </h3>
              <p className="text-gray-600">
                Trust and transparency through our comprehensive verification
                system for property owners, agents, and listings.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
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
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                AI Property Valuation
              </h3>
              <p className="text-gray-600">
                Get instant, data-driven property valuations powered by AI that
                analyzes market trends and comparable properties.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Financing Solutions
              </h3>
              <p className="text-gray-600">
                Compare loan offers from multiple lenders, calculate mortgage
                payments, and get pre-approved all in one place.
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Neighborhood Insights
              </h3>
              <p className="text-gray-600">
                Make informed decisions with detailed neighborhood data
                including schools, amenities, safety, and community ratings.
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Our dedicated support team is always ready to help you with any
                questions or issues throughout your property journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Nyumba
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We&apos;re not just another property listing site. Here&apos;s
              what makes us different.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Reason 1 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Verified Listings Only
                </h3>
                <p className="text-gray-600">
                  Every property and user goes through our rigorous verification
                  process, eliminating fraud and ensuring authenticity.
                </p>
              </div>
            </div>

            {/* Reason 2 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Lightning Fast Search
                </h3>
                <p className="text-gray-600">
                  Our advanced search technology helps you find your perfect
                  property in seconds, not hours.
                </p>
              </div>
            </div>

            {/* Reason 3 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Bank-Level Security
                </h3>
                <p className="text-gray-600">
                  Your personal and financial data is protected with
                  industry-leading encryption and security measures.
                </p>
              </div>
            </div>

            {/* Reason 4 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Local Expertise
                </h3>
                <p className="text-gray-600">
                  Built by Zambians for Zambians. We understand the local market
                  and its unique characteristics.
                </p>
              </div>
            </div>

            {/* Reason 5 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Data-Driven Insights
                </h3>
                <p className="text-gray-600">
                  Make informed decisions with comprehensive market data, price
                  trends, and neighborhood analytics.
                </p>
              </div>
            </div>

            {/* Reason 6 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Transparent Pricing
                </h3>
                <p className="text-gray-600">
                  No hidden fees or surprises. What you see is what you get,
                  with clear pricing on all our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border border-primary-200">
              <div className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To democratize real estate in Zambia by providing a transparent,
                secure, and user-friendly platform that empowers everyone to
                make confident property decisions. We believe that finding your
                dream home or selling your property should be simple,
                trustworthy, and stress-free.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-8 border border-secondary-200">
              <div className="w-14 h-14 bg-secondary-600 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To become the most trusted and comprehensive real estate
                platform in Zambia and across Africa, setting new standards for
                transparency, technology, and customer service in the property
                industry. We envision a future where every property transaction
                is seamless and secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Property Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of satisfied users who have found their dream
            properties with Nyumba.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Browse Properties
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-400 transition-colors border-2 border-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
