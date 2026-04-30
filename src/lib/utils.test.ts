import { describe, it, expect } from 'vitest';
import { cn, safeSearch, escapeRegExp, getHighlightedParts, getSkeletonVariant } from './utils';
import { RouteConfig } from '@/lib/types/routes';

describe('utils', () => {
  describe('cn', () => {
    it('merges tailwind classes correctly', () => {
      expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500');
      expect(cn('p-4 p-8')).toBe('p-8');
    });
  });

  describe('safeSearch', () => {
    it('returns true if term is empty', () => {
      expect(safeSearch('anything', '')).toBe(true);
    });

    it('matches string values case-insensitively', () => {
      expect(safeSearch('Hello World', 'hello')).toBe(true);
      expect(safeSearch('Hello World', 'WORLD')).toBe(true);
      expect(safeSearch('Hello World', 'not-here')).toBe(false);
    });

    it('handles non-string values', () => {
      expect(safeSearch(123, '12')).toBe(true);
      expect(safeSearch(null, 'test')).toBe(false);
      expect(safeSearch(undefined, 'test')).toBe(false);
    });

    it('searches in arrays', () => {
      expect(safeSearch(['apple', 'banana'], 'nan')).toBe(true);
      expect(safeSearch(['apple', 'banana'], 'cherry')).toBe(false);
    });
  });

  describe('escapeRegExp', () => {
    it('escapes special regex characters', () => {
      expect(escapeRegExp('*.+?^${}()|[]\\')).toBe('\\*\\.\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\');
    });
  });

  describe('getHighlightedParts', () => {
    it('splits text based on query', () => {
      expect(getHighlightedParts('Hello World', 'o')).toEqual(['Hell', 'o', ' W', 'o', 'rld']);
      expect(getHighlightedParts('Hello World', 'not')).toEqual(['Hello World']);
    });
  });

  describe('getSkeletonVariant', () => {
    const mockRoutes: RouteConfig[] = [
      { path: '/', skeleton: 'simple' },
      { path: '/blog', skeleton: 'grid' },
      { path: '/blog/:id', skeleton: 'post' },
    ];

    it('matches exact routes', () => {
      expect(getSkeletonVariant('/', mockRoutes)).toBe('simple');
      expect(getSkeletonVariant('/blog', mockRoutes)).toBe('grid');
    });

    it('matches parameterized routes', () => {
      expect(getSkeletonVariant('/blog/my-post', mockRoutes)).toBe('post');
    });

    it('returns default grid variant if no match', () => {
      expect(getSkeletonVariant('/unknown', mockRoutes)).toBe('grid');
    });

    it('handles trailing slashes', () => {
      expect(getSkeletonVariant('/blog/', mockRoutes)).toBe('grid');
    });
  });
});
