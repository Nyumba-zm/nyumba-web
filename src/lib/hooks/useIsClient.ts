// src/lib/hooks/useIsClient.ts

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * False during SSR and hydration, true afterwards — without a setState-in-effect
 * re-render. Use to gate browser-only UI and avoid hydration mismatches.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
