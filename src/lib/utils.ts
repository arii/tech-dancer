import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { match } from "path-to-regexp"
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
  // nosemgrep: javascript.lang.security.audit.detect-non-literal-regexp.detect-non-literal-regexp
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

/**
 * Standardizes category strings to Title Case, splitting on hyphens.
 */
export function formatCategory(cat: string): string {
  if (!cat || typeof cat !== 'string') return cat;
  if (cat === 'All') return 'All Posts';
  return cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

/**
 * Wraps a fetch function with an optional artificial delay for UI simulation.
 * Enabled via VITE_SIMULATE_LOADING environmental variable.
 */
export function withSimulationDelay<T>(fn: () => T | Promise<T>, delayMs = 800) {
  return async (): Promise<T> => {
    if (import.meta.env.VITE_SIMULATE_LOADING === 'true') {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
    return fn();
  };
}





/**
 * Filters out specified keys from an object, returning the "rest" of the properties.
 * Useful for preventing non-DOM props from being spread onto HTML elements.
 */
export function pickRest<T extends object, K extends keyof T>(props: T, keys: K[]): Omit<T, K> {
  const rest = { ...props };
  keys.forEach(key => {
    delete rest[key];
  });
  return rest;
}


