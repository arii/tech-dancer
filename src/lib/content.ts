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
  const data: Record<string, any> = {};

  yaml.split('\n').forEach(line => {
    const [key, ...vals] = line.split(':');
    if (key && vals.length) {
      const parsedKey = key.trim();
      let value = vals.join(':').trim();
      // Handle arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        const inner = value.slice(1, -1).trim();
        if (inner.length === 0) {
          data[parsedKey] = [];
        } else {
          data[parsedKey] = inner.split(',').map(v => {
            let item = v.trim();
            if (item.startsWith('"') && item.endsWith('"')) item = item.slice(1, -1);
            else if (item.startsWith("'") && item.endsWith("'")) item = item.slice(1, -1);
            return item;
          });
        }
      } else {
        // Basic type conversion for strings
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        else if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);

        if (value.includes(',')) {
          data[parsedKey] = value.split(',').map(v => v.trim());
        } else {
          data[parsedKey] = value;
        }
      }
    }
  });

  return { data, content: body };
}

export interface Post {
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
}

export interface Resource {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  image?: string;
  tags?: string[];
  affiliateIds?: string[];
}

export interface Study {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  tags?: string[];
  author?: string;
}

export interface Event {
  slug: string;
  title: string;
  location: string;
  city: string;
  schedule: string;
  description: string;
  link?: string;
  content: string;
}

export type ContentType = 'posts' | 'resources' | 'studies' | 'events';
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

function transform<T extends { date?: string }>(modules: Record<string, string | ContentModule>): T[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const contentStr = typeof raw === 'string' ? raw : raw.default;
      const { data, content } = parseFrontmatter(contentStr);
      return { ...data, content, slug: slugFrom(path) } as unknown as T;
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
  posts: transform<Post>(contentModules.posts),
  resources: transform<Resource>(contentModules.resources),
  studies: transform<Study>(contentModules.studies),
  events: transform<Event>(contentModules.events)
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
export const getStudyBySlug = (slug: string) => maps.studies.get(slug);
export const getEventBySlug = (slug: string) => maps.events.get(slug);

export const getAllContent = (type: ContentType): ContentItem[] => items[type];
