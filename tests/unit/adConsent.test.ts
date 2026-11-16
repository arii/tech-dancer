import { describe, it, expect, afterEach } from 'vitest';
import { getAdConsent, subscribeAdConsent } from '@/lib/ads/adConsentStore';
import { acceptAds, rejectAds, resetCookieYes, setCookieYesConsent } from '../utils/cookieYes';

afterEach(() => resetCookieYes());

describe('ad consent store (CookieYes bridge)', () => {
  it('stays unresolved until CookieYes loads', () => {
    document.dispatchEvent(new Event('cookieyes_consent_update'));
    expect(getAdConsent()).toBeNull();
  });

  it('stays unresolved under GDPR until the visitor makes a choice', () => {
    setCookieYesConsent({ activeLaw: 'gdpr', isUserActionCompleted: false, categories: { advertisement: false } });
    expect(getAdConsent()).toBeNull();
  });

  it('maps the Advertisement category to granted or denied', () => {
    acceptAds();
    expect(getAdConsent()).toBe('granted');
    rejectAds();
    expect(getAdConsent()).toBe('denied');
  });

  it('applies the opt-out default immediately outside GDPR', () => {
    setCookieYesConsent({ activeLaw: 'ccpa', isUserActionCompleted: false, categories: { advertisement: true } });
    expect(getAdConsent()).toBe('granted');
  });

  it('resolves a returning visitor from banner_load', () => {
    setCookieYesConsent(
      { activeLaw: 'gdpr', isUserActionCompleted: true, categories: { advertisement: false } },
      'cookieyes_banner_load'
    );
    expect(getAdConsent()).toBe('denied');
  });

  it('notifies subscribers only when the value changes', () => {
    const seen: Array<ReturnType<typeof getAdConsent>> = [];
    const unsubscribe = subscribeAdConsent(value => seen.push(value));

    acceptAds();
    acceptAds();
    rejectAds();
    expect(seen).toEqual(['granted', 'denied']);

    unsubscribe();
    acceptAds();
    expect(seen).toEqual(['granted', 'denied']);
  });
});
