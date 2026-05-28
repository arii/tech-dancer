/// <reference types="vite/client" />
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { parse } from 'yaml';
import { ASSET_PREFIX } from '@/config/constants';
import type { Post, Resource, Study, Event, ContentItem } from './types/content';

export type { Post, Resource, Study, Event, ContentItem };

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

export function _transform<T extends { date?: string; draft?: boolean }>(
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
      data.imageBack = normalizeAsset(data.imageBack);
      data.heroImage = normalizeAsset(data.heroImage);

      const VALID_REGIONS = ['NorCal', 'SoCal', 'Southwest', 'Pacific Northwest', 'South', 'International', 'Other'];

      const result: Record<string, unknown> = {
        ...data,
        title: String(data.title || "Untitled"),
        category: String(data.category || "General"),
        region: (data.region && VALID_REGIONS.includes(String(data.region))) ? String(data.region) : undefined,
        excerpt: String(data.excerpt || ""),
        date: String(data.date || ""),
        author: String(data.author || ""),
        startDate: data.startDate ? String(data.startDate) : undefined,
        earlyBirdDate: data.earlyBirdDate ? String(data.earlyBirdDate) : undefined,
        registrationDeadline: data.registrationDeadline ? String(data.registrationDeadline) : undefined,
        hotelCutoffDate: data.hotelCutoffDate ? String(data.hotelCutoffDate) : undefined,
        packingReminderDate: data.packingReminderDate ? String(data.packingReminderDate) : undefined,
        tags: asArray(data.tags),
        affiliateIds: asArray(data.affiliateIds),
        content: content || "",
        slug: slugFrom(path),
      };

      if (data.type === "event") {
        const getString = (nestedVal: unknown, flatVal: unknown) => {
          const value = nestedVal ?? flatVal;
          return value == null || value === "" ? undefined : String(value);
        };

        const nestedTheme = data.theme as Record<string, unknown> | undefined;
        result.themeName = getString(nestedTheme?.name, data.themeName);
        result.themeLabel = getString(nestedTheme?.label, data.themeLabel);
        result.themeDescription = getString(nestedTheme?.description, data.themeDescription);
        result.themeColors = asArray(nestedTheme?.colors || data.themeColors);
        result.themeOutfitIds = asArray(nestedTheme?.outfitIds || data.themeOutfitIds);
        result.themeAccessoryIds = asArray(nestedTheme?.accessoryIds || data.themeAccessoryIds);

        const nestedGear = data.gear as Record<string, unknown> | undefined;
        const gearTypes = ['Outfit', 'Accessory', 'Shoe', 'Essential', 'Travel'];

        gearTypes.forEach(type => {
          const lowerType = type.toLowerCase();
          result[`gear${type}Ids`] = asArray(nestedGear?.[`${lowerType}Ids`] || data[`gear${type}Ids`]);
          result[`gear${type}Description`] = getString(nestedGear?.[`${lowerType}Description`], data[`gear${type}Description`]);
        });

        result.relatedEvents = asArray(data.relatedEvents);

        delete result.theme;
        delete result.gear;
      }

      return result as unknown as T;
    })
    .filter((item) => !item.draft)
    .sort((a, b) => {
      const timeA = a.date ? new Date(a.date).getTime() : 0;
      const timeB = b.date ? new Date(b.date).getTime() : 0;

      const safeA = Number.isNaN(timeA) ? 0 : timeA;
      const safeB = Number.isNaN(timeB) ? 0 : timeB;

      return safeB - safeA;
    });
}

const items = {
  posts: _transform<Post>(contentModules.posts as Record<string, string | ContentModule>),
  resources: _transform<Resource>(contentModules.resources as Record<string, string | ContentModule>),
  studies: _transform<Study>(contentModules.studies as Record<string, string | ContentModule>),
  events: _transform<Event>(contentModules.events as Record<string, string | ContentModule>)
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
