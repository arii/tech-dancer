import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  isGpcActive,
  isDntActive,
  isOptOutSignalActive,
  getStoredConsent,
  setStoredConsent,
  isTrackingAllowed,
  applyGa4DisableFlag,
  CONSENT_STORAGE_KEY,
} from '@/lib/privacyConsent';
import { GA_MEASUREMENT_ID } from '@/config/constants';

describe('privacyConsent utilities', () => {
  beforeEach(() => {
    localStorage.clear();
    delete (window as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl;
    delete (navigator as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl;
    delete (navigator as unknown as { doNotTrack?: string }).doNotTrack;
    delete (window as unknown as { doNotTrack?: string }).doNotTrack;
    delete (window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`];
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('detects Global Privacy Control (GPC) signal when active on navigator', () => {
    Object.defineProperty(navigator, 'globalPrivacyControl', {
      value: true,
      configurable: true,
    });
    expect(isGpcActive()).toBe(true);
    expect(isOptOutSignalActive()).toBe(true);
    expect(isTrackingAllowed()).toBe(false);
  });

  it('detects Do Not Track (DNT) signal when set to 1', () => {
    Object.defineProperty(navigator, 'doNotTrack', {
      value: '1',
      configurable: true,
    });
    expect(isDntActive()).toBe(true);
    expect(isOptOutSignalActive()).toBe(true);
    expect(isTrackingAllowed()).toBe(false);
  });

  it('returns default tracking state when no opt-out signal or stored consent exists', () => {
    expect(isGpcActive()).toBe(false);
    expect(isDntActive()).toBe(false);
    expect(getStoredConsent()).toBeNull();
    expect(isTrackingAllowed()).toBe(true);
  });

  it('persists consent preference to localStorage and updates GA4 disable flag', () => {
    const disableFlag = `ga-disable-${GA_MEASUREMENT_ID}`;

    setStoredConsent('denied');
    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBe('denied');
    expect(getStoredConsent()).toBe('denied');
    expect(isTrackingAllowed()).toBe(false);
    expect((window as unknown as Record<string, boolean>)[disableFlag]).toBe(true);

    setStoredConsent('granted');
    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBe('granted');
    expect(getStoredConsent()).toBe('granted');
    expect(isTrackingAllowed()).toBe(true);
    expect((window as unknown as Record<string, boolean>)[disableFlag]).toBe(false);
  });

  it('applies ga-disable flag based on isTrackingAllowed', () => {
    const disableFlag = `ga-disable-${GA_MEASUREMENT_ID}`;
    setStoredConsent('denied');
    applyGa4DisableFlag();
    expect((window as unknown as Record<string, boolean>)[disableFlag]).toBe(true);
  });
});
