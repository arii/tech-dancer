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
 * Discovers all application routes from various sources.
 * Centralizes discovery logic to prevent duplication and drift.
 *
 * Used by:
 * - vite.config.ts (for sitemap generation)
 * - scripts/generate-spa-stubs.mjs (for SPA 200 OK stubs)
 * - src/config/routes.ts (potential for runtime validation)
 */
export function getAllRoutes() {
  // 1. Static routes from configuration (excluding parameterized and catch-all)
  // Use canonicalPath if available, and filter out routes marked as sitemap: false
  const staticRoutes = routes
    .filter(r => r.sitemap !== false && r.path !== '*' && !r.path.includes(':'))
    .map(r => resolveCanonical(r.path, r));

  // 2. Dynamic research tool routes
  // Use canonicalPath if available to avoid duplicates (e.g. /ux-auditor vs /research/ux-auditor)
  const toolRoutes = RESEARCH_TOOLS.map(tool =>
    resolveCanonical(`/research/${tool.id}`, tool)
  );

  // 3. Dynamic content routes discovered from file system
  const contentRoutes = Object.entries(CONTENT_DIR_MAP).flatMap(([prefix, dir]) =>
    getContentSlugs(dir, prefix)
  );

  const allRoutes = [...staticRoutes, ...toolRoutes, ...contentRoutes];

  // Deduplicate routes to ensure each path is only listed once
  const uniqueRoutes = Array.from(new Set(allRoutes));

  return {
    static: staticRoutes,
    tools: toolRoutes,
    content: contentRoutes,
    all: uniqueRoutes
  };
}
