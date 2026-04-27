import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
 */
export function getSkeletonVariant(pathname: string): 'grid' | 'post' | 'simple' {
  // Normalize pathname: remove trailing slash unless it's just "/"
  const path = pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname;

  // Post variants (e.g., /blog/some-slug)
  const isPost = ['/blog/', '/gear/', '/research/'].some(prefix => path.startsWith(prefix));
  if (isPost) return 'post';

  // Grid variants (exact matches)
  const gridPaths = ['/blog', '/gear', '/research', '/ux-auditor'];
  if (gridPaths.includes(path)) {
    return 'grid';
  }

  // Fallback to simple (Home, About, Contact, etc.)
  return 'simple';
}
