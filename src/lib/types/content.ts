/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Post {
  type: 'post';
  slug: string;
  title: string;
  date: string;
  author: string;
  authorAvatar?: string;
  category: string;
  excerpt: string;
  content: string;
  image?: string;
  tags?: string[];
  affiliateIds?: string[];
}

export interface Resource {
  type: 'resource';
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  image?: string;
  tags?: string[];
  affiliateIds?: string[];
  rating?: number;
  verdict?: string;
  priceCategory?: string;
  updatedDate?: string;
  durability?: number;
  value?: number;
  specs?: Record<string, string>;
}

export interface Study {
  type: 'study';
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
  accessoryIds?: string[];
  shoeIds?: string[];
  essentialIds?: string[];
  travelIds?: string[];
}

export interface Event {
  type: "event";
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  location: string;
  city: string;
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
  gearAccessoryIds?: string[];
  gearShoeIds?: string[];
  gearEssentialIds?: string[];
  gearTravelIds?: string[];
  relatedEvents?: string[];
  region?: string;
  resourceGuide?: boolean;
  guideStatus?: 'live' | 'coming-soon' | 'planned';
}

export type ContentItem = Post | Resource | Study | Event;
