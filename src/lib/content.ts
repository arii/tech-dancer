/// <reference types="vite/client" />
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Local polyfill for Buffer to ensure gray-matter works during eager loading
if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || Buffer;
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

const postsMap = new Map(posts.map(p => [p.slug, p]));
const resourcesMap = new Map(resources.map(r => [r.slug, r]));
const studiesMap = new Map(studies.map(s => [s.slug, s]));
const eventsMap = new Map(events.map(e => [e.slug, e]));

export function getPosts(): Post[] { return posts; }
export function getResources(): Resource[] { return resources; }
export function getStudies(): Study[] { return studies; }
export function getEvents(): Event[] { return events; }

export function getPostBySlug(slug: string): Post | undefined { return postsMap.get(slug); }
export function getResourceBySlug(slug: string): Resource | undefined { return resourcesMap.get(slug); }
export function getStudyBySlug(slug: string): Study | undefined { return studiesMap.get(slug); }
export function getEventBySlug(slug: string): Event | undefined { return eventsMap.get(slug); }

const contentTypeMap: Record<ContentType, () => ContentItem[]> = {
  posts: getPosts,
  resources: getResources,
  studies: getStudies,
  events: getEvents
};

export function getAllContent(type: ContentType): ContentItem[] {
  return contentTypeMap[type]();
}
