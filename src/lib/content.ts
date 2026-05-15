/// <reference types="vite/client" />
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { parse } from 'yaml';
import { ASSET_PREFIX } from '@/config/constants';

/**
 * Lightweight browser-safe frontmatter parser using a vetted library.
 */
export function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content };

  const yamlStr = match[1];
  const body = match[2];

  try {
    const data = parse(yamlStr);
    return { data: data || {}, content: body };
  } catch (e) {
    console.error('Error parsing frontmatter:', e);
    return { data: {}, content: body };
  }
}

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
  themeOutfitIds?: string[];
  themeAccessoryIds?: string[];
  gearOutfitIds?: string[];
  gearAccessoryIds?: string[];
  gearShoeIds?: string[];
  gearEssentialIds?: string[];
  gearTravelIds?: string[];
  relatedEvents?: string[];
}

export type ContentItem = Post | Resource | Study | Event;

interface ContentModule {
  default: string;
}

const contentModules = {
  posts: import.meta.glob('/content/posts/*.md', { eager: true, query: '?raw' }),
  resources: import.meta.glob('/content/resources/*.md', { eager: true, query: '?raw' }),
  studies: import.meta.glob('/content/studies/*.md', { eager: true, query: '?raw' }),
  events: import.meta.glob('/content/events/*.md', { eager: true, query: '?raw' })
};

const slugFrom = (path: string) => path.split('/').pop()?.replace('.md', '') || '';

function transform<T extends { date?: string }>(
  modules: Record<string, string | ContentModule>,
): T[] {
  const asArray = (val: unknown) => (Array.isArray(val) ? (val as string[]) : []);

  return Object.entries(modules)
    .map(([path, raw]) => {
      const contentStr = typeof raw === "string" ? raw : raw.default;
      const { data, content } = parseFrontmatter(contentStr);

      const normalizeAsset = (val: unknown) => {
        if (val === "") return undefined;
        return typeof val === "string" && val.startsWith("/")
          ? `${ASSET_PREFIX}${val}`
          : val;
      };

      data.image = normalizeAsset(data.image);
      data.heroImage = normalizeAsset(data.heroImage);

      const result: Record<string, unknown> = {
        ...data,
        title: String(data.title || "Untitled"),
        category: String(data.category || "General"),
        excerpt: String(data.excerpt || ""),
        date: String(data.date || ""),
        author: String(data.author || ""),
        location: String(data.location || ""),
        city: String(data.city || ""),
        schedule: String(data.schedule || ""),
        description: String(data.description || ""),
        startDate: data.startDate ? String(data.startDate) : undefined,
        earlyBirdDate: data.earlyBirdDate
          ? String(data.earlyBirdDate)
          : undefined,
        registrationDeadline: data.registrationDeadline
          ? String(data.registrationDeadline)
          : undefined,
        hotelCutoffDate: data.hotelCutoffDate
          ? String(data.hotelCutoffDate)
          : undefined,
        packingReminderDate: data.packingReminderDate
          ? String(data.packingReminderDate)
          : undefined,
        tags: asArray(data.tags),
        content: content || "",
        slug: slugFrom(path),
      };

      if (data.type === "event") {
        // Promote flat gear/theme fields into structured objects
        const hasFlatTheme =
          data.themeName ||
          data.themeLabel ||
          data.themeOutfitIds ||
          data.themeAccessoryIds;

        const flatTheme: EventTheme | undefined = hasFlatTheme
          ? {
              name: String(data.themeName || ""),
              label: data.themeLabel ? String(data.themeLabel) : undefined,
              outfitIds: asArray(data.themeOutfitIds),
              accessoryIds: asArray(data.themeAccessoryIds),
            }
          : undefined;

        const hasFlatGear =
          data.gearOutfitIds ||
          data.gearAccessoryIds ||
          data.gearShoeIds ||
          data.gearEssentialIds ||
          data.gearTravelIds;

        const flatGear: EventGear | undefined = hasFlatGear
          ? {
              outfitIds: asArray(data.gearOutfitIds),
              accessoryIds: asArray(data.gearAccessoryIds),
              shoeIds: asArray(data.gearShoeIds),
              essentialIds: asArray(data.gearEssentialIds),
              travelIds: asArray(data.gearTravelIds),
            }
          : undefined;

        result.theme = (data.theme as EventTheme | undefined) ?? flatTheme;
        result.gear = (data.gear as EventGear | undefined) ?? flatGear;
        result.relatedEvents = asArray(data.relatedEvents);
      }

      return result as unknown as T;
    })
    .sort((a, b) => {
      const timeA = a.date ? new Date(a.date).getTime() : 0;
      const timeB = b.date ? new Date(b.date).getTime() : 0;

      const safeA = Number.isNaN(timeA) ? 0 : timeA;
      const safeB = Number.isNaN(timeB) ? 0 : timeB;

      return safeB - safeA;
    });
}

const items = {
  posts: transform<Post>(contentModules.posts as Record<string, string | ContentModule>),
  resources: transform<Resource>(contentModules.resources as Record<string, string | ContentModule>),
  studies: transform<Study>(contentModules.studies as Record<string, string | ContentModule>),
  events: transform<Event>(contentModules.events as Record<string, string | ContentModule>)
};

const maps = {
  posts: new Map(items.posts.map(i => [i.slug, i])),
  resources: new Map(items.resources.map(i => [i.slug, i])),
  studies: new Map(items.studies.map(i => [i.slug, i])),
  events: new Map(items.events.map(i => [i.slug, i]))
};

export const getPosts = () => items.posts;
export const getResources = () => items.resources;
export const getStudies = () => items.studies;
export const getEvents = () => items.events;

export const getPostBySlug = (slug: string) => maps.posts.get(slug);
export const getResourceBySlug = (slug: string) => maps.resources.get(slug);
export const getEventBySlug = (slug: string) =>
  maps.events.get(slug);

/**
 * Calculates estimated reading time in minutes.
 * Uses a standard 200 words per minute for full content,
 * or a simplified proxy for excerpts.
 */
export const readingTime = (content?: string, excerpt?: string) => {
  if (content && content.trim().length > 0) {
    return Math.max(1, Math.round(content.split(/\s+/).length / 200));
  }
  // Fallback for list views where only excerpt might be available
  const words = excerpt?.split(/\s+/).length ?? 0;
  return Math.max(1, Math.round(words / 20)); // sensible proxy for short text
};
