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
 * Filters out content-specific metadata props that shouldn't bleed to the DOM.
 */
export function filterDataProps(props: Record<string, unknown>) {
  const {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    type: _type,
    slug: _slug,
    title: _title,
    date: _date,
    author: _author,
    authorAvatar: _authorAvatar,
    category: _category,
    excerpt: _excerpt,
    content: _content,
    image: _image,
    tags: _tags,
    basePath: _basePath,
    rating: _rating,
    verdict: _verdict,
    priceCategory: _priceCategory,
    updatedDate: _updatedDate,
    durability: _durability,
    value: _value,
    specs: _specs,
    readingTime: _readingTime,
    affiliateIds: _affiliateIds,
    location: _location,
    city: _city,
    schedule: _schedule,
    description: _description,
    link: _link,
    /* eslint-enable @typescript-eslint/no-unused-vars */
    ...rest
  } = props;

  return rest;
}
