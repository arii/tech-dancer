/// <reference types="vite/client" />
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { parse } from 'yaml';
import { ASSET_PREFIX } from '@/config/constants';
import type { Post, Resource, Study, ContentItem, ContentStatus } from './types/content';

export type { Post, Resource, Study, ContentItem, ContentStatus };

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
    // Note: The `yaml` library internally mitigates prototype pollution.
    // Downstream spreading `{ ...data }` also negates null-prototype safety.
    return { data: (data && typeof data === 'object') ? data : {}, content: body };
  } catch (e) {
    console.error('Error parsing frontmatter:', e);
    return { data: {}, content: body };
  }
}


interface ContentModule {
  default: string;
}

const contentModules = {
  posts: import.meta.glob('/content/posts/*.md', { eager: true, query: '?raw' }),
  blogs: import.meta.glob('/content/blog/*.md', { eager: true, query: '?raw' }),
  studies: import.meta.glob('/content/studies/*.md', { eager: true, query: '?raw' }),
  resources: import.meta.glob('/content/resources/*.md', { eager: true, query: '?raw' }),
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

      const result: Record<string, unknown> = {
        ...data,
        type,
        title: String(data.title || "Untitled"),
        category: String(data.category || "General"),
        excerpt: String(data.excerpt || data.description || ""),
        date: String(data.date || ""),
        author: String(data.author || "Ariel Anders").replace(/,?\s*PhD/i, "").trim(),
        tags: asArray(data.tags),
        affiliateIds: asArray(data.affiliateIds),

        // New SEO & Policy Fields
        seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
        seoDescription: data.seoDescription ? String(data.seoDescription) : undefined,
        imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
        imageFit: (data.imageFit === 'cover' || data.imageFit === 'contain') ? data.imageFit : undefined,

        status: normalizeStatus(data.status),
        readTime: normalizeReadTime(data.readTime),

        content: content || "",
        slug: slugFrom(path),
      };

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
  posts: transform<Post>({ ...contentModules.posts, ...contentModules.blogs } as Record<string, string | ContentModule>, 'post'),
  studies: transform<Study>(contentModules.studies as Record<string, string | ContentModule>, 'study'),
  resources: transform<Resource>(contentModules.resources as Record<string, string | ContentModule>, 'resource'),
};

const maps = {
  posts: new Map(items.posts.map(i => [i.slug, i])),
  studies: new Map(items.studies.map(i => [i.slug, i])),
  resources: new Map(items.resources.map(i => [i.slug, i])),
};

export const getPosts = () => items.posts;
export const getStudies = () => items.studies;

export const getPostBySlug = (slug: string) => maps.posts.get(slug);

export const getResources = () => items.resources;

export const getResourceBySlug = (slug: string) => maps.resources.get(slug);

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
