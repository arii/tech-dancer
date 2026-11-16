/**
 * Ad-personalization consent, read from the site's CookieYes CMP (loaded via GTM).
 * Kept outside React so AdSlot, the listing grid, and the loader hook share one
 * source of truth without a provider.
 */

export type AdConsent = 'granted' | 'denied';

type Listener = (value: AdConsent | null) => void;

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
 * GDPR needs an explicit choice before any ad script loads. Other CookieYes laws
 * (e.g. CCPA) are opt-out, so their advertisement default applies immediately.
 */
export const resolveCookieYesConsent = (cky: CookieYesConsent): AdConsent | null => {
  if (cky.activeLaw === 'gdpr' && !cky.isUserActionCompleted) return null;
  return cky.categories.advertisement ? 'granted' : 'denied';
};

let current: AdConsent | null = null;
const listeners = new Set<Listener>();

const syncFromCookieYes = (): void => {
  if (typeof window.getCkyConsent !== 'function') return;
  const next = resolveCookieYesConsent(window.getCkyConsent());
  if (next === current) return;
  current = next;
  listeners.forEach(listener => listener(current));
};

export const getAdConsent = (): AdConsent | null => current;

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
