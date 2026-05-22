/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AffiliateLink } from '../types';
import AFFILIATE_DATABASE_JSON from '../data/affiliates.json';
import { ASSET_PREFIX } from '@/config/constants';

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
    if (link.image && link.image.startsWith('/')) {
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

  resolveResourceHref: (id: string): string => {
    const link = AFFILIATE_DATABASE[id];
    if (!link) return '#';

    // 1. Internal gear review prioritized
    if (link.gearSlug) {
      return `/gear/${link.gearSlug}`;
    }

    // 2. External affiliate/merch link
    return affiliateManager.resolveUrl(id);
  }
};
