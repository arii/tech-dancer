import { CONTENT_DIR_MAP, getContentSlugs } from '../../scripts/content-loader.ts';
import { routes } from '../config/routes.ts';
import { RESEARCH_TOOLS } from '../config/research-tools.ts';

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
  const staticRoutes = routes
    .filter(r => r.sitemap !== false && r.path !== '*' && !r.path.includes(':'))
    .map(r => r.canonicalPath || r.path);

  // 2. Dynamic research tool routes
  const toolRoutes = RESEARCH_TOOLS
    .filter(tool => tool.sitemap !== false)
    .map(tool => tool.canonicalPath || `/research/${tool.id}`);

  // 3. Dynamic content routes discovered from file system
  const contentRoutes = Object.entries(CONTENT_DIR_MAP).flatMap(([prefix, dir]) =>
    getContentSlugs(dir, prefix)
  );

  // Use a Set to ensure unique routes
  const allRoutes = Array.from(new Set([...staticRoutes, ...toolRoutes, ...contentRoutes]));

  return {
    static: staticRoutes,
    tools: toolRoutes,
    content: contentRoutes,
    all: allRoutes
  };
}
