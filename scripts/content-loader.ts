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

/**
 * Discovers markdown content files and returns their route-ready slugs.
 * Implements defensive checks to handle missing directories gracefully.
 */
export function getContentSlugs(dir: string, prefix: string): string[] {
  try {
    const fullPath = path.resolve(process.cwd(), dir);

    // Check if directory exists and is actually a directory
    const stats = fs.statSync(fullPath);
    if (!stats.isDirectory()) {
      return [];
    }

    return fs.readdirSync(fullPath)
      .filter(f => f.endsWith('.md'))
      .map(f => `${prefix}/${f.replace(/\.md$/, '')}`);
  } catch (error) {
    // Gracefully handle missing directories or permission issues
    console.warn(`[Content Loader] Skipping directory ${dir}: ${error instanceof Error ? error.message : String(error)}`);
    return [];
  }
}
