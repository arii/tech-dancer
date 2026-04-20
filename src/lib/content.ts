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

const postModules = import.meta.glob('/content/posts/*.md', { eager: true, query: '?raw' });
const resourceModules = import.meta.glob('/content/resources/*.md', { eager: true, query: '?raw' });
const studyModules = import.meta.glob('/content/studies/*.md', { eager: true, query: '?raw' });
const eventModules = import.meta.glob('/content/events/*.md', { eager: true, query: '?raw' });

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

const posts = transform<Post>(postModules);
const resources = transform<Resource>(resourceModules);
const studies = transform<Study>(studyModules);
const events = transform<Event>(eventModules);

const postsMap = new Map<string, Post>(posts.map(p => [p.slug, p]));
const resourcesMap = new Map<string, Resource>(resources.map(r => [r.slug, r]));
const studiesMap = new Map<string, Study>(studies.map(s => [s.slug, s]));
const eventsMap = new Map<string, Event>(events.map(e => [e.slug, e]));

export const getPosts = () => posts;
export const getResources = () => resources;
export const getStudies = () => studies;
export const getEvents = () => events;

export const getPostBySlug = (slug: string) => postsMap.get(slug);
export const getResourceBySlug = (slug: string) => resourcesMap.get(slug);
export const getStudyBySlug = (slug: string) => studiesMap.get(slug);
export const getEventBySlug = (slug: string) => eventsMap.get(slug);

const collectionMaps = {
  posts: postsMap,
  resources: resourcesMap,
  studies: studiesMap,
  events: eventsMap
};

export const getAllContent = (type: ContentType): ContentItem[] => {
  const map = collectionMaps[type];
  if (type === 'posts') return Array.from((map as Map<string, Post>).values());
  if (type === 'resources') return Array.from((map as Map<string, Resource>).values());
  if (type === 'studies') return Array.from((map as Map<string, Study>).values());
  return Array.from((map as Map<string, Event>).values());
};

export const getContentByTypeAndSlug = (type: ContentType, slug: string): ContentItem | undefined => {
  return collectionMaps[type].get(slug);
};
