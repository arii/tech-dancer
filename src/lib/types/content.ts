/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Post {
  type: 'post' | 'blog';
  draft?: boolean;
  slug: string;
  title: string;
  date: string;
  author: string;
  authorAvatar?: string;
  category: string;
  excerpt: string;
  content: string;
  image?: string;
  imageBack?: string;
  imageAlt?: string;
  updated?: string;
  tags?: string[];
  affiliateIds?: string[];
  imageFit?: 'cover' | 'contain';
  featured?: boolean;
}

export interface Resource {
  type: 'resource';
  draft?: boolean;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  image?: string;
  imageBack?: string;
  tags?: string[];
  affiliateIds?: string[];
  rating?: number;
  verdict?: string;
  priceCategory?: string;
  updatedDate?: string;
  durability?: number;
  value?: number;
  specs?: Record<string, string>;

  // SEO & Metadata
  seoTitle?: string;
  seoDescription?: string;
  imageAlt?: string;

  // Merch-specific fields
  shopUrl?: string;
  internalSku?: string;
  printfulProductId?: string;
  printfulVariantIds?: string[];
  displayMode?: string;
  featuredSide?: string;

  productType?: "shirt" | "hoodie" | "hat" | "sticker" | "bag" | "other";
  fulfillmentType?: "print-on-demand";
  provider?: "printful";

  shippingPolicySummary?: string;
  returnPolicySummary?: string;

  // Gear / Affiliate-specific fields
  affiliateProvider?: "amazon" | "other";
  affiliateDisclosure?: string;
  priceDisplayPolicy?: "do-not-display-static-price" | "manually-reviewed";
  availabilityDisplayPolicy?: "do-not-display-static-availability" | "manually-reviewed";
  recommendedFor?: string[];
}

export type ContentStatus = 'published' | 'draft' | 'planned';

export interface Study {
  type: 'study';
  draft?: boolean;
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  tags?: string[];
  author: string;
  status?: ContentStatus;
  readTime?: number;
}

export type ContentItem = Post | Resource | Study;
