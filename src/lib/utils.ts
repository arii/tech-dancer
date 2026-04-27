import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { routes } from "@/config/routes"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Standardized style composition helper.
 * Centralizes how we merge Tailwind classes and variants.
 */
export function composeStyles(...styles: ClassValue[]) {
  return cn(...styles)
}

/**
 * Safely checks if a search term is included in a value.
 * Handles non-string values by converting them to strings and normalizes to lowercase.
 */
export function safeSearch(value: unknown, term: string): boolean {
  if (!term) return true;
  const normalizedTerm = term.toLowerCase();
  
  if (Array.isArray(value)) {
    return value.some(v => safeSearch(v, term));
  }
  
  const normalizedValue = String(value || '').toLowerCase();
  return normalizedValue.includes(normalizedTerm);
}

/**
 * Escapes special characters in a string for use in a Regular Expression.
 */
export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Splits a text into parts for highlighting based on a query.
 * Centralizes the regex logic to ensure consistent splitting across the app.
 */
export function getHighlightedParts(text: string, query: string) {
  if (!query) return [text];
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.split(regex);
}

/**
 * Maps route pathnames to PageSkeleton variants.
 * Centralizes skeleton logic to prevent Layout Shift (CLS).
 * Refactored to derive metadata from the centralized route configuration.
 */
export function getSkeletonVariant(pathname: string): 'grid' | 'post' | 'simple' {
  // Normalize pathname: remove trailing slash unless it's just "/"
  const path = pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname;

  // Helper to check if a path matches a route pattern (handles :slug)
  const matchRoute = (routePath: string, actualPath: string) => {
    const pattern = routePath.replace(/:[^\/]+/g, '[^\\/]+');
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(actualPath);
  };

  // Find exact or pattern match in routes
  const matchedRoute = routes.find(r => matchRoute(r.path, path));

  if (matchedRoute?.skeleton) {
    return matchedRoute.skeleton;
  }

  // Fallback to post for nested paths under known sections if not explicitly configured
  const isPost = ['/blog/', '/gear/', '/research/'].some(prefix => path.startsWith(prefix));
  if (isPost) return 'post';

  // Fallback to simple
  return 'simple';
}
