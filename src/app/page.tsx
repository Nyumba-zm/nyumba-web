import { Button } from "@/components/ui/Button";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { mockProperties } from "@/lib/mockData";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  // Show first 6 properties on home page
  const featuredProperties = mockProperties.slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920"
            alt="Hero"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Where Nyumbaling Happens
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Find your dream home in Zambia&apos;s premier property marketplace
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/properties">
              <Button size="lg">Browse Properties</Button>
            </Link>
            <Link href="/sell">
              <Button size="lg" variant="outline">
                List Your Property
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-500">5,000+</div>
              <div className="text-gray-600 mt-2">Active Listings</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-500">200+</div>
              <div className="text-gray-600 mt-2">Verified Agents</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-500">1,200+</div>
              <div className="text-gray-600 mt-2">Homes Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-500">98%</div>
              <div className="text-gray-600 mt-2">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties in Lusaka
            </h2>
            <p className="text-gray-600 text-lg">
              Discover your perfect home today
            </p>
          </div>

          <PropertyGrid properties={featuredProperties} />

          <div className="text-center mt-12">
            <Link href="/properties">
              <Button size="lg">View All Properties</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Nyumba Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Nyumba?
            </h2>
            <p className="text-gray-600 text-lg">
              A revolutionary platform for the Zambian property market
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition">
              <div className="bg-primary-500 text-white rounded-full p-4 inline-block mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Centralized Listings</h3>
              <p className="text-gray-600">
                Find all of Zambia&apos;s top property listings in one place. No
                more endless scrolling on social media.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition">
              <div className="bg-primary-500 text-white rounded-full p-4 inline-block mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600">
                Make informed decisions with AI-driven pricing, market trends,
                and transparent neighborhood data.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition">
              <div className="bg-primary-500 text-white rounded-full p-4 inline-block mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
              <p className="text-gray-600">
                Communicate, schedule tours, and handle financing securely
                within the platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 sm:py-20 bg-primary-500"
        style={{ backgroundColor: "#0D9488" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-6"
            style={{ color: "#ffffff" }}
          >
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-lg sm:text-xl mb-8" style={{ color: "#ffffff" }}>
            Join thousands of Zambians finding their perfect property
          </p>
          <Link href="/properties">
            <Button size="lg" variant="secondary">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
