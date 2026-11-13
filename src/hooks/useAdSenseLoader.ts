import { useEffect } from 'react';
import { adsenseLoaderUrl, getAdSenseClient } from '@/lib/ads/adSenseConfig';
import { getAdConsent, subscribeAdConsent } from '@/lib/ads/adConsentStore';

declare global {
  interface Window {
    adsbygoogle?: AdSenseQueue;
  }
}

export interface AdSenseQueue extends Array<Record<string, unknown>> {
  requestNonPersonalizedAds?: number;
}

const LOADER_ID = 'adsbygoogle-loader';
const META_NAME = 'google-adsense-account';

const injectAccountMeta = (client: string): void => {
  if (document.head.querySelector(`meta[name="${META_NAME}"]`)) return;
  const meta = document.createElement('meta');
  meta.name = META_NAME;
  meta.content = client;
  document.head.appendChild(meta);
};

const injectLoaderScript = (client: string, personalized: boolean): void => {
  if (document.head.querySelector(`script#${LOADER_ID}`)) return;
  if (!personalized) {
    // Non-personalized mode must be declared before the loader runs.
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.requestNonPersonalizedAds = 1;
  }
  const script = document.createElement('script');
  script.id = LOADER_ID;
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = adsenseLoaderUrl(client);
  document.head.appendChild(script);
};

/**
 * Injects the AdSense account-verification meta tag as soon as ads are
 * configured, but defers the loader script until consent resolves — declined
 * visitors still get ads, only non-personalized ones.
 */
export function useAdSenseLoader(): void {
  const client = getAdSenseClient();

  useEffect(() => {
    if (!client) return;
    injectAccountMeta(client);

    const existing = getAdConsent();
    if (existing !== null) {
      injectLoaderScript(client, existing === 'granted');
      return;
    }
    return subscribeAdConsent(next => {
      if (next !== null) injectLoaderScript(client, next === 'granted');
    });
  }, [client]);
}
