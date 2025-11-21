import Link from "next/link";
import { TransactionPipeline } from "@/components/shared/TransactionPipeline";
import { DocumentVerification } from "@/components/shared/DocumentVerification";
import { MarketTrends } from "@/components/shared/MarketTrends";
import { AnimatedStats } from "@/components/shared/AnimatedStats";
import { EcosystemNetwork } from "@/components/shared/EcosystemNetwork";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-2xl">🎯</span>
              <span className="text-sm font-medium">
                Interactive Platform Demos
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              See Nyumba in Action
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Explore our innovative features through interactive simulations.
              Watch how we&apos;re transforming real estate in Zambia with AI,
              blockchain, and smart automation.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-white -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <AnimatedStats
              stats={[
                { label: "Simulations Available", value: 6, suffix: "" },
                {
                  label: "Interactive Demos",
                  value: 100,
                  suffix: "% Working",
                },
                { label: "Features Showcased", value: 15, suffix: "+" },
                { label: "User Engagement", value: 95, suffix: "%" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Transaction Pipeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Transaction Journey
            </h2>
            <p className="text-xl text-gray-600">
              Watch a property purchase flow from offer to keys
            </p>
          </div>
          <TransactionPipeline />
        </div>
      </section>

      {/* Document Verification */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI-Powered Document Verification
            </h2>
            <p className="text-xl text-gray-600">
              See how we verify identity and property documents instantly
            </p>
          </div>
          <DocumentVerification />
        </div>
      </section>

      {/* Market Trends */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real-Time Market Analytics
            </h2>
            <p className="text-xl text-gray-600">
              Interactive price trends and sales data visualization
            </p>
          </div>
          <MarketTrends />
        </div>
      </section>

      {/* Ecosystem Network */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Platform Ecosystem
            </h2>
            <p className="text-xl text-gray-600">
              All stakeholders connected in one unified network
            </p>
          </div>
          <div className="bg-white rounded-xl border-2 border-gray-200 p-8 shadow-lg">
            <EcosystemNetwork />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              More Interactive Features
            </h2>
            <p className="text-xl text-gray-600">
              Explore additional simulations throughout the platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🤖",
                title: "AI Valuation Process",
                description:
                  "See how our AI analyzes properties and generates accurate valuations",
                link: "/properties",
                color: "from-blue-400 to-blue-600",
              },
              {
                icon: "🏦",
                title: "Multi-Bank Matcher",
                description:
                  "Submit one form to 5+ banks and compare mortgage offers instantly",
                link: "/finance",
                color: "from-green-400 to-green-600",
              },
              {
                icon: "🛡️",
                title: "Trust Layer Demo",
                description:
                  "6-step verification process with fraud detection simulation",
                link: "/trust",
                color: "from-purple-400 to-purple-600",
              },
              {
                icon: "📍",
                title: "Neighborhood Insights",
                description:
                  "Interactive area analysis with safety scores and amenities",
                link: "/neighborhood",
                color: "from-yellow-400 to-yellow-600",
              },
              {
                icon: "🔍",
                title: "Advanced Search",
                description:
                  "Filter properties with multiple criteria and saved searches",
                link: "/properties",
                color: "from-pink-400 to-pink-600",
              },
              {
                icon: "💰",
                title: "Loan Calculator",
                description:
                  "Real-time mortgage payment estimates with customization",
                link: "/finance",
                color: "from-indigo-400 to-indigo-600",
              },
            ].map((feature, idx) => (
              <a
                key={idx}
                href={feature.link}
                className="block bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div
                  className={`text-5xl mb-4 bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center gap-2 text-primary-600 font-medium text-sm">
                  Try it now
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience More?</h2>
          <p className="text-xl text-primary-100 mb-8">
            These are just simulations. Sign up to access the full platform with
            real properties and live features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/properties"
              className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Browse Real Properties
            </Link>
            <Link
              href="/signup"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
