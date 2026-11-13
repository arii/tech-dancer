import { useSyncExternalStore } from 'react';
import { getAdConsent, subscribeAdConsent, type AdConsent } from '@/lib/ads/adConsentStore';

/** Reactive read of the visitor's ad-consent preference (null = unresolved). */
export function useAdConsent(): AdConsent | null {
  return useSyncExternalStore(subscribeAdConsent, getAdConsent, () => null);
}
