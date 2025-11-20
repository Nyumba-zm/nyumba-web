// src/lib/hooks/useMediaQuery.ts

import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design with media queries
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const media = window.matchMedia(query);

    // Create listener
    const listener = () => setMatches(media.matches);
    
    // Add listener
    media.addEventListener('change', listener);

    // Clean up
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// Predefined breakpoint hooks
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)');
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1025px)');
}