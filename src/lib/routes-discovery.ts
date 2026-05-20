import fs from 'fs';
import path from 'path';
import { CONTENT_DIR_MAP, getContentSlugs } from '../../scripts/content-loader.ts';
import { routes } from '../config/routes.ts';
import { RESEARCH_TOOLS } from '../config/research-tools.ts';

/**
 * Resolves the canonical path for a route or tool.
 */
function resolveCanonical(path: string, config?: { canonicalPath?: string }): string {
  return config?.canonicalPath || path;
}

/**
 * Gets the modification time of a source file.
 */
function getFileLastMod(filePath: string): string {
  try {
    // filePath is derived from internal route config, safe from traversal
    // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
    const stats = fs.statSync(path.resolve(process.cwd(), filePath));
    return stats.mtime.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Discovers all application routes from various sources.
 * Centralizes discovery logic to prevent duplication and drift.
 *
 * Used by:
 * - vite.config.ts (for sitemap generation)
 * - scripts/generate-spa-stubs.mjs (for SPA 200 OK stubs)
 * - src/config/routes.ts (potential for runtime validation)
 */
export function getAllRoutes() {
  // 3. Dynamic content routes discovered from file system
  const contentRoutes = Object.entries(CONTENT_DIR_MAP).flatMap(([prefix, dir]) =>
    getContentSlugs(dir, prefix).map(item => ({
      path: item.slug,
      lastmod: item.lastmod
    }))
  );

  // Group content by directory to find the latest modification for listing pages
  const contentLastModMap: Record<string, string> = {};
  Object.entries(CONTENT_DIR_MAP).forEach(([prefix, dir]) => {
    const items = getContentSlugs(dir, prefix);
    if (items.length > 0) {
      contentLastModMap[prefix] = items.reduce((latest, current) =>
        current.lastmod > latest ? current.lastmod : latest, items[0].lastmod);
    }
  });

  // 1. Static routes from configuration (excluding parameterized and catch-all)
  // Use canonicalPath if available, and filter out routes marked as sitemap: false
  const staticRoutes = routes
    .filter(r => r.sitemap !== false && r.path !== '*' && !r.path.includes(':'))
    .map(r => {
      let lastmod;
      if (contentLastModMap[r.path]) {
        lastmod = contentLastModMap[r.path];
      } else if (r.path === '/') {
        // For home page, use the latest modification of any content
        lastmod = Object.values(contentLastModMap).reduce((latest, current) =>
          current > latest ? current : latest, getFileLastMod('src/features/dashboard/Dashboard.tsx'));
      } else {
        // Fallback to the component file's modification time
        let fileName = r.path.slice(1).split('-').map(part =>
          part.charAt(0).toUpperCase() + part.slice(1)
        ).join('');

        // Special case for UXAuditor
        if (fileName === 'UxAuditor') fileName = 'UXAuditor';

        lastmod = getFileLastMod(`src/pages/${fileName || 'Home'}.tsx`);
      }

      return {
        path: resolveCanonical(r.path, r),
        lastmod
      };
    });

  // 2. Dynamic research tool routes
  // Use canonicalPath if available to avoid duplicates (e.g. /ux-auditor vs /research/ux-auditor)
  const toolRoutes = RESEARCH_TOOLS.map(tool => ({
    path: resolveCanonical(`/research/${tool.id}`, tool),
    lastmod: getFileLastMod('src/config/research-tools.ts')
  }));

  const allRoutes = [...staticRoutes, ...toolRoutes, ...contentRoutes];

  // Deduplicate routes to ensure each path is only listed once, prioritizing the one with the most recent lastmod if duplicates exist
  const uniqueRoutesMap = new Map<string, string>();
  allRoutes.forEach(r => {
    if (!uniqueRoutesMap.has(r.path) || r.lastmod > uniqueRoutesMap.get(r.path)!) {
      uniqueRoutesMap.set(r.path, r.lastmod);
    }
  });

  const uniqueRoutes = Array.from(uniqueRoutesMap.entries()).map(([path, lastmod]) => ({
    path,
    lastmod
  }));

  return {
    static: staticRoutes.map(r => r.path),
    tools: toolRoutes.map(r => r.path),
    content: contentRoutes.map(r => r.path),
    all: uniqueRoutes.map(r => r.path),
    detailed: uniqueRoutes
  };
}
