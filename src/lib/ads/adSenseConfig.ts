/**
 * AdSense configuration and identity helpers.
 * Everything downstream (loader, slots, ads.txt) derives from these so a
 * malformed or missing publisher ID disables ads entirely instead of shipping
 * a broken script tag.
 */

export type AdPlacement = 'in-article' | 'sidebar' | 'listing';

const CLIENT_ID_PATTERN = /^ca-pub-\d{10,}$/;

export const getAdSenseClient = (): string | undefined => {
  const client = import.meta.env.VITE_ADSENSE_CLIENT;
  return typeof client === 'string' && CLIENT_ID_PATTERN.test(client) ? client : undefined;
};

export const isAdSenseEnabled = (): boolean => getAdSenseClient() !== undefined;

export const getAdSensePublisherId = (): string | undefined => {
  const client = getAdSenseClient();
  return client?.replace(/^ca-/, '');
};

export const adsenseLoaderUrl = (client: string): string =>
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
