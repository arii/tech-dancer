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
          if (key === 'rating') data[key] = parseFloat(value);
          else data[key] = value;
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
  rating?: number;
  verdict?: string;
  priceCategory?: string;
  updatedDate?: string;
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
  studies: import.meta.glob('/content/studies/*.md', { query: '?raw' }),
  events: import.meta.glob('/content/events/*.md', { eager: true, query: '?raw' })
};

const slugFrom = (path: string) => path.split('/').pop()?.replace('.md', '') || '';

function transform<T extends { date?: string }>(modules: Record<string, string | ContentModule>): T[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const contentStr = typeof raw === 'string' ? raw : raw.default;
      const { data, content } = parseFrontmatter(contentStr);
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

// Memoization for lazy content
let memoizedStudies: Study[] | null = null;

async function fetchStudies() {
  if (memoizedStudies) return memoizedStudies;

  const studiesModules = await Promise.all(
    Object.entries(contentModules.studies).map(async ([path, loader]) => {
      const raw = await (loader as () => Promise<string | ContentModule>)();
      return [path, raw] as [string, string | ContentModule];
    })
  );

  memoizedStudies = transform<Study>(Object.fromEntries(studiesModules));
  return memoizedStudies;
}

const items = {
  posts: transform<Post>(contentModules.posts as Record<string, string | ContentModule>),
  resources: transform<Resource>(contentModules.resources as Record<string, string | ContentModule>),
  events: transform<Event>(contentModules.events as Record<string, string | ContentModule>)
};

const maps = {
  posts: new Map(items.posts.map(i => [i.slug, i])),
  resources: new Map(items.resources.map(i => [i.slug, i])),
  events: new Map(items.events.map(i => [i.slug, i]))
};

export const getPosts = () => items.posts;
export const getResources = () => items.resources;
export const getStudies = async () => await fetchStudies();
export const getEvents = () => items.events;

export const getPostBySlug = (slug: string) => maps.posts.get(slug);
export const getResourceBySlug = (slug: string) => maps.resources.get(slug);
export const getStudyBySlug = async (slug: string) => {
  const studies = await fetchStudies();
  return studies.find(s => s.slug === slug);
};
export const getEventBySlug = (slug: string) => maps.events.get(slug);

export const getAllContent = async (type: ContentType): Promise<ContentItem[]> => {
  if (type === 'studies') return await fetchStudies();
  return items[type];
};
