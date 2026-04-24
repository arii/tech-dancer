import fs from 'fs';
import path from 'path';

/**
 * Mapping of URL prefixes to their corresponding content directories.
 */
export const CONTENT_DIR_MAP = {
  '/blog': 'content/posts',
  '/gear': 'content/resources',
  '/research': 'content/studies',
} as const;

const cache = new Map<string, string[]>();

/**
 * Discovers markdown content files and returns their route-ready slugs.
 * Implements defensive checks to handle missing directories gracefully.
 * Uses a simple memoization layer to optimize repeated calls during build.
 */
export function getContentSlugs(dir: string, prefix: string): string[] {
  const cacheKey = `${dir}:${prefix}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  try {
    const fullPath = path.resolve(process.cwd(), dir);

    // Check if directory exists and is actually a directory
    const stats = fs.statSync(fullPath);
    if (!stats.isDirectory()) {
      return [];
    }

    const slugs = fs.readdirSync(fullPath)
      .filter(f => f.endsWith('.md'))
      .map(f => `${prefix}/${f.replace(/\.md$/, '')}`);

    cache.set(cacheKey, slugs);
    return slugs;
  } catch (error) {
    // Gracefully handle missing directories or permission issues
    console.warn(`[Content Loader] Skipping directory ${dir}: ${error instanceof Error ? error.message : String(error)}`);
    return [];
  }
}
