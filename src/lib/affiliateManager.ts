/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AffiliateLink } from '../types';
import AFFILIATE_DATABASE_JSON from '../data/affiliates.json';
import { ASSET_PREFIX } from '../config/constants';

const AFFILIATE_DATABASE: Record<string, AffiliateLink> = AFFILIATE_DATABASE_JSON as Record<string, AffiliateLink>;

/**
 * Applies default UTM tracking parameters to the URL if not already present.
 */
function applyDefaultTracking(url: URL) {
  if (!url.searchParams.has('utm_source')) {
    url.searchParams.append('utm_source', 'boomtick-blog');
  }
  if (!url.searchParams.has('utm_medium')) {
    url.searchParams.append('utm_medium', 'portfolio');
  }
}

export const affiliateManager = {
  getLink: (id: string): AffiliateLink | undefined => {
    const link = AFFILIATE_DATABASE[id];
    if (!link) return undefined;

    // Normalize image path if present and relative
    if (link.image && link.image.startsWith('/') && !link.image.startsWith(ASSET_PREFIX)) {
      return {
        ...link,
        image: `${ASSET_PREFIX}${link.image}`
      };
    }

    return link;
  },
  
  resolveUrl: (id: string, metadata?: Record<string, string>): string => {
    const link = AFFILIATE_DATABASE[id];
    if (!link) return '#';
    
    const url = new URL(link.url);

    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        if (!url.searchParams.has(key)) {
          url.searchParams.append(key, value);
        }
      });
    }

    // Add global tracking for non-Printful affiliate links
    const isPrintful = url.hostname.includes('printful.me');
    if (!isPrintful) {
      applyDefaultTracking(url);
    }
    
    return url.toString();
  },

  resolveResourceHref: (config: { id?: string; gearSlug?: string }): string => {
    const { id, gearSlug } = config;

    // 1. Explicit gear slug (likely from content markdown)
    if (gearSlug) {
      return `/gear/${gearSlug}`;
    }

    // 2. Check affiliate database for canonical gearSlug mapping
    if (id) {
      const link = AFFILIATE_DATABASE[id];
      if (link?.gearSlug) {
        return `/gear/${link.gearSlug}`;
      }
    }

    // 3. Fallback to external URL if id exists
    if (id) {
      return affiliateManager.resolveUrl(id);
    }

    return '#';
  }
};
