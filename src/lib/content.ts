/// <reference types="vite/client" />
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { parse } from 'yaml';
import { ASSET_PREFIX } from '@/config/constants';
import type { Post, Resource, Study, Event, ContentItem, EventTheme, EventGear } from './types/content';

export type { Post, Resource, Study, Event, ContentItem, EventTheme, EventGear };

/**
 * Lightweight browser-safe frontmatter parser using a vetted library.
 */
export function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (!match) return { data: Object.create(null), content };

  const yamlStr = match[1];
  const body = match[2];

  try {
    const data = parse(yamlStr);
    // Convert to null-prototype object for safety
    const safeData = Object.create(null);
    if (data && typeof data === 'object') {
      Object.assign(safeData, data);
    }
    return { data: safeData, content: body };
  } catch (e) {
    console.error('Error parsing frontmatter:', e);
    return { data: Object.create(null), content: body };
  }
}


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
          data.themeDescription ||
          data.themeColors ||
          data.themeOutfitIds ||
          data.themeAccessoryIds;

        const flatTheme: EventTheme | undefined = hasFlatTheme
          ? {
              name: String(data.themeName || ""),
              label: data.themeLabel ? String(data.themeLabel) : undefined,
              description: data.themeDescription
                ? String(data.themeDescription)
                : undefined,
              colors: asArray(data.themeColors),
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
