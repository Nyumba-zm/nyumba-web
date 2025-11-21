"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center space-x-2"
          aria-label="Nyumba Home"
        >
          <div
            className="p-2 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#0d9488" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span
            className="text-xl sm:text-2xl font-bold"
            style={{ color: "#0d9488" }}
          >
            Nyumba
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 lg:space-x-6 items-center">
          <Link
            href="/properties"
            className="text-gray-700 hover:text-primary-600 transition font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2 py-1"
          >
            Buy
          </Link>
          <Link
            href="/rent"
            className="text-gray-700 hover:text-primary-600 transition font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2 py-1"
          >
            Rent
          </Link>
          <Link
            href="/sell"
            className="text-gray-700 hover:text-primary-600 transition font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2 py-1"
          >
            Sell
          </Link>
          <Link
            href="/finance"
            className="text-gray-700 hover:text-primary-600 transition font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2 py-1"
          >
            Finance
          </Link>
          <Link
            href="/demo"
            className="text-gray-700 hover:text-primary-600 transition font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2 py-1 flex items-center gap-1"
          >
            <span className="text-lg">🎯</span>
            Demo
          </Link>
          <Link
            href="/signup"
            className="px-4 lg:px-6 py-2 rounded-full transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            style={{ backgroundColor: "#0d9488", color: "#ffffff" }}
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded p-1"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden px-6 pb-4 border-t"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <Link
            href="/about"
            className="block py-3 text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded font-medium"
          >
            About
          </Link>
          <Link
            href="/properties"
            className="block py-3 text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded font-medium"
          >
            Buy
          </Link>
          <Link
            href="/rent"
            className="block py-3 text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded font-medium"
          >
            Rent
          </Link>
          <Link
            href="/sell"
            className="block py-3 text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded font-medium"
          >
            Sell
          </Link>
          <Link
            href="/finance"
            className="block py-3 text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded font-medium"
          >
            Finance
          </Link>
          <Link
            href="/demo"
            className="block py-3 text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded font-medium flex items-center gap-2"
          >
            <span className="text-lg">🎯</span>
            Interactive Demos
          </Link>

          <Link
            href="/signup"
            className="block w-full text-center mt-2 px-6 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            style={{ backgroundColor: "#0d9488", color: "#ffffff" }}
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
