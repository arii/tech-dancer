/// <reference types="vite/client" />
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { parseFrontmatter } from './frontmatter';
import { normalizeAsset, normalizeStatus } from './assets';
import { normalizeReadTime } from './utils';
import type { Post, Resource } from '../types/content';

interface ContentModule {
  default: string;
}

const contentModules = {
  posts: import.meta.glob('/content/posts/*.md', { eager: true, query: '?raw' }),
  blogs: import.meta.glob('/content/blog/*.md', { eager: true, query: '?raw' }),
  resources: import.meta.glob('/content/resources/*.md', { eager: true, query: '?raw' }),
};

const slugFrom = (path: string) => path.split('/').pop()?.replace('.md', '') || '';

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
        imagePosition: (data.imagePosition === 'top' || data.imagePosition === 'bottom' || data.imagePosition === 'center') ? data.imagePosition : undefined,
        unlisted: Boolean(data.unlisted),

        status: normalizeStatus(data.status),
        readTime: normalizeReadTime(data.readTime),

        content: content || "",
        slug: slugFrom(path),
      };

      return result as unknown as T;
    })
    .filter((item) => {
      // Filter out posts explicitly marked as unlisted
      if (typeof item === 'object' && item !== null && 'unlisted' in item && item.unlisted === true) {
        return false;
      }

      // Hide drafts: retired-study "Planned" cards no longer exist.
      if (typeof item === 'object' && item !== null && 'draft' in item && item.draft === true) {
        return false;
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

let _itemsCache: { posts: Post[]; resources: Resource[] } | null = null;
let _mapsCache: { posts: Map<string, Post>; resources: Map<string, Resource> } | null = null;

function getItemsCache() {
  if (!_itemsCache) {
    _itemsCache = {
      posts: transform<Post>({ ...contentModules.posts, ...contentModules.blogs } as Record<string, string | ContentModule>, 'post'),
      resources: transform<Resource>(contentModules.resources as Record<string, string | ContentModule>, 'resource'),
    };
  }
  return _itemsCache;
}

function getMapsCache() {
  if (!_mapsCache) {
    const items = getItemsCache();
    _mapsCache = {
      posts: new Map(items.posts.map(i => [i.slug, i])),
      resources: new Map(items.resources.map(i => [i.slug, i])),
    };
  }
  return _mapsCache;
}

export const getPosts = () => getItemsCache().posts;

export const getPostBySlug = (slug: string) => getMapsCache().posts.get(slug);

export const getResources = () => getItemsCache().resources;

export const getResourceBySlug = (slug: string) => getMapsCache().resources.get(slug);
