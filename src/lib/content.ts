/// <reference types="vite/client" />
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { parse } from 'yaml';
import { ASSET_PREFIX } from '@/config/constants';
import type { Post, Resource, Study, Event, ContentItem, EventTheme, EventGear, ContentStatus } from './types/content';

export type { Post, Resource, Study, Event, ContentItem, EventTheme, EventGear, ContentStatus };

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

/**
 * Validates and normalizes content status.
 */
function normalizeStatus(val: unknown): ContentStatus | undefined {
  if (typeof val !== 'string') return undefined;
  const status = val.toLowerCase() as ContentStatus;
  return ['published', 'draft', 'planned'].includes(status) ? status : undefined;
}

/**
 * Normalizes reading time to a numeric value.
 */
function normalizeReadTime(val: unknown): number | undefined {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const parsed = parseInt(val.replace(/[^\d]/g, ''), 10);
    return isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
}

function transform<T extends { date?: string; draft?: boolean; type?: string; status?: string }>(
export function normalizeAsset(val: unknown) {
  if (val === "" || val === undefined || val === null) return undefined;
  if (typeof val !== "string") return val;
  if (val.startsWith("/") && !val.startsWith(ASSET_PREFIX)) {
    return `${ASSET_PREFIX}${val}`;
  }
  return val;
}

function transform<T extends { date?: string; draft?: boolean }>(
  modules: Record<string, string | ContentModule>,
  defaultType?: string
): T[] {
  const asArray = (val: unknown) => (Array.isArray(val) ? (val as string[]) : []);

  return Object.entries(modules)
    .map(([path, raw]) => {
      const contentStr = typeof raw === "string" ? raw : raw.default;
      const { data, content } = parseFrontmatter(contentStr);

      const type = (data.type || defaultType) as string;

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
        type,
        title: String(data.title || "Untitled"),
        category: String(data.category || "General"),
        region: (data.region && VALID_REGIONS.includes(String(data.region))) ? String(data.region) : undefined,
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
        affiliateIds: asArray(data.affiliateIds),
        internalSku: data.internalSku ? String(data.internalSku) : (data.sku ? String(data.sku) : undefined),
        priceCategory: data.priceCategory ? String(data.priceCategory) : undefined,

        // New SEO & Policy Fields
        seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
        seoDescription: data.seoDescription ? String(data.seoDescription) : undefined,
        imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
        productType: data.productType ? String(data.productType) : undefined,
        fulfillmentType: data.fulfillmentType ? String(data.fulfillmentType) : undefined,
        provider: data.provider ? String(data.provider) : undefined,
        shippingPolicySummary: data.shippingPolicySummary ? String(data.shippingPolicySummary) : undefined,
        returnPolicySummary: data.returnPolicySummary ? String(data.returnPolicySummary) : undefined,
        affiliateProvider: data.affiliateProvider ? String(data.affiliateProvider) : undefined,
        affiliateDisclosure: data.affiliateDisclosure ? String(data.affiliateDisclosure) : undefined,
        priceDisplayPolicy: data.priceDisplayPolicy ? String(data.priceDisplayPolicy) : undefined,
        availabilityDisplayPolicy: data.availabilityDisplayPolicy ? String(data.availabilityDisplayPolicy) : undefined,
        recommendedFor: asArray(data.recommendedFor),
        eventUseCase: data.eventUseCase ? String(data.eventUseCase) : undefined,
        printfulProductId: data.printfulProductId ? String(data.printfulProductId) : undefined,
        printfulVariantIds: asArray(data.printfulVariantIds),

        status: normalizeStatus(data.status),
        readTime: normalizeReadTime(data.readTime),

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
          data.gearOutfitDescription ||
          data.gearAccessoryIds ||
          data.gearAccessoryDescription ||
          data.gearShoeIds ||
          data.gearShoeDescription ||
          data.gearEssentialIds ||
          data.gearEssentialDescription ||
          data.gearTravelIds ||
          data.gearTravelDescription;

        const flatGear: EventGear | undefined = hasFlatGear
          ? {
              outfitIds: asArray(data.gearOutfitIds),
              outfitDescription: data.gearOutfitDescription ? String(data.gearOutfitDescription) : undefined,
              accessoryIds: asArray(data.gearAccessoryIds),
              accessoryDescription: data.gearAccessoryDescription ? String(data.gearAccessoryDescription) : undefined,
              shoeIds: asArray(data.gearShoeIds),
              shoeDescription: data.gearShoeDescription ? String(data.gearShoeDescription) : undefined,
              essentialIds: asArray(data.gearEssentialIds),
              essentialDescription: data.gearEssentialDescription ? String(data.gearEssentialDescription) : undefined,
              travelIds: asArray(data.gearTravelIds),
              travelDescription: data.gearTravelDescription ? String(data.gearTravelDescription) : undefined,
            }
          : undefined;

        // Normalize nested theme if present
        const nestedTheme = data.theme as Record<string, unknown> | undefined;
        const normalizedNestedTheme: EventTheme | undefined = nestedTheme
          ? {
              name: String(nestedTheme.name || ""),
              label: nestedTheme.label ? String(nestedTheme.label) : undefined,
              description: nestedTheme.description ? String(nestedTheme.description) : undefined,
              colors: asArray(nestedTheme.colors),
              outfitIds: asArray(nestedTheme.outfitIds),
              accessoryIds: asArray(nestedTheme.accessoryIds),
            }
          : undefined;

        // Normalize nested gear if present
        const nestedGear = data.gear as Record<string, unknown> | undefined;
        const normalizedNestedGear: EventGear | undefined = nestedGear
          ? {
              outfitIds: asArray(nestedGear.outfitIds),
              outfitDescription: nestedGear.outfitDescription ? String(nestedGear.outfitDescription) : undefined,
              accessoryIds: asArray(nestedGear.accessoryIds),
              accessoryDescription: nestedGear.accessoryDescription ? String(nestedGear.accessoryDescription) : undefined,
              shoeIds: asArray(nestedGear.shoeIds),
              shoeDescription: nestedGear.shoeDescription ? String(nestedGear.shoeDescription) : undefined,
              essentialIds: asArray(nestedGear.essentialIds),
              essentialDescription: nestedGear.essentialDescription ? String(nestedGear.essentialDescription) : undefined,
              travelIds: asArray(nestedGear.travelIds),
              travelDescription: nestedGear.travelDescription ? String(nestedGear.travelDescription) : undefined,
            }
          : undefined;

        result.theme = normalizedNestedTheme ?? flatTheme;
        result.gear = normalizedNestedGear ?? flatGear;
        result.relatedEvents = asArray(data.relatedEvents);
      }

      return result as unknown as T;
    })
    .filter((item) => {
      // Allow draft studies so they can be shown as "Planned" or "Coming Soon" cards
      // on the Research page without being indexed as full articles.
      if (item.draft) {
        return item.type === 'study' && (item.status === 'planned' || item.status === 'draft');
      }
      return true;
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
  posts: transform<Post>(contentModules.posts as Record<string, string | ContentModule>, 'post'),
  resources: transform<Resource>(contentModules.resources as Record<string, string | ContentModule>, 'resource'),
  studies: transform<Study>(contentModules.studies as Record<string, string | ContentModule>, 'study'),
  events: transform<Event>(contentModules.events as Record<string, string | ContentModule>, 'event')
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
