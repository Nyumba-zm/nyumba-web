// src/lib/utils/cn.ts

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for conflict resolution
 * 
 * @example
 * cn('px-2 py-1', 'bg-red-500', { 'text-white': isActive })
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}