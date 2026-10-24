import { match } from "path-to-regexp";
import { RouteConfig } from "@/lib/types/routes";
import { SkeletonVariant } from "@/lib/types/skeleton";

/**
 * Determines the appropriate skeleton variant for a given pathname based on route config.
 */
export function getSkeletonVariant(pathname: string, routeConfig: RouteConfig[]): SkeletonVariant {
  const normalizedPath = pathname.endsWith('/') && pathname !== '/'
    ? pathname.slice(0, -1)
    : pathname;

  const matchRoute = routeConfig.find((route: RouteConfig) => {
    const routePath = route.path;
    if (!routePath) return false;

    // Exact match
    if (routePath === normalizedPath) return true;

    // Use path-to-regexp for parameterized routes
    try {
      const matcher = match(routePath, { decode: decodeURIComponent });
      return !!matcher(normalizedPath);
    } catch {
      return false;
    }
  });

  return matchRoute?.skeleton || 'grid';
}
