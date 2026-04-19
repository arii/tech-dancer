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

export type ContentType = 'posts' | 'resources' | 'studies';

// --- Glob Loaders ---

const postModules = import.meta.glob('/content/posts/*.md', { eager: true, query: '?raw' });
const resourceModules = import.meta.glob('/content/resources/*.md', { eager: true, query: '?raw' });
const studyModules = import.meta.glob('/content/studies/*.md', { eager: true, query: '?raw' });

const slugFrom = (path: string) => path.split('/').pop()?.replace('.md', '') || '';

function transform<T>(modules: Record<string, any>): T[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const contentStr = typeof raw === 'string' ? raw : raw.default;
      const { data, content } = matter(contentStr);
      return { 
        ...data, 
        content, 
        slug: slugFrom(path) 
      } as unknown as T;
    })
    .sort((a: any, b: any) => +new Date(b.date) - +new Date(a.date));
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

/**
 * Legacy support for ContentItem usage during migration
 */
export type ContentItem = Post | Resource | Study;
export function getAllContent(type: 'posts' | 'resources' | 'studies'): ContentItem[] {
  if (type === 'posts') return getPosts();
  if (type === 'resources') return getResources();
  return getStudies();
}
