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

const registry = {
  posts: transform<Post>(contentModules.posts),
  resources: transform<Resource>(contentModules.resources),
  studies: transform<Study>(contentModules.studies),
  events: transform<Event>(contentModules.events)
};

const contentMaps = {
  posts: new Map<string, Post>(registry.posts.map(p => [p.slug, p])),
  resources: new Map<string, Resource>(registry.resources.map(r => [r.slug, r])),
  studies: new Map<string, Study>(registry.studies.map(s => [s.slug, s])),
  events: new Map<string, Event>(registry.events.map(e => [e.slug, e]))
};

export const getPosts = () => registry.posts;
export const getResources = () => registry.resources;
export const getStudies = () => registry.studies;
export const getEvents = () => registry.events;

export const getPostBySlug = (slug: string) => contentMaps.posts.get(slug);
export const getResourceBySlug = (slug: string) => contentMaps.resources.get(slug);
export const getStudyBySlug = (slug: string) => contentMaps.studies.get(slug);
export const getEventBySlug = (slug: string) => contentMaps.events.get(slug);

export const getAllContent = (type: ContentType): ContentItem[] => registry[type];
