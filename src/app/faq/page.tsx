"use client";

import { useState } from "react";
import Link from "next/link";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // General Questions
  {
    id: 1,
    question: "What is Nyumba?",
    answer:
      "Nyumba is Zambia's leading property marketplace platform that connects buyers, sellers, and renters. We offer AI-powered property valuations, verified listings, neighborhood insights, and financing solutions all in one place.",
    category: "General",
  },
  {
    id: 2,
    question: "Is Nyumba free to use?",
    answer:
      "Yes! Browsing properties and searching for homes is completely free. We charge fees for premium services like featured listings, professional photography, and advanced marketing tools for sellers and agents.",
    category: "General",
  },
  {
    id: 3,
    question: "How does the verification system work?",
    answer:
      "We verify property owners and agents through our KYC (Know Your Customer) process. This includes validating National Registration Cards (NRC), property ownership documents, and business licenses for agents. Verified users get a badge on their profile and listings.",
    category: "General",
  },

  // Buying Properties
  {
    id: 4,
    question: "How do I search for properties?",
    answer:
      "Use our advanced search filters to find properties by location, price range, number of bedrooms, property type, and amenities. You can also save your searches and get notifications when new matching properties are listed.",
    category: "Buying",
  },
  {
    id: 5,
    question: "What is the AI property valuation?",
    answer:
      "Our AI-powered valuation tool analyzes market data, comparable properties, location factors, and property features to provide an estimated value. While useful for guidance, we recommend getting a professional appraisal for official purposes.",
    category: "Buying",
  },
  {
    id: 6,
    question: "How do I contact a property owner?",
    answer:
      "Click the 'Contact' button on any listing to send a message directly to the owner or agent. You can also call them using the provided phone number. All verified sellers are required to respond within 24 hours.",
    category: "Buying",
  },
  {
    id: 7,
    question: "Can I schedule property viewings?",
    answer:
      "Yes! After contacting the seller or agent, you can request to schedule a viewing. Many properties also offer virtual tours that you can access immediately on the listing page.",
    category: "Buying",
  },

  // Selling Properties
  {
    id: 8,
    question: "How do I list my property?",
    answer:
      "Sign up for a free account, click 'Sell' in the navigation, and follow the listing creation process. You'll need to provide property details, upload photos, and verify your ownership. Basic listings are free, with premium options available.",
    category: "Selling",
  },
  {
    id: 9,
    question: "What documents do I need to list a property?",
    answer:
      "You'll need proof of ownership (title deed or purchase agreement), your National Registration Card (NRC), and recent photos of the property. Additional documents may be required for verification.",
    category: "Selling",
  },
  {
    id: 10,
    question: "How long does it take to get verified?",
    answer:
      "The verification process typically takes 24-48 hours. We review your documents and may contact you if additional information is needed. Once verified, your listing will be published with a verification badge.",
    category: "Selling",
  },
  {
    id: 11,
    question: "What are the fees for selling?",
    answer:
      "Basic listings are free. Premium features include: Featured listings (top placement in search results), professional photography services, virtual tours, and advanced analytics. Contact us for detailed pricing.",
    category: "Selling",
  },

  // Financing
  {
    id: 12,
    question: "How does the loan matching work?",
    answer:
      "Our platform connects you with multiple banks and financial institutions. Enter your property details and financial information, and we'll show you personalized loan offers from different lenders, allowing you to compare rates and terms.",
    category: "Financing",
  },
  {
    id: 13,
    question: "What documents are needed for a loan application?",
    answer:
      "Typically you'll need: National Registration Card, proof of income (payslips/bank statements), employment letter, property valuation report, and proof of deposit. Requirements vary by lender.",
    category: "Financing",
  },
  {
    id: 14,
    question: "How accurate is the loan calculator?",
    answer:
      "Our loan calculator provides estimates based on current market rates and standard terms. Actual rates and terms will be determined by the lender based on your creditworthiness and specific circumstances.",
    category: "Financing",
  },
  {
    id: 15,
    question: "Can I get pre-approved for a loan?",
    answer:
      "Yes! Many of our partner lenders offer pre-approval. This helps you understand your budget before house hunting and makes your offers more attractive to sellers.",
    category: "Financing",
  },

  // Renting
  {
    id: 16,
    question: "How do I rent a property?",
    answer:
      "Browse rental listings, filter by your preferences, and contact landlords directly. You'll typically need to provide references, proof of income, and a security deposit equal to 1-2 months' rent.",
    category: "Renting",
  },
  {
    id: 17,
    question: "Are rental agreements provided?",
    answer:
      "While we provide template rental agreements, we recommend having a lawyer review any contract before signing. Both landlords and tenants should ensure all terms are clearly stated.",
    category: "Renting",
  },

  // Technical Support
  {
    id: 18,
    question: "I forgot my password. What should I do?",
    answer:
      "Click 'Login' then 'Forgot Password'. Enter your email address and we'll send you a link to reset your password. If you don't receive the email, check your spam folder.",
    category: "Technical",
  },
  {
    id: 19,
    question: "How do I update my profile?",
    answer:
      "Log in to your account, click on your profile icon, and select 'Settings' or 'Edit Profile'. You can update your personal information, contact details, and preferences.",
    category: "Technical",
  },
  {
    id: 20,
    question: "Is my personal information secure?",
    answer:
      "Yes! We use industry-standard encryption and security measures to protect your data. Read our Privacy Policy for details on how we collect, use, and protect your information.",
    category: "Technical",
  },
];

const categories = [
  "All",
  "General",
  "Buying",
  "Selling",
  "Financing",
  "Renting",
  "Technical",
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Find answers to common questions about using Nyumba
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 pb-16">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 bg-transparent rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
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
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary-600 shadow-md shadow-primary-600/30 scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-primary-300"
              }`}
              style={activeCategory === category ? { color: "white" } : {}}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md ${
                  openItems.includes(faq.id) ? "ring-2 ring-primary-500" : ""
                }`}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex-1 px-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 leading-normal mb-1">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      openItems.includes(faq.id)
                        ? "bg-primary-100 rotate-180"
                        : "bg-gray-100"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 transition-colors ${
                        openItems.includes(faq.id)
                          ? "text-primary-600"
                          : "text-gray-500"
                      }`}
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
                  </div>
                </button>
                {openItems.includes(faq.id) && (
                  <div className="px-6 pb-5 pt-1">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-900 font-medium mb-2">
                No questions found
              </p>
              <p className="text-gray-600 mb-5">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Still Need Help */}
        <div className="mt-16 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-2xl border border-primary-200 p-8 md:p-10 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-600 rounded-full mb-5">
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
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Still have questions?
            </h2>
            <p className="text-gray-700 mb-8">
              Can&apos;t find the answer you&apos;re looking for? Our support
              team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Contact Support
              </Link>
              <a
                href="mailto:support@nyumba.co.zm"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-gray-700 font-medium rounded-lg border-2 border-gray-300 hover:border-primary-600 hover:text-primary-600 transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
