/// <reference types="vite/client" />
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Local polyfill for Buffer to ensure gray-matter works during eager loading
if (typeof window !== 'undefined') {
  (window as any).Buffer = (window as any).Buffer || Buffer;
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

const contentModules: Record<ContentType, Record<string, any>> = {
  posts: import.meta.glob('/content/posts/*.md', { eager: true, query: '?raw' }),
  resources: import.meta.glob('/content/resources/*.md', { eager: true, query: '?raw' }),
  studies: import.meta.glob('/content/studies/*.md', { eager: true, query: '?raw' }),
  events: import.meta.glob('/content/events/*.md', { eager: true, query: '?raw' })
};

const slugFrom = (path: string) => path.split('/').pop()?.replace('.md', '') || '';

function transform<T>(modules: Record<string, any>): T[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const contentStr = typeof raw === 'string' ? raw : (raw as any).default;
      const { data, content } = matter(contentStr);
      return { 
        ...data, 
        content, 
        slug: slugFrom(path) 
      } as unknown as T;
    })
    .sort((a: any, b: any) => {
      if (a.date && b.date) return +new Date(b.date) - +new Date(a.date);
      return 0;
    });
}

const registry = (Object.keys(contentModules) as ContentType[]).reduce((acc, type) => {
  const items = transform<ContentItem>(contentModules[type]);
  acc.items[type] = items;
  acc.maps[type] = new Map(items.map(i => [i.slug, i]));
  return acc;
}, { items: {} as Record<ContentType, ContentItem[]>, maps: {} as Record<ContentType, Map<string, ContentItem>> });

export const getPosts = () => registry.items.posts as Post[];
export const getResources = () => registry.items.resources as Resource[];
export const getStudies = () => registry.items.studies as Study[];
export const getEvents = () => registry.items.events as Event[];

export const getPostBySlug = (slug: string) => registry.maps.posts.get(slug) as Post | undefined;
export const getResourceBySlug = (slug: string) => registry.maps.resources.get(slug) as Resource | undefined;
export const getStudyBySlug = (slug: string) => registry.maps.studies.get(slug) as Study | undefined;
export const getEventBySlug = (slug: string) => registry.maps.events.get(slug) as Event | undefined;

export const getAllContent = (type: ContentType) => registry.items[type];
