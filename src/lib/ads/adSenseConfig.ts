/**
 * AdSense configuration and identity helpers.
 * Everything downstream (loader, slots, ads.txt) derives from these so a
 * malformed or missing publisher or ad-unit ID disables that surface entirely
 * instead of shipping a broken script tag or an ad unit AdSense cannot fill.
 */

export type AdPlacement = 'in-article' | 'sidebar' | 'listing';

export interface AdUnit {
  client: string;
  slot: string;
}

const CLIENT_ID_PATTERN = /^ca-pub-\d{10,}$/;
const SLOT_ID_PATTERN = /^\d{10}$/;

const readSlotId = (placement: AdPlacement): string | undefined => {
  const env = import.meta.env;
  const slots: Record<AdPlacement, string | undefined> = {
    'in-article': env.VITE_ADSENSE_SLOT_IN_ARTICLE,
    sidebar: env.VITE_ADSENSE_SLOT_SIDEBAR,
    listing: env.VITE_ADSENSE_SLOT_LISTING,
  };
  return slots[placement];
};

export const getAdSenseClient = (): string | undefined => {
  const client = import.meta.env.VITE_ADSENSE_CLIENT;
  return typeof client === 'string' && CLIENT_ID_PATTERN.test(client) ? client : undefined;
};

export const getAdUnit = (placement: AdPlacement): AdUnit | undefined => {
  const client = getAdSenseClient();
  const slot = readSlotId(placement);
  return client && typeof slot === 'string' && SLOT_ID_PATTERN.test(slot) ? { client, slot } : undefined;
};

export const getAdSensePublisherId = (): string | undefined => {
  const client = getAdSenseClient();
  return client?.replace(/^ca-/, '');
};

export const adsenseLoaderUrl = (client: string): string =>
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
