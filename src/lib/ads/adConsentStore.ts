/**
 * Ad-personalization consent, read from the site's CookieYes CMP (loaded via GTM).
 * Kept outside React so AdSlot, the listing grid, and the loader hook share one
 * source of truth without a provider.
 */

export type AdConsent = 'granted' | 'denied';

type Listener = (value: AdConsent) => void;

export interface CookieYesConsent {
  activeLaw: string;
  isUserActionCompleted: boolean;
  categories: { advertisement: boolean };
}

declare global {
  interface Window {
    getCkyConsent?: () => CookieYesConsent;
  }
}

/**
 * Ads are non-personalized until the visitor accepts the Advertisement category.
 * The CookieYes free plan applies its opt-in banner worldwide, so an undecided
 * visitor is treated as denied rather than blocking ads; EEA/UK consent is
 * collected by Google's TCF consent message, which AdSense reads directly.
 */
export const resolveCookieYesConsent = (cky: CookieYesConsent): AdConsent => {
  if (cky.activeLaw === 'gdpr' && !cky.isUserActionCompleted) return 'denied';
  return cky.categories.advertisement ? 'granted' : 'denied';
};

let current: AdConsent = 'denied';
const listeners = new Set<Listener>();

const syncFromCookieYes = (): void => {
  if (typeof window.getCkyConsent !== 'function') return;
  const next = resolveCookieYesConsent(window.getCkyConsent());
  if (next === current) return;
  current = next;
  listeners.forEach(listener => listener(current));
};

export const getAdConsent = (): AdConsent => current;

export const subscribeAdConsent = (listener: Listener): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

// CookieYes fires banner_load on every page load (including returning visitors)
// and consent_update on each choice; getCkyConsent() is current inside both.
document.addEventListener('cookieyes_banner_load', syncFromCookieYes);
document.addEventListener('cookieyes_consent_update', syncFromCookieYes);
syncFromCookieYes();
