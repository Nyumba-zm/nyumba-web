import Link from "next/link";
import { EmptyState } from "@/components/shared/EmptyState";

/**
 * The backend has no password-reset endpoint yet, so this page explains how to get help
 * instead of submitting a form that cannot succeed.
 */
export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <EmptyState
          title="Password reset isn't available yet"
          description="We can't send reset emails yet. Contact us and we'll help you get back into your account."
          actionLabel="Contact support"
          actionHref="/contact"
          className="py-4"
        />
        <p className="text-center text-sm text-gray-600">
          Remembered it?{" "}
          <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
