/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AffiliateGearItem, AFFILIATE_GEAR } from '../data/affiliateGear';

const AFFILIATE_DATABASE: Record<string, AffiliateGearItem> = Object.fromEntries(
  AFFILIATE_GEAR.map(item => [item.id, item])
);

export const affiliateManager = {
  getLink: (id: string): AffiliateGearItem | undefined => {
    return AFFILIATE_DATABASE[id];
  },
  
  resolveUrl: (id: string, metadata?: Record<string, string>): string => {
    const link = AFFILIATE_DATABASE[id];
    if (!link) return '#';
    
    const url = new URL(link.url);
    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    // Add global tracking
    url.searchParams.append('utm_source', 'boomtick-blog');
    url.searchParams.append('utm_medium', 'portfolio');
    
    return url.toString();
  }
};
