import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getAdConsent, setAdConsent, subscribeAdConsent } from '@/lib/ads/adConsentStore';

describe('ad consent store', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('starts unresolved and reports null', () => {
    expect(getAdConsent()).toBeNull();
  });

  it('persists the choice to localStorage and notifies subscribers', () => {
    const seen: Array<ReturnType<typeof getAdConsent>> = [];
    const unsubscribe = subscribeAdConsent(() => seen.push(getAdConsent()));

    setAdConsent('denied');
    expect(getAdConsent()).toBe('denied');
    expect(window.localStorage.getItem('bt-ad-consent')).toBe('denied');
    expect(seen).toEqual(['denied']);

    unsubscribe();
    setAdConsent('granted');
    expect(seen).toEqual(['denied']);
  });

  it('survives unavailable localStorage', () => {
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('quota exceeded');
    });
    expect(() => setAdConsent('granted')).not.toThrow();
    expect(getAdConsent()).toBe('granted');
    vi.restoreAllMocks();
  });
});
