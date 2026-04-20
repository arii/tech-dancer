/// <reference types="vite/client" />
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import matter from 'gray-matter';

// --- Typed Interfaces ---

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

// --- Glob Loaders ---

const postModules = import.meta.glob('/content/posts/*.{md,mdx}', { eager: true, query: '?raw', import: 'default' });
const resourceModules = import.meta.glob('/content/resources/*.{md,mdx}', { eager: true, query: '?raw', import: 'default' });
const studyModules = import.meta.glob('/content/studies/*.{md,mdx}', { eager: true, query: '?raw', import: 'default' });
const eventModules = import.meta.glob('/content/events/*.{md,mdx}', { eager: true, query: '?raw', import: 'default' });

const slugFrom = (path: string) => path.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';

function transform<T>(modules: Record<string, any>): T[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const contentStr = typeof raw === 'string' ? raw : (raw as any).default;
      if (!contentStr || typeof contentStr !== 'string') {
        return null;
      }
      const { data, content } = matter(contentStr);
      return { 
        ...data, 
        content, 
        slug: slugFrom(path) 
      } as unknown as T;
    })
    .filter((item): item is T => item !== null)
    .sort((a: any, b: any) => {
      if (a.date && b.date) return +new Date(b.date) - +new Date(a.date);
      return 0;
    });
}

// --- Public API ---

export function getPosts(): Post[] {
  return transform<Post>(postModules);
}

export function getResources(): Resource[] {
  return transform<Resource>(resourceModules);
}

export function getStudies(): Study[] {
  return transform<Study>(studyModules);
}

export function getEvents(): Event[] {
  return transform<Event>(eventModules);
}

// --- JSON Content Helpers ---

const navigationContent = import.meta.glob('/content/navigation.json', { eager: true });
const footerContent = import.meta.glob('/content/footer.json', { eager: true });
const homeContent = import.meta.glob('/content/home.json', { eager: true });

export function getNavigation() {
  const data = Object.values(navigationContent)[0] as any;
  return data.default || data;
}

export function getFooter() {
  const data = Object.values(footerContent)[0] as any;
  return data.default || data;
}

export function getHome() {
  const data = Object.values(homeContent)[0] as any;
  return data.default || data;
}

/**
 * Legacy support for ContentItem usage during migration
 */
export type ContentItem = Post | Resource | Study | Event;
export function getAllContent(type: ContentType): ContentItem[] {
  if (type === 'posts') return getPosts();
  if (type === 'resources') return getResources();
  if (type === 'studies') return getStudies();
  return getEvents();
}
