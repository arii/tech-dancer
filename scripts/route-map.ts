import fs from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';
import { IMPACT_CONFIG } from './impact-analysis.config';
import { exec } from './impact-analysis';

/**
 * Parses the sitemap.xml to get a list of valid URLs.
 */
function getSitemapUrls(): string[] {
  try {
    let sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
      sitemapPath = path.join(process.cwd(), 'dist', 'sitemap.xml');
    }

    if (fs.existsSync(sitemapPath)) {
      const xml = fs.readFileSync(sitemapPath, 'utf8');
      const parser = new XMLParser();
      const jsonObj = parser.parse(xml);

      if (jsonObj?.urlset?.url) {
        const urls = Array.isArray(jsonObj.urlset.url) ? jsonObj.urlset.url : [jsonObj.urlset.url];
        return urls
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((u: any) => u.loc)
          .filter(Boolean)
          .map((u: string) => {
            try {
              return new URL(u).pathname;
            } catch {
              return u;
            }
          });
      }
    }
  } catch {
    console.warn('⚠️ Could not parse sitemap.xml, falling back to simple mapping.');
  }
  return [];
}

const sitemapUrls = getSitemapUrls();

/**
 * Maps page component files to public URLs.
 * Cross-references with sitemap.xml if available.
 */
export function mapPageToUrl(filePath: string): string {
  const fileName = path.basename(filePath, path.extname(filePath));

  let route = '';
  if (IMPACT_CONFIG.PAGE_ROUTE_OVERRIDES[fileName]) {
    route = IMPACT_CONFIG.PAGE_ROUTE_OVERRIDES[fileName];
  } else {
    // Convert PascalCase to kebab-case
    route = '/' + fileName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  // If we have sitemap URLs, try to find an exact match or a match that handles trailing slashes
  if (sitemapUrls.length > 0) {
     const match = sitemapUrls.find(u => u === route || u === `${route}/`);
     if (match) return match;

     // For dynamic routes like /blog/:slug, we just return the generic route
     // as it's hard to map a component to a specific dynamic instance without more context
  }

  return route;
}

/**
 * Handles content changes and maps them to URLs.
 */
export function getContentAffectedUrls(changedFiles: string[]): string[] {
  const urls: string[] = [];

  for (const file of changedFiles) {
    for (const [dir, prefix] of Object.entries(IMPACT_CONFIG.CONTENT_MAP)) {
      if (file.startsWith(dir) && file.endsWith('.md')) {
        const slug = path.basename(file, '.md');
        urls.push(`${prefix}${slug}`);
      }
    }
  }

  return urls;
}

/**
 * Find affected markdown files when public static files (e.g. images) are changed.
 */
export function getAffectedUrlsByPublicFiles(changedFiles: string[]): string[] {
  const urls: Set<string> = new Set();
  const publicFiles = changedFiles.filter(f => f.startsWith('public/'));

  if (publicFiles.length === 0) return [];

  const searchStrings = publicFiles.map(f => f.replace(/^public/, ''));

  for (const [dir, prefix] of Object.entries(IMPACT_CONFIG.CONTENT_MAP)) {
    const mdFiles = exec(`find ${dir} -name "*.md"`).split('\n').filter(Boolean);

    for (const mdFile of mdFiles) {
      const content = fs.readFileSync(mdFile, 'utf-8');
      for (const searchStr of searchStrings) {
        if (content.includes(searchStr)) {
          const slug = path.basename(mdFile, '.md');
          urls.add(`${prefix}${slug}`);
          urls.add(prefix.replace(/\/$/, '')); // Add index page
        }
      }
    }
  }
  return Array.from(urls);
}
