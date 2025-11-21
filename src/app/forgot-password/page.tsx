"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    // TODO: Connect to backend
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-600">
            {submitted
              ? "Check your email for reset instructions"
              : "Enter your email to reset your password"}
          </p>
        </div>

        {submitted ? (
          // Success State
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-success-600"
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
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Check Your Email
              </h2>

              <p className="text-gray-600 mb-6">
                We&apos;ve sent password reset instructions to:
              </p>

              <p className="text-primary-600 font-medium mb-6">{email}</p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Didn&apos;t receive the email?</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside text-left">
                  <li>Check your spam or junk folder</li>
                  <li>Make sure you entered the correct email</li>
                  <li>Wait a few minutes and check again</li>
                </ul>
              </div>

              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="w-full mb-3"
              >
                Try Another Email
              </Button>

              <Link
                href="/login"
                className="block w-full text-center py-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                Back to Login
              </Link>
            </div>
          </div>
        ) : (
          // Form State
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md p-6 space-y-4"
          >
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                Enter the email address associated with your account and
                we&apos;ll send you a link to reset your password.
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                ← Back to Login
              </Link>
            </div>
          </form>
        )}

        {/* Additional Help */}
        {!submitted && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Need more help?</p>
            <Link
              href="/contact"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Contact Support
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
