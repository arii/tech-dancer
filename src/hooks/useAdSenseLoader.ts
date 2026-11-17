import { useEffect } from 'react';
import { adsenseLoaderUrl, getAdSenseClient } from '@/lib/ads/adSenseConfig';
import { getAdConsent, subscribeAdConsent, type AdConsent } from '@/lib/ads/adConsentStore';

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

// AdSense reads this flag on every ad request, so it must follow consent changes
// made after the loader is already on the page.
const applyPersonalization = (personalized: boolean): void => {
  window.adsbygoogle = window.adsbygoogle || [];
  window.adsbygoogle.requestNonPersonalizedAds = personalized ? 0 : 1;
};

const injectLoaderScript = (client: string): void => {
  if (document.head.querySelector(`script#${LOADER_ID}`)) return;
  const script = document.createElement('script');
  script.id = LOADER_ID;
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = adsenseLoaderUrl(client);
  document.head.appendChild(script);
};

const applyConsent = (client: string, consent: AdConsent): void => {
  applyPersonalization(consent === 'granted');
  injectLoaderScript(client);
};

/**
 * Injects the AdSense account meta tag and loader script as soon as ads are
 * configured. Ads stay non-personalized until the visitor accepts the
 * Advertisement category, and later consent changes apply to subsequent ad requests.
 */
export function useAdSenseLoader(): void {
  const client = getAdSenseClient();

  useEffect(() => {
    if (!client) return;
    injectAccountMeta(client);

    applyConsent(client, getAdConsent());
    return subscribeAdConsent(next => applyConsent(client, next));
  }, [client]);
}
