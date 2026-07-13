import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { match } from "path-to-regexp"
import { RouteConfig } from "./types/routes"
import { SkeletonVariant } from "../components/ui/PageSkeleton"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
 * Normalizes a date string to a Date object, ensuring that YYYY-MM-DD
 * strings are parsed as local time instead of UTC to prevent off-by-one errors.
 */
export function parseDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  if (dateStr.includes('T')) {
    return new Date(dateStr);
  }
  // For YYYY-MM-DD, parse as local
  const parts = dateStr.split('-');
  if (parts.length !== 3) return new Date(dateStr);

  const [year, month, day] = parts.map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Adds or subtracts days from a Date object safely, handling DST transitions
 * by using local Date methods instead of millisecond math.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
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

/**
 * Formats a date into a human-readable relative time string (e.g., "3 minutes ago").
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (Math.abs(diffInSeconds) < 60) {
    return rtf.format(-diffInSeconds, 'second');
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (Math.abs(diffInMinutes) < 60) {
    return rtf.format(-diffInMinutes, 'minute');
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (Math.abs(diffInHours) < 24) {
    return rtf.format(-diffInHours, 'hour');
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (Math.abs(diffInDays) < 30) {
    return rtf.format(-diffInDays, 'day');
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (Math.abs(diffInMonths) < 12) {
    return rtf.format(-diffInMonths, 'month');
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return rtf.format(-diffInYears, 'year');
}
