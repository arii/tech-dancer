/// <reference types="vite/client" />
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ASSET_PREFIX } from '@/config/constants';

/**
 * Lightweight browser-safe frontmatter parser.
 */
export function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content };

  const yaml = match[1];
  const body = match[2];
  const data: Record<string, unknown> = {};

  let currentRoot = data as Record<string, unknown>;
  let lastKey = '';
  let lastIndent = -1;
  const stack: { key: string; obj: Record<string, unknown>; indent: number }[] = [];

  yaml.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const indent = line.search(/\S/);

    if (trimmed.startsWith('- ')) {
      if (lastKey) {
        if (!currentRoot[lastKey] || !Array.isArray(currentRoot[lastKey])) {
          currentRoot[lastKey] = [];
        }
        let val = trimmed.slice(2).trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        else if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        currentRoot[lastKey].push(val);
      }
    } else {
      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        let value = line.slice(colonIdx + 1).trim();

        if (indent > lastIndent) {
          if (lastKey) {
            stack.push({ key: lastKey, obj: currentRoot, indent: lastIndent });
            if (!currentRoot[lastKey] || typeof currentRoot[lastKey] !== 'object' || Array.isArray(currentRoot[lastKey])) {
              currentRoot[lastKey] = {};
            }
            currentRoot = currentRoot[lastKey] as Record<string, unknown>;
          }
        } else if (indent < lastIndent) {
          while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
            const popped = stack.pop()!;
            currentRoot = popped.obj;
          }
        }

        if (value.startsWith('[') && value.endsWith(']')) {
          const inner = value.slice(1, -1).trim();
          currentRoot[key] = inner ? inner.split(',').map(v => {
            let item = v.trim();
            if (item.startsWith('"') && item.endsWith('"')) item = item.slice(1, -1);
            else if (item.startsWith("'") && item.endsWith("'")) item = item.slice(1, -1);
            return item;
          }) : [];
        } else if (value) {
          if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
          else if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);

          if (['rating', 'durability', 'value'].includes(key)) currentRoot[key] = parseFloat(value);
          else currentRoot[key] = value;
        } else {
          currentRoot[key] = undefined;
        }

        lastKey = key;
        lastIndent = indent;
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
  startDate?: string;
  earlyBirdDate?: string;
  hotelCutoffDate?: string;
  url?: string;
  whyAttending?: string;
  heroImage?: string;
  registrationDeadline?: string;
  packingReminderDate?: string;
  relatedEvents?: string[];
  theme?: {
    name?: string;
    label?: string;
    description?: string;
    image?: string;
    outfitIds?: string[];
    accessoryIds?: string[];
  };
  gear?: {
    recommendations?: string[];
    essentials?: string[];
    outfitIds?: string[];
    accessoryIds?: string[];
    shoeIds?: string[];
    essentialIds?: string[];
    travelIds?: string[];
  };
  // Flat alternatives for YAML compatibility
  themeOutfitIds?: string[];
  themeAccessoryIds?: string[];
  gearOutfitIds?: string[];
  gearAccessoryIds?: string[];
  gearShoeIds?: string[];
  gearEssentialIds?: string[];
  gearTravelIds?: string[];
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

function transform<T extends { date?: string }>(modules: Record<string, string | ContentModule>): T[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const contentStr = typeof raw === 'string' ? raw : raw.default;
      const { data, content } = parseFrontmatter(contentStr);

      const normalizeAsset = (val: unknown) => {
        if (val === "") return undefined;
        return (typeof val === 'string' && val.startsWith('/')) ? `${ASSET_PREFIX}${val}` : val;
      };

      data.image = normalizeAsset(data.image);
      data.heroImage = normalizeAsset(data.heroImage);

      if (data.theme && typeof data.theme === 'object' && !Array.isArray(data.theme)) {
        const theme = data.theme as Record<string, unknown>;
        theme.image = normalizeAsset(theme.image);
      }

      if (data.type === 'event') {
        const hasFlatTheme = data.themeOutfitIds || data.themeAccessoryIds;
        if (hasFlatTheme && (!data.theme || typeof data.theme !== 'object' || Array.isArray(data.theme))) {
          data.theme = {};
        }
        if (data.theme && typeof data.theme === 'object' && !Array.isArray(data.theme)) {
          const theme = data.theme as Record<string, unknown>;
          if (data.themeOutfitIds) theme['outfitIds'] = data.themeOutfitIds;
          if (data.themeAccessoryIds) theme['accessoryIds'] = data.themeAccessoryIds;
        }

        const hasFlatGear = data.gearOutfitIds || data.gearAccessoryIds || data.gearShoeIds || data.gearEssentialIds || data.gearTravelIds;
        if (hasFlatGear && (!data.gear || typeof data.gear !== 'object' || Array.isArray(data.gear))) {
          data.gear = {};
        }
        if (data.gear && typeof data.gear === 'object' && !Array.isArray(data.gear)) {
          const gear = data.gear as Record<string, unknown>;
          if (data.gearOutfitIds) gear['outfitIds'] = data.gearOutfitIds;
          if (data.gearAccessoryIds) gear['accessoryIds'] = data.gearAccessoryIds;
          if (data.gearShoeIds) gear['shoeIds'] = data.gearShoeIds;
          if (data.gearEssentialIds) gear['essentialIds'] = data.gearEssentialIds;
          if (data.gearTravelIds) gear['travelIds'] = data.gearTravelIds;
        }
      }

      return {
        ...data,
        title: String(data.title || 'Untitled'),
        category: String(data.category || 'General'),
        excerpt: String(data.excerpt || ''),
        date: String(data.date || ''),
        author: String(data.author || ''),
        startDate: data.startDate ? String(data.startDate) : undefined,
        earlyBirdDate: data.earlyBirdDate ? String(data.earlyBirdDate) : undefined,
        registrationDeadline: data.registrationDeadline ? String(data.registrationDeadline) : undefined,
        hotelCutoffDate: data.hotelCutoffDate ? String(data.hotelCutoffDate) : undefined,
        packingReminderDate: data.packingReminderDate ? String(data.packingReminderDate) : undefined,
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
export const getEventBySlug = (slug: string) => maps.events.get(slug);

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
