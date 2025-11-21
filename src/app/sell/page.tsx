"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

export default function SellPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16" style={{ backgroundColor: "#0f766e" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#ffffff" }}
          >
            List Your Property
          </h1>
          <p className="text-lg md:text-xl" style={{ color: "#ffffff" }}>
            Reach thousands of potential buyers and renters
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why List with Nyumba?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-primary-100 text-primary-500 rounded-full p-4 inline-block mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Wide Reach</h3>
              <p className="text-gray-600 text-sm">
                Connect with thousands of potential buyers
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 text-primary-500 rounded-full p-4 inline-block mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Secure</h3>
              <p className="text-gray-600 text-sm">
                Safe and verified transactions
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 text-primary-500 rounded-full p-4 inline-block mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Easy Process</h3>
              <p className="text-gray-600 text-sm">
                Simple listing in just a few steps
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Get Started Today
          </h2>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <Input id="fullName" type="text" required />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <Input id="email" type="email" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <Input id="phone" type="tel" required />
              </div>

              <div>
                <label
                  htmlFor="propertyType"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Property Type *
                </label>
                <select
                  id="propertyType"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="">Select type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Property Location *
              </label>
              <Input
                id="location"
                type="text"
                placeholder="e.g., Kabulonga, Lusaka"
                required
              />
            </div>

            <div>
              <label
                htmlFor="listingType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Listing Type *
              </label>
              <select
                id="listingType"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">Select listing type</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Price (ZMW) *
              </label>
              <Input
                id="price"
                type="number"
                placeholder="e.g., 2500000"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Additional Information
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Tell us more about your property..."
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Submit Listing Request
            </Button>
          </form>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Our team will review your submission and contact you within 24
            hours.
          </p>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/properties"
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            ← Back to Properties
          </Link>
        </div>
      </div>
    </div>
  );
}
