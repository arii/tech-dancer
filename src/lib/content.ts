/// <reference types="vite/client" />
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Lightweight browser-safe frontmatter parser.
 */
function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content };

  const yaml = match[1];
  const body = match[2];
  const data: Record<string, string | number | string[] | undefined> = {};

  let currentKey = '';
  yaml.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (line.startsWith('  - ')) {
      // List item
      if (currentKey) {
        if (!Array.isArray(data[currentKey])) data[currentKey] = [];
        let val = trimmed.replace(/^- /, '').trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        else if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        data[currentKey].push(val);
      }
    } else {
      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        let value = line.slice(colonIdx + 1).trim();
        currentKey = key;

        if (value.startsWith('[') && value.endsWith(']')) {
          const inner = value.slice(1, -1).trim();
          data[key] = inner ? inner.split(',').map(v => {
            let item = v.trim();
            if (item.startsWith('"') && item.endsWith('"')) item = item.slice(1, -1);
            else if (item.startsWith("'") && item.endsWith("'")) item = item.slice(1, -1);
            return item;
          }) : [];
        } else if (value) {
          if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
          else if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);

          // Basic numeric conversion for rating
          if (['rating', 'durability', 'value'].includes(key)) data[key] = parseFloat(value);
          else data[key] = value;
        }
      }
    }
  });

  return { data, content: body };
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

export interface Event {
  type: 'event';
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
}

export type ContentItem = Post | Resource | Study | Event;

interface ContentModule {
  default: string;
}

const slugFrom = (path: string) => path.split('/').pop()?.replace('.md', '') || '';

function transform<T extends { date?: string }>(modules: Record<string, string | ContentModule>): T[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const contentStr = typeof raw === 'string' ? raw : raw.default;
      const { data, content } = parseFrontmatter(contentStr);

      if (data.image === "") {
        data.image = undefined;
      }

      return {
        ...data,
        title: String(data.title || 'Untitled'),
        category: String(data.category || 'General'),
        excerpt: String(data.excerpt || ''),
        date: String(data.date || ''),
        author: String(data.author || ''),
        tags: Array.isArray(data.tags) ? data.tags : [],
        content: content || '',
        slug: slugFrom(path)
      } as unknown as T;
    })
    .sort((a, b) => {
      const timeA = a.date ? new Date(a.date).getTime() : 0;
      const timeB = b.date ? new Date(b.date).getTime() : 0;

      const safeA = Number.isNaN(timeA) ? 0 : timeA;
      const safeB = Number.isNaN(timeB) ? 0 : timeB;

      return safeB - safeA;
    });
}

// Lazy initialization to prevent module evaluation crashes in non-Vite environments
let cache: {
  items: { posts: Post[], resources: Resource[], studies: Study[], events: Event[] },
  maps: { posts: Map<string, Post>, resources: Map<string, Resource>, studies: Map<string, Study>, events: Map<string, Event> }
} | null = null;

function getCache() {
  if (!cache) {
    const posts = typeof import.meta.glob === 'function' ? import.meta.glob('/content/posts/*.md', { eager: true, query: '?raw' }) : {};
    const resources = typeof import.meta.glob === 'function' ? import.meta.glob('/content/resources/*.md', { eager: true, query: '?raw' }) : {};
    const studies = typeof import.meta.glob === 'function' ? import.meta.glob('/content/studies/*.md', { eager: true, query: '?raw' }) : {};
    const events = typeof import.meta.glob === 'function' ? import.meta.glob('/content/events/*.md', { eager: true, query: '?raw' }) : {};

    const items = {
      posts: transform<Post>(posts as any),
      resources: transform<Resource>(resources as any),
      studies: transform<Study>(studies as any),
      events: transform<Event>(events as any)
    };

    const maps = {
      posts: new Map(items.posts.map(i => [i.slug, i])),
      resources: new Map(items.resources.map(i => [i.slug, i])),
      studies: new Map(items.studies.map(i => [i.slug, i])),
      events: new Map(items.events.map(i => [i.slug, i]))
    };

    cache = { items, maps };
  }
  return cache;
}

export const getPosts = () => getCache().items.posts;
export const getResources = () => getCache().items.resources;
export const getStudies = () => getCache().items.studies;
export const getEvents = () => getCache().items.events;

export const getPostBySlug = (slug: string) => getCache().maps.posts.get(slug);
export const getResourceBySlug = (slug: string) => getCache().maps.resources.get(slug);

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
