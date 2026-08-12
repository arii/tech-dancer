/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AffiliateLink } from '../types';
import AFFILIATE_DATABASE_JSON from '../data/affiliates.json';
import { ASSET_PREFIX } from '@/config/constants';
import { MERCH_PRODUCTS } from '../data/merch';

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

function mapMerchToAffiliateLink(merch: MerchItem): AffiliateLink {
  return {
    id: merch.id,
    name: merch.title,
    url: merch.url,
    category: merch.category.toLowerCase(),
    description: merch.description,
    image: merch.image,
    imageMode: 'contain'
  };
}

const SLOT_ERA_MAP = new Map<string, MerchItem>();

function findMerchLink(id: string): AffiliateLink | undefined {
  if (SLOT_ERA_MAP.size === 0) {
    SLOT_ERA_ITEMS.forEach(item => {
      SLOT_ERA_MAP.set(item.id, item);
    });
  }
  const merch = SLOT_ERA_MAP.get(id);
  return merch ? mapMerchToAffiliateLink(merch) : undefined;
}

export const affiliateManager = {
  getLink: (id: string): AffiliateLink | undefined => {
    const link = AFFILIATE_DATABASE[id] || findMerchLink(id);
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
    const link = AFFILIATE_DATABASE[id] || findMerchLink(id);
    if (!link) return '#';
    
    const url = new URL(link.url);

    if (metadata) {
      Object.entries(metadata).forEach(([rawKey, value]) => {
        // Sanitize key: allow only alphanumeric, underscores, and hyphens to prevent parameter injection
        const key = rawKey.replace(/[^a-zA-Z0-9_-]/g, '');
        if (key && !url.searchParams.has(key)) {
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

export interface MerchItem {
  id: string;
  title: string;
  category: 'Apparel' | 'Accessories' | 'Gear';
  badge: 'Merch' | 'Recommended';
  price: string;
  image: string;
  url: string;
  featured: boolean;
  description: string;
}

export const SLOT_ERA_ITEMS: MerchItem[] = MERCH_PRODUCTS
  .filter(p => p.collections.includes('slot-era'))
  .map(p => ({
    id: p.id,
    title: p.title,
    category: p.tags.includes('Apparel') ? 'Apparel' : 'Accessories',
    badge: 'Merch',
    price: `$${p.price}`,
    image: p.imageUrl,
    url: p.printfulUrl,
    featured: p.id !== 'slot-era-mug',
    description: p.description
  }));

export const getMerchItems = (): MerchItem[] => {
  return SLOT_ERA_ITEMS;
};
