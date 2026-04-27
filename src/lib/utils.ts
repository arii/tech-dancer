import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { RouteConfig } from "@/lib/types/routes"
import { SkeletonVariant } from "@/components/ui/PageSkeleton"

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
 * Determines the appropriate skeleton variant for a given pathname based on route config.
 */
export function getSkeletonVariant(pathname: string, routeConfig: RouteConfig[]): SkeletonVariant {
  const normalizedPath = pathname.endsWith('/') && pathname !== '/'
    ? pathname.slice(0, -1)
    : pathname;

  const match = routeConfig.find((route: RouteConfig) => {
    const routePath = route.path;
    if (!routePath) return false;
    if (routePath === normalizedPath) return true;

    // Simple regex-based matching for parameterized routes (e.g., /blog/:slug)
    if (routePath.includes(':')) {
      const pattern = routePath.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(normalizedPath);
    }

    return false;
  });

  return match?.skeleton || 'grid';
}
