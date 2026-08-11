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

export const affiliateManager = {
  getLink: (id: string): AffiliateLink | undefined => {
    let link = AFFILIATE_DATABASE[id];
    if (!link) {
      const merch = SLOT_ERA_ITEMS.find(m => m.id === id);
      if (merch) {
        link = mapMerchToAffiliateLink(merch);
      }
    }
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
    let link = AFFILIATE_DATABASE[id];
    if (!link) {
      const merch = SLOT_ERA_ITEMS.find(m => m.id === id);
      if (merch) {
        link = mapMerchToAffiliateLink(merch);
      }
    }
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

export const SLOT_ERA_ITEMS: MerchItem[] = [
  {
    id: 'slot-era-tank-top',
    title: "Slot Era WCS Women's Racerback Tank Top",
    category: 'Apparel',
    badge: 'Merch',
    price: '$28.00',
    image: '/assets/slot_era_racerback.webp',
    url: 'https://boomtick.printful.me/product/boomtick-slot-era-west-coast-swing-dancer-womens-fitted-racerback-tank-top',
    featured: true,
    description: "Fitted racerback tank top featuring the vibrant retro Slot Era design for West Coast Swing dancers.",
  },
  {
    id: 'slot-era-tote-bag',
    title: 'Slot Era WCS Tote Bag',
    category: 'Accessories',
    badge: 'Merch',
    price: '$24.00',
    image: '/assets/slot_era_tote.webp',
    url: 'https://boomtick.printful.me/product/boomtick-slot-era-west-coast-swing-dancer-tote-bag',
    featured: true,
    description: 'Durable black canvas tote bag printed with the signature Slot Era West Coast Swing dancer graphic.',
  },
  {
    id: 'slot-era-mug',
    title: 'Slot Era Black Ceramic Mug',
    category: 'Accessories',
    badge: 'Merch',
    price: '$18.00',
    image: '/assets/slot_era_mug.webp',
    url: 'https://boomtick.printful.me/product/boomtick-slot-era-west-coast-swing-dancer-black-glossy-mug',
    featured: false,
    description: '11oz black ceramic coffee mug featuring the colorful Slot Era BoomTick insignia.',
  },
];

export const getMerchItems = (): MerchItem[] => {
  return SLOT_ERA_ITEMS;
};
