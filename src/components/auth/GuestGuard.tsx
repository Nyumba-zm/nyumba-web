'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

interface GuestGuardProps {
  children: React.ReactNode;
  fallbackUrl?: string;
}

function GuestGuardContent({ children, fallbackUrl = '/dashboard' }: GuestGuardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Check for returnUrl in query params, otherwise use fallback
      const returnUrl = searchParams.get('returnUrl');
      router.push(returnUrl ? decodeURIComponent(returnUrl) : fallbackUrl);
    }
  }, [isAuthenticated, isLoading, router, searchParams, fallbackUrl]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if already authenticated
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-gray-500">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * Protects routes that should only be accessible to guests (non-authenticated users).
 * Redirects to dashboard or returnUrl if user is already authenticated.
 */
export function GuestGuard({ children, fallbackUrl = '/dashboard' }: GuestGuardProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      }
    >
      <GuestGuardContent fallbackUrl={fallbackUrl}>{children}</GuestGuardContent>
    </Suspense>
  );
}
