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
  tags?: string[];
  affiliateIds?: string[];
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
  // Transformed content properties (flattened from frontmatter)
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

export type ContentItem = Post | Resource | Study | Event;
