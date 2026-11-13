/**
 * External store for the visitor's ad-personalization consent.
 * Kept outside React so AdSlot, the consent banner, and the loader hook share
 * one source of truth without a provider.
 */

export type AdConsent = 'granted' | 'denied';

type Listener = (value: AdConsent | null) => void;

const STORAGE_KEY = 'bt-ad-consent';

const readStoredConsent = (): AdConsent | null => {
  // localStorage is unavailable in some privacy modes; consent then lives
  // in memory for the session only, which is a safe degradation.
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'granted' || stored === 'denied' ? stored : null;
  } catch {
    return null;
  }
};

let current: AdConsent | null = readStoredConsent();
const listeners = new Set<Listener>();

export const getAdConsent = (): AdConsent | null => current;

export const setAdConsent = (value: AdConsent): void => {
  current = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage write failed (privacy mode); in-memory consent still applies.
  }
  listeners.forEach(listener => listener(current));
};

export const subscribeAdConsent = (listener: Listener): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** Clears the in-memory consent (and stored value) — test isolation only. */
export const resetAdConsent = (): void => {
  current = null;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable; in-memory reset still applies.
  }
  listeners.forEach(listener => listener(null));
};
