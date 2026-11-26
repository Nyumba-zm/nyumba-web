"use client";

import Link from "next/link";
import {
  HeroSection,
  FeaturedPropertiesSection,
  CTASection,
} from "@/components/landing";
import { AnimatedStats } from "@/components/shared/AnimatedStats";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      {/* Hero Section with Search */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedStats
            stats={[
              { label: "AI Valuations Generated", value: 15420, suffix: "+" },
              { label: "Verified Properties", value: 1847, suffix: "+" },
              { label: "Fraud Cases Prevented", value: 234, suffix: "+" },
              { label: "Trust Score", value: 98, suffix: "%" },
            ]}
          />
        </div>
      </section>

      {/* Featured Properties Section */}
      <FeaturedPropertiesSection />

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-50 mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-3xl mx-auto">
              From property search to financing, we&apos;ve built a complete
              ecosystem for your real estate journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - KYC Verification */}
            <div className="bg-stone-50 dark:bg-stone-900 p-8 rounded-xl border border-stone-200 dark:border-stone-700 hover:shadow-lg transition group">
              <div className="bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-xl p-4 inline-block mb-4 group-hover:bg-primary-600 group-hover:text-white transition">
                <svg
                  className="w-8 h-8"
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
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-3">
                KYC Verification
              </h3>
              <p className="text-stone-600 dark:text-stone-400 mb-4">
                Every property owner and agent is verified through our
                comprehensive KYC process. Say goodbye to fraudulent listings.
              </p>
              <Link
                href="/about"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center gap-1"
              >
                Learn more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Feature 2 - AI Valuation */}
            <div className="bg-stone-50 dark:bg-stone-900 p-8 rounded-xl border border-stone-200 dark:border-stone-700 hover:shadow-lg transition group">
              <div className="bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-xl p-4 inline-block mb-4 group-hover:bg-primary-600 group-hover:text-white transition">
                <svg
                  className="w-8 h-8"
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
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-3">
                AI Property Valuation
              </h3>
              <p className="text-stone-600 dark:text-stone-400 mb-4">
                Get instant, data-driven property valuations powered by AI.
                Compare prices with similar properties in the area.
              </p>
              <Link
                href="/properties"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center gap-1"
              >
                Try it now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Feature 3 - Smart Financing */}
            <div className="bg-stone-50 dark:bg-stone-900 p-8 rounded-xl border border-stone-200 dark:border-stone-700 hover:shadow-lg transition group">
              <div className="bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-xl p-4 inline-block mb-4 group-hover:bg-primary-600 group-hover:text-white transition">
                <svg
                  className="w-8 h-8"
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
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-3">
                Smart Financing
              </h3>
              <p className="text-stone-600 dark:text-stone-400 mb-4">
                Compare loan offers from 50+ partner lenders. Calculate monthly
                payments and get pre-approved instantly.
              </p>
              <Link
                href="/finance"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center gap-1"
              >
                Compare lenders
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Feature 4 - Neighborhood Insights */}
            <div className="bg-stone-50 dark:bg-stone-900 p-8 rounded-xl border border-stone-200 dark:border-stone-700 hover:shadow-lg transition group">
              <div className="bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-xl p-4 inline-block mb-4 group-hover:bg-primary-600 group-hover:text-white transition">
                <svg
                  className="w-8 h-8"
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
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-3">
                Neighborhood Insights
              </h3>
              <p className="text-stone-600 dark:text-stone-400 mb-4">
                Make informed decisions with detailed data on schools, safety,
                amenities, and community ratings.
              </p>
              <Link
                href="/neighborhood"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center gap-1"
              >
                Explore areas
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Feature 5 - Advanced Search */}
            <div className="bg-stone-50 dark:bg-stone-900 p-8 rounded-xl border border-stone-200 dark:border-stone-700 hover:shadow-lg transition group">
              <div className="bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-xl p-4 inline-block mb-4 group-hover:bg-primary-600 group-hover:text-white transition">
                <svg
                  className="w-8 h-8"
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
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-3">
                Advanced Search
              </h3>
              <p className="text-stone-600 dark:text-stone-400 mb-4">
                Filter by location, price, bedrooms, amenities, and more. Save
                your searches and get instant notifications.
              </p>
              <Link
                href="/properties"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center gap-1"
              >
                Start searching
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Feature 6 - 24/7 Support */}
            <div className="bg-stone-50 dark:bg-stone-900 p-8 rounded-xl border border-stone-200 dark:border-stone-700 hover:shadow-lg transition group">
              <div className="bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-xl p-4 inline-block mb-4 group-hover:bg-primary-600 group-hover:text-white transition">
                <svg
                  className="w-8 h-8"
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
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-3">
                24/7 Support
              </h3>
              <p className="text-stone-600 dark:text-stone-400 mb-4">
                Our dedicated support team is always ready to help. Check our
                FAQ or contact us anytime.
              </p>
              <Link
                href="/faq"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center gap-1"
              >
                Get help
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-stone-50 dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-50 mb-4">
              How Nyumba Works
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg">
              Your property journey simplified in three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-3">
                Search & Discover
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Browse verified listings with advanced filters. Get AI
                valuations and neighborhood insights for every property.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-3">
                Connect & Compare
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Contact verified sellers directly. Compare financing options
                from multiple lenders to find the best deal.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-3">
                Move In
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Complete your transaction securely on our platform. Schedule
                tours, handle paperwork, and get your keys.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-50 mb-4">
              What Our Users Say
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg">
              Join thousands of satisfied property buyers and sellers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-stone-50 dark:bg-stone-900 p-8 rounded-xl border border-stone-200 dark:border-stone-700">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-secondary-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-stone-700 dark:text-stone-300 mb-4">
                &quot;Nyumba made finding my dream home so easy! The AI
                valuation helped me make an informed decision, and the
                verification gave me peace of mind.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold">
                  JM
                </div>
                <div>
                  <div className="font-semibold text-stone-900 dark:text-stone-50">
                    Joseph Mwanza
                  </div>
                  <div className="text-sm text-stone-600 dark:text-stone-400">
                    Property Buyer, Lusaka
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 dark:bg-stone-900 p-8 rounded-xl border border-stone-200 dark:border-stone-700">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-secondary-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-stone-700 dark:text-stone-300 mb-4">
                &quot;As a real estate agent, Nyumba has transformed how I do
                business. The verified listings build trust, and I get serious
                buyers only.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold">
                  CK
                </div>
                <div>
                  <div className="font-semibold text-stone-900 dark:text-stone-50">
                    Chanda Kabwe
                  </div>
                  <div className="text-sm text-stone-600 dark:text-stone-400">
                    Real Estate Agent
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 dark:bg-stone-900 p-8 rounded-xl border border-stone-200 dark:border-stone-700">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-secondary-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-stone-700 dark:text-stone-300 mb-4">
                &quot;The financing comparison feature saved me thousands! I
                compared offers from different banks and found the best rate for
                my mortgage.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold">
                  TP
                </div>
                <div>
                  <div className="font-semibold text-stone-900 dark:text-stone-50">
                    Thandiwe Phiri
                  </div>
                  <div className="text-sm text-stone-600 dark:text-stone-400">
                    First-time Buyer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
