import type { CookieYesConsent } from '@/lib/ads/adConsentStore';

/** Stubs the CookieYes API and fires the event the ad consent store listens to. */
export const setCookieYesConsent = (
  consent: CookieYesConsent,
  eventName: 'cookieyes_consent_update' | 'cookieyes_banner_load' = 'cookieyes_consent_update'
): void => {
  window.getCkyConsent = () => consent;
  document.dispatchEvent(new Event(eventName));
};

const gdpr = (isUserActionCompleted: boolean, advertisement: boolean): CookieYesConsent => ({
  activeLaw: 'gdpr',
  isUserActionCompleted,
  categories: { advertisement },
});

export const acceptAds = (): void => setCookieYesConsent(gdpr(true, true));
export const rejectAds = (): void => setCookieYesConsent(gdpr(true, false));

/** Returns the store to "no choice yet" and removes the CookieYes stub. */
export const resetCookieYes = (): void => {
  setCookieYesConsent(gdpr(false, false));
  delete window.getCkyConsent;
};
