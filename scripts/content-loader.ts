import fs from 'fs';
import path from 'path';

/**
 * Mapping of URL prefixes to their corresponding content directories.
 */
export const CONTENT_DIR_MAP = {
  '/blog': 'content/posts',
  '/blog-internal': 'content/blog',
  '/gear': 'content/resources',
  '/research': 'content/studies',
} as const;

export interface ContentItem {
  slug: string;
  lastmod: string;
}

const cache = new Map<string, ContentItem[]>();

/**
 * Discovers markdown content files and returns their route-ready slugs with last modified dates.
 * Implements defensive checks to handle missing directories gracefully.
 * Uses a simple memoization layer to optimize repeated calls during build.
 */
export function getContentSlugs(dir: string, prefix: string): ContentItem[] {
  const cacheKey = `${dir}:${prefix}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  try {
    const fullPath = path.resolve(process.cwd(), dir);

    // Check if directory exists and is actually a directory
    const dirStats = fs.statSync(fullPath);
    if (!dirStats.isDirectory()) {
      return [];
    }

    const items = fs.readdirSync(fullPath)
      .filter(f => f.endsWith('.md'))
      .map(f => {
        const filePath = path.join(fullPath, f);
        const stats = fs.statSync(filePath);
        let lastmod = stats.mtime.toISOString();

        // Attempt to get date from frontmatter for more stable lastmod
        try {
          const content = fs.readFileSync(filePath, 'utf-8');

          // Skip draft items
          const draftMatch = content.match(/^draft:\s*(true|false)/m);
          if (draftMatch?.[1] === 'true') {
            return null;
          }

          const dateMatch = content.match(/^date:\s*["']?([^"'\n]+)["']?/m);
          if (dateMatch?.[1]) {
            const date = new Date(dateMatch[1]);
            if (!isNaN(date.getTime())) {
              lastmod = date.toISOString();
            }
          }
        } catch {
          // Fallback to mtime if parsing fails
        }

        return {
          slug: `${prefix}/${f.replace(/\.md$/, '')}`,
          lastmod
        };
      })
      .filter((item): item is ContentItem => item !== null);

    cache.set(cacheKey, items);
    return items;
  } catch (error) {
    // Gracefully handle missing directories or permission issues
    console.warn(`[Content Loader] Skipping directory ${dir}: ${error instanceof Error ? error.message : String(error)}`);
    return [];
  }
}
