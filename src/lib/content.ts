/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="vite/client" />
import { Buffer } from 'buffer';
if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || Buffer;
}
import matter from 'gray-matter';

export interface ContentMetadata {
  type: 'post' | 'resource' | 'study';
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  image?: string;
  tags?: string[];
  affiliateIds?: string[];
  slug: string;
}

export interface ContentItem extends ContentMetadata {
  content: string;
}

export function getAllContent(type: 'posts' | 'resources' | 'studies'): ContentItem[] {
  let files: Record<string, string>;

  if (type === 'posts') {
    files = import.meta.glob('/content/posts/*.md', { eager: true, query: '?raw' }) as Record<string, string>;
  } else if (type === 'resources') {
    files = import.meta.glob('/content/resources/*.md', { eager: true, query: '?raw' }) as Record<string, string>;
  } else {
    files = import.meta.glob('/content/studies/*.md', { eager: true, query: '?raw' }) as Record<string, string>;
  }

  return Object.entries(files).map(([path, raw]) => {
    // raw might be the default export if using Vite raw loader
    const contentStr = typeof raw === 'string' ? raw : (raw as any).default;
    const { data, content } = matter(contentStr);
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    return {
      ...(data as ContentMetadata),
      content,
      slug,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
