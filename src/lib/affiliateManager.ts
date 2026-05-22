/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AffiliateLink } from '../types';
import AFFILIATE_DATABASE_JSON from '../data/affiliates.json';

const AFFILIATE_DATABASE: Record<string, AffiliateLink> = AFFILIATE_DATABASE_JSON as Record<string, AffiliateLink>;

export const affiliateManager = {
  getLink: (id: string): AffiliateLink | undefined => {
    return AFFILIATE_DATABASE[id];
  },
  
  resolveUrl: (id: string, metadata?: Record<string, string>): string => {
    const link = AFFILIATE_DATABASE[id];
    if (!link) return '#';
    
    const url = new URL(link.url);

    // Don't add tracking to Printful links or if already present
    const isPrintful = url.hostname.includes('printful.me');

    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        if (!url.searchParams.has(key)) {
          url.searchParams.append(key, value);
        }
      });
    }

    // Add global tracking for non-Printful affiliate links
    if (!isPrintful) {
      if (!url.searchParams.has('utm_source')) {
        url.searchParams.append('utm_source', 'boomtick-blog');
      }
      if (!url.searchParams.has('utm_medium')) {
        url.searchParams.append('utm_medium', 'portfolio');
      }
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
