"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { GuestGuard } from "@/components/auth";
import { useRegister } from "@/lib/hooks";
import { registerSchema } from "@/lib/validations/authSchemas";
import { z } from "zod";
import Link from "next/link";

type RegisterFormInputs = z.input<typeof registerSchema>;
type AllowedRole = "buyer" | "seller" | "agent";

const accountTypes = [
  {
    id: "buyer" as const,
    label: "Buy/Rent",
    description: "Search for properties",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    id: "seller" as const,
    label: "Sell",
    description: "List your property",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "agent" as const,
    label: "Agent",
    description: "Professional account",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

function SignupForm() {
  const [accountType, setAccountType] = useState<AllowedRole>("buyer");
  const { addToast } = useToast();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "buyer",
      acceptTerms: false as unknown as true,
    },
  });

  const onSubmit = (data: RegisterFormInputs) => {
    registerMutation.mutate(
      {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone || undefined,
        role: accountType,
      },
      {
        onError: (error) => {
          const message =
            error instanceof Error
              ? error.message
              : "Registration failed. Please try again.";
          addToast(message, "error");
        },
      }
    );
  };

  const handleAccountTypeChange = (type: AllowedRole) => {
    setAccountType(type);
    setValue("role", type);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid-signup" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid-signup)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg
                className="w-7 h-7 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">Nyumba</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
            Start Your
            <br />Property Journey
          </h1>
          <p className="text-lg text-white/80 mb-10 max-w-md">
            Create your free account and join Zambia&apos;s most trusted property marketplace.
          </p>

          {/* Benefits */}
          <div className="space-y-4">
            {[
              "Browse verified property listings",
              "Get instant AI-powered valuations",
              "Connect directly with sellers & agents",
              "Save favorites and get alerts",
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/90">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full" />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-12">
        <div className="max-w-lg w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-xl font-bold text-stone-900 dark:text-white">Nyumba</span>
          </div>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mb-2">
              Create Your Account
            </h1>
            <p className="text-stone-600 dark:text-stone-400">
              Join Zambia&apos;s most trusted property marketplace
            </p>
          </div>

          {/* Account Type Selection */}
          <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-200 dark:border-stone-700 p-6 mb-6">
            <p className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-4">I want to:</p>
            <div className="grid grid-cols-3 gap-3">
              {accountTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleAccountTypeChange(type.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    accountType === type.id
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30"
                      : "border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600"
                  }`}
                >
                  <div className={`mb-2 ${
                    accountType === type.id
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-stone-500 dark:text-stone-400"
                  }`}>
                    {type.icon}
                  </div>
                  <div className={`text-sm font-semibold ${
                    accountType === type.id
                      ? "text-primary-700 dark:text-primary-300"
                      : "text-stone-700 dark:text-stone-300"
                  }`}>
                    {type.label}
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    {type.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Signup Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-200 dark:border-stone-700 p-6 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
                >
                  First Name
                </label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  {...register("firstName")}
                  error={errors.firstName?.message}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
                >
                  Last Name
                </label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Mwale"
                  {...register("lastName")}
                  error={errors.lastName?.message}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                error={errors.email?.message}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
              >
                Phone Number <span className="text-stone-400 dark:text-stone-500">(Optional)</span>
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="+260 97 123 4567"
                {...register("phone")}
                error={errors.phone?.message}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create password"
                  {...register("password")}
                  error={errors.password?.message}
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  {...register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                />
              </div>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 -mt-2">
              At least 8 characters with uppercase, lowercase, and number
            </p>

            <div className="flex items-start pt-2">
              <input
                type="checkbox"
                id="acceptTerms"
                {...register("acceptTerms")}
                className="mt-1 h-4 w-4 text-primary-600 border-stone-300 dark:border-stone-600 rounded focus:ring-primary-500 bg-white dark:bg-stone-700"
              />
              <label htmlFor="acceptTerms" className="ml-3 text-sm text-stone-600 dark:text-stone-400">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.acceptTerms.message}</p>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200 dark:border-stone-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-stone-50 dark:bg-stone-900 text-stone-500 dark:text-stone-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Signup */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-stone-200 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-800 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-stone-200 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-800 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-stone-600 dark:text-stone-400 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <GuestGuard>
      <SignupForm />
    </GuestGuard>
  );
}
