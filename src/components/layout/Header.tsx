"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="p-2 bg-primary-500 rounded-lg text-white flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-primary-500">
            Nyumba
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 lg:space-x-6 items-center">
          <Link
            href="/properties"
            className="text-gray-600 hover:text-primary-500 transition"
          >
            Buy
          </Link>
          <Link
            href="/rent"
            className="text-gray-600 hover:text-primary-500 transition"
          >
            Rent
          </Link>
          <Link
            href="/sell"
            className="text-gray-600 hover:text-primary-500 transition"
          >
            Sell
          </Link>
          <Link
            href="/contact"
            className="bg-primary-500 text-white px-4 lg:px-6 py-2 rounded-full hover:bg-primary-600 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-600"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 border-t">
          <Link
            href="/properties"
            className="block py-3 text-gray-600 hover:text-primary-500"
          >
            Buy
          </Link>
          <Link
            href="/rent"
            className="block py-3 text-gray-600 hover:text-primary-500"
          >
            Rent
          </Link>
          <Link
            href="/sell"
            className="block py-3 text-gray-600 hover:text-primary-500"
          >
            Sell
          </Link>
          <Link
            href="/contact"
            className="block w-full text-center mt-2 bg-primary-500 text-white px-6 py-2 rounded-full hover:bg-primary-600"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
