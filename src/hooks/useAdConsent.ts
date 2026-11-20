import { useSyncExternalStore } from 'react';
import { getAdConsent, subscribeAdConsent, type AdConsent } from '@/lib/ads/adConsentStore';

/** Reactive read of the visitor's ad-personalization consent ('denied' until accepted). */
export function useAdConsent(): AdConsent {
  return useSyncExternalStore(subscribeAdConsent, getAdConsent, getAdConsent);
}
