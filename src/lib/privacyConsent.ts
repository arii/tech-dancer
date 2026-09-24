/**
 * Privacy Consent and Signal Detection (GPC, DNT, Cookie Preference)
 */

import { GA_MEASUREMENT_ID } from '@/config/constants';

export const CONSENT_STORAGE_KEY = 'boomtick_tracking_consent';

export type ConsentState = 'granted' | 'denied' | null;

/**
 * Checks if browser Global Privacy Control (GPC) signal is active.
 */
export function isGpcActive(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return Boolean(
    (navigator as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl ||
      (window as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl
  );
}

/**
 * Checks if browser Do Not Track (DNT) signal is active.
 */
export function isDntActive(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const dnt =
    navigator.doNotTrack ||
    (window as unknown as { doNotTrack?: string }).doNotTrack ||
    (navigator as unknown as { msDoNotTrack?: string }).msDoNotTrack;
  return dnt === '1' || dnt === 'yes';
}

/**
 * Checks if client signal explicitly requests privacy opt-out (GPC or DNT).
 */
export function isOptOutSignalActive(): boolean {
  return isGpcActive() || isDntActive();
}

/**
 * Retrieves the user's stored consent decision from localStorage.
 */
export function getStoredConsent(): ConsentState {
  if (typeof window === 'undefined') return null;
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === 'granted' || value === 'denied') {
      return value;
    }
  } catch (err) {
    console.error('Failed to read tracking consent from storage:', err);
  }
  return null;
}

/**
 * Determines whether analytics and non-essential telemetry tracking are permitted.
 */
export function isTrackingAllowed(): boolean {
  if (isOptOutSignalActive()) {
    return false;
  }
  const stored = getStoredConsent();
  if (stored === 'denied') {
    return false;
  }
  if (stored === 'granted') {
    return true;
  }
  // Default stance if no consent stored: allow unless GPC/DNT is present
  return true;
}

/**
 * Updates Google Analytics 4 disable flag in window object.
 */
export function applyGa4DisableFlag(): void {
  if (typeof window === 'undefined') return;
  const disableFlag = `ga-disable-${GA_MEASUREMENT_ID}`;
  const shouldDisable = !isTrackingAllowed();
  (window as unknown as Record<string, boolean>)[disableFlag] = shouldDisable;
}

/**
 * Saves user's consent choice and dispatches a window event so subscribers can react.
 */
export function setStoredConsent(state: 'granted' | 'denied'): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, state);
    applyGa4DisableFlag();
    window.dispatchEvent(new CustomEvent('boomtick_privacy_consent_changed', { detail: { consent: state } }));
  } catch (err) {
    console.error('Failed to save tracking consent to storage:', err);
  }
}
