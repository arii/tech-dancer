/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Post {
  type: 'post';
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
  imageAlt?: string;
  updated?: string;
  tags?: string[];
  affiliateIds?: string[];
  imageFit?: 'cover' | 'contain';
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
  eventUseCase?: string;
}

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
}

export interface EventTheme {
  name: string;
  label?: string;
  description?: string;
  colors?: string[];
  outfitIds?: string[];
  accessoryIds?: string[];
}

export interface EventGear {
  outfitIds?: string[];
  outfitDescription?: string;
  accessoryIds?: string[];
  accessoryDescription?: string;
  shoeIds?: string[];
  shoeDescription?: string;
  essentialIds?: string[];
  essentialDescription?: string;
  travelIds?: string[];
  travelDescription?: string;
}

export type EventRegion = 'NorCal' | 'SoCal' | 'Southwest' | 'Pacific Northwest' | 'South' | 'International' | 'Other';

export interface Event {
  type: "event";
  draft?: boolean;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  location: string;
  city: string;
  region?: EventRegion;
  schedule: string;
  description: string;
  link?: string;
  content: string;
  url?: string;
  heroImage?: string;
  whyAttending?: string;
  // Reminder tool anchors
  startDate?: string;
  earlyBirdDate?: string;
  registrationDeadline?: string;
  hotelCutoffDate?: string;
  packingReminderDate?: string;
  // Gear and theme (resolved from affiliate IDs at render time)
  theme?: EventTheme;
  gear?: EventGear;
  // Flat alternatives for YAML parsers that don't handle nesting
  themeName?: string;
  themeLabel?: string;
  themeDescription?: string;
  themeColors?: string[];
  themeOutfitIds?: string[];
  themeAccessoryIds?: string[];
  gearOutfitIds?: string[];
  gearOutfitDescription?: string;
  gearAccessoryIds?: string[];
  gearAccessoryDescription?: string;
  gearShoeIds?: string[];
  gearShoeDescription?: string;
  gearEssentialIds?: string[];
  gearEssentialDescription?: string;
  gearTravelIds?: string[];
  gearTravelDescription?: string;
  relatedEvents?: string[];
}

export type ContentItem = Post | Resource | Study | Event | (Study & { type: 'tool' });
