/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AffiliateLink } from '../types';

const AFFILIATE_DATABASE: Record<string, AffiliateLink> = {
  'loop-quiet': {
    id: 'loop-quiet',
    name: 'Loop Quiet 2 Ear Plugs',
    url: 'https://amazon.com',
    category: 'gear',
    description: 'The quiet version of the loop earplugs are good for very loud ballrooms and sleeping with roommates.'
  },
  'bloch-grecian': {
    id: 'bloch-grecian',
    name: 'Bloch Grecian Sandal',
    url: 'https://amazon.com',
    category: 'gear',
    description: 'Popular shoe worn by champion swing dancers. Requires foot strength.'
  },
  'loop-experience': {
    id: 'loop-experience',
    name: 'Loop Experience Ear Plugs',
    url: 'https://amazon.com',
    category: 'gear',
    description: 'Better to reduce loud noises but still hear the beat.'
  },
  'suede-sheets': {
    id: 'suede-sheets',
    name: 'Suede Stick-on Sheets',
    url: 'https://amazon.com',
    category: 'gear',
    description: 'Turn regular sneakers into dance shoes for indoor floors.'
  },
  'compression-cubes': {
    id: 'compression-cubes',
    name: 'Compression Packing Cubes',
    url: 'https://amazon.com',
    category: 'travel',
    description: 'Maximize luggage space and stay organized.'
  },
  'travel-bottles': {
    id: 'travel-bottles',
    name: 'Silicone Travel Bottles',
    url: 'https://amazon.com',
    category: 'travel',
    description: 'Leak-proof refillable containers for TSA-approved liquids.'
  },
  'dance-socks': {
    id: 'dance-socks',
    name: '2 FEET Dance Socks',
    url: 'https://amazon.com',
    category: 'gear',
    description: 'Slip over sneakers for smooth pivots and turns on wood floors.'
  },
  'listerine-tabs': {
    id: 'listerine-tabs',
    name: 'Listerine Ready! Tabs',
    url: 'https://amazon.com',
    category: 'travel',
    description: 'Revolutionary 4-hour fresh breath in a chewable tablet.'
  },
  'rave-fan': {
    id: 'rave-fan',
    name: 'Zolee Large Rave Fan',
    url: 'https://amazon.com',
    category: 'gear',
    description: 'Stay cool while adding a touch of flair to your performance.'
  },
  'neck-fan': {
    id: 'neck-fan',
    name: 'OLV Neck Fan',
    url: 'https://amazon.com',
    category: 'gear',
    description: 'Hands-free cooling solution for hot events.'
  },
  'hanging-toiletry-bag': {
    id: 'hanging-toiletry-bag',
    name: 'Relavel Hanging Toiletry Bag',
    url: 'https://amazon.com',
    category: 'travel',
    description: 'Waterproof and spacious organizer for all your toiletries.'
  },
  'garment-steamer': {
    id: 'garment-steamer',
    name: 'Portable Garment Steamer',
    url: 'https://amazon.com',
    category: 'travel',
    description: 'Keep your outfits wrinkle-free while traveling.'
  },
  'epsom-salt': {
    id: 'epsom-salt',
    name: 'Epsom Salt / Bath Bombs',
    url: 'https://amazon.com',
    category: 'recovery',
    description: 'Soothe tired muscles and refresh your skin after a long weekend.'
  },
  'foam-roller': {
    id: 'foam-roller',
    name: 'Foam Roller / Hypervolt',
    url: 'https://amazon.com',
    category: 'recovery',
    description: 'Essential recovery tools for muscle maintenance and massage.'
  }
};

export const affiliateManager = {
  getLink: (id: string): AffiliateLink | undefined => {
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
    url.searchParams.append('utm_source', 'tech-dancer-platform');
    url.searchParams.append('utm_medium', 'portfolio');

    return url.toString();
  }
};
