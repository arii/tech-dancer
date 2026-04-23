import fs from 'fs';
import path from 'path';

export const CONTENT_DIR_MAP: Record<string, string> = {
  '/blog': 'posts',
  '/gear': 'resources',
  '/research': 'studies'
};

export function getContentSlugs(dirName: string, prefix: string): string[] {
  // __dirname in Node context inside scripts/ resolves to the scripts directory, so we need to go up one level
  const fullPath = path.resolve(__dirname, '../content', dirName);
  try {
    if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isDirectory()) return [];
    return fs.readdirSync(fullPath)
      .filter(f => f.endsWith('.md'))
      .map(f => `${prefix === '/' ? '' : prefix}/${f.replace(/\.md$/, '')}`);
  } catch (err) {
    console.warn(`Warning: Could not read content directory ${fullPath}`, err);
    return [];
  }
}
