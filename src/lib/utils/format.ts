// src/lib/utils/format.ts

import { format as dateFnsFormat } from 'date-fns';
import { DEFAULT_CURRENCY, type CurrencyCode } from '@/types/api';

const groupedNumber = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

/**
 * Format a price for display: `K 2,500,000` for ZMW, `$ 250,000` for USD.
 * Formatting is locale-independent so server and client render identical markup.
 */
export function formatCurrency(amount: number, currency: CurrencyCode = DEFAULT_CURRENCY): string {
  const symbol = currency === 'ZMW' ? 'K' : '$';
  return `${symbol} ${groupedNumber.format(amount)}`;
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Format date to readable string
 */
export function formatDate(
  date: string | Date,
  formatString: string = 'MMM dd, yyyy'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateFnsFormat(dateObj, formatString);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}

const ZAMBIAN_MOBILE = /^(?:\+?260|0)?([79]\d{8})$/;

/**
 * Normalise a Zambian mobile number to E.164 (`+260971234567`).
 * Accepts `0971234567`, `971234567`, `260971234567`, `+260 97 123 4567`.
 * Returns null when the input is not a valid Zambian mobile number.
 */
export function normalizeZambianPhone(input: string): string | null {
  const compact = input.replace(/[\s()-]/g, '');
  const match = ZAMBIAN_MOBILE.exec(compact);
  return match ? `+260${match[1]}` : null;
}

/**
 * Display a phone number as `+260 97 123 4567`; unknown formats are returned unchanged.
 */
export function formatPhoneNumber(phone: string): string {
  const e164 = normalizeZambianPhone(phone);
  if (!e164) return phone;
  const digits = e164.slice(4);
  return `+260 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
}

/**
 * Format square meters to readable string
 */
export function formatSquareMeters(sqm: number): string {
  return `${sqm.toLocaleString()} m²`;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Generate initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Calculate mortgage payment
 */
export function calculateMortgage(
  principal: number,
  annualRate: number,
  years: number
): {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
} {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - principal;

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
  };
}