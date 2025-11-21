import { NeighborhoodInsightsDemo } from "@/components/features/neighborhood";
import Link from "next/link";

export default function NeighborhoodPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-2xl">📍</span>
              <span className="text-sm font-medium">
                AI-Powered Location Intelligence
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Know Your Neighborhood
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Make informed decisions with comprehensive insights about safety,
              amenities, schools, and community features in every area.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/properties">
                <button className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Browse Properties
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                50+
              </div>
              <div className="text-sm text-gray-600">
                Neighborhoods Analyzed
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                200+
              </div>
              <div className="text-sm text-gray-600">Schools & Facilities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                15+
              </div>
              <div className="text-sm text-gray-600">Data Points Per Area</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                Real-time
              </div>
              <div className="text-sm text-gray-600">Updates & Insights</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Demo */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <NeighborhoodInsightsDemo />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We Track in Every Neighborhood
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive data to help you make the best decision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🛡️",
                title: "Safety Ratings",
                description:
                  "Crime statistics, police presence, and community safety scores from verified sources",
                color: "from-green-400 to-green-600",
              },
              {
                icon: "🏫",
                title: "Education Access",
                description:
                  "Distance to top schools, ratings, curriculum types, and enrollment information",
                color: "from-blue-400 to-blue-600",
              },
              {
                icon: "🏥",
                title: "Healthcare Facilities",
                description:
                  "Proximity to hospitals, clinics, pharmacies, and emergency services",
                color: "from-red-400 to-red-600",
              },
              {
                icon: "🚌",
                title: "Transportation",
                description:
                  "Public transit access, walkability scores, and major road connections",
                color: "from-purple-400 to-purple-600",
              },
              {
                icon: "🛒",
                title: "Shopping & Dining",
                description:
                  "Supermarkets, restaurants, malls, and local businesses within reach",
                color: "from-yellow-400 to-yellow-600",
              },
              {
                icon: "🌳",
                title: "Parks & Recreation",
                description:
                  "Green spaces, sports facilities, playgrounds, and outdoor activities",
                color: "from-teal-400 to-teal-600",
              },
              {
                icon: "📈",
                title: "Market Trends",
                description:
                  "Historical price data, appreciation rates, and future development plans",
                color: "from-indigo-400 to-indigo-600",
              },
              {
                icon: "👥",
                title: "Demographics",
                description:
                  "Population density, age distribution, and community composition",
                color: "from-pink-400 to-pink-600",
              },
              {
                icon: "💡",
                title: "Utilities & Services",
                description:
                  "Electricity, water, internet connectivity, and waste management",
                color: "from-orange-400 to-orange-600",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`text-5xl mb-4 bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Our AI Analyzes Neighborhoods
            </h2>
            <p className="text-xl text-gray-600">
              Advanced algorithms process multiple data sources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                🔍
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Data Collection
              </h3>
              <p className="text-gray-600">
                We aggregate information from government databases, satellite
                imagery, and community feedback
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                🤖
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                AI Processing
              </h3>
              <p className="text-gray-600">
                Machine learning models analyze patterns, calculate scores, and
                identify trends
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                📊
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Insights Generation
              </h3>
              <p className="text-gray-600">
                Results are presented in an easy-to-understand format with
                actionable recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Find Your Perfect Neighborhood?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Browse properties with full neighborhood insights included
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <button className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition">
                Browse All Properties
              </button>
            </Link>
            <Link href="/about">
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition">
                Learn More About Nyumba
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
