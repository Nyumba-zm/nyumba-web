// src/lib/hooks/useSavedPropertyIds.ts
//
// Saved ("hearted") listings are kept on the device: the backend has no saved-properties
// endpoint. One store shared by every card, the detail page and /saved-properties, kept in
// sync across components and tabs via useSyncExternalStore.

'use client';

import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'savedProperties';
const EMPTY: readonly string[] = [];

const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedIds: readonly string[] = EMPTY;

function readIds(): readonly string[] {
  let raw: string | null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cachedRaw) return cachedIds;
  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cachedIds = Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === 'string')
      : EMPTY;
  } catch {
    cachedIds = EMPTY;
  }
  return cachedIds;
}

function writeIds(ids: readonly string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage full or blocked (private mode): saving is best-effort.
  }
  listeners.forEach((notify) => notify());
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onChange();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onStorage);
  };
}

export function useSavedPropertyIds() {
  const savedIds = useSyncExternalStore(subscribe, readIds, () => EMPTY);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  /** Toggles the listing and returns whether it is now saved. */
  const toggleSaved = useCallback((id: string): boolean => {
    const current = readIds();
    const nowSaved = !current.includes(id);
    writeIds(nowSaved ? [...current, id] : current.filter((savedId) => savedId !== id));
    return nowSaved;
  }, []);

  return { savedIds, isSaved, toggleSaved };
}
