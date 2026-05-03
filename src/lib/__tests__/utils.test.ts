import { describe, it, expect } from 'vitest';
import { cn, safeSearch, escapeRegExp, getHighlightedParts } from '../utils';

describe('utils', () => {
  describe('cn', () => {
    it('merges tailwind classes correctly', () => {
      expect(cn('bg-red-500', 'p-4')).toBe('bg-red-500 p-4');
      expect(cn('p-4', 'p-2')).toBe('p-2'); // tailwind-merge in action
    });

    it('handles conditional classes', () => {
      const isMargin = true;
      const isBlue = false;
      expect(cn('p-4', isMargin && 'm-2', isBlue && 'bg-blue-500')).toBe('p-4 m-2');
    });
  });

  describe('safeSearch', () => {
    it('returns true if term is empty', () => {
      expect(safeSearch('anything', '')).toBe(true);
    });

    it('matches string values case-insensitively', () => {
      expect(safeSearch('Hello World', 'hello')).toBe(true);
      expect(safeSearch('Hello World', 'WORLD')).toBe(true);
      expect(safeSearch('Hello World', 'foo')).toBe(false);
    });

    it('handles non-string values', () => {
      expect(safeSearch(12345, '234')).toBe(true);
      expect(safeSearch(null, 'foo')).toBe(false);
      expect(safeSearch(undefined, 'foo')).toBe(false);
    });

    it('handles arrays of values', () => {
      expect(safeSearch(['apple', 'banana', 'cherry'], 'nana')).toBe(true);
      expect(safeSearch(['apple', 'cherry'], 'banana')).toBe(false);
    });
  });

  describe('escapeRegExp', () => {
    it('escapes special regex characters', () => {
      expect(escapeRegExp('*.+?^${}()|[]\\')).toBe('\\*\\.\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\');
    });
  });

  describe('getHighlightedParts', () => {
    it('returns original text if query is empty', () => {
      expect(getHighlightedParts('Hello World', '')).toEqual(['Hello World']);
    });

    it('splits text based on query', () => {
      expect(getHighlightedParts('Hello World', 'o')).toEqual(['Hell', 'o', ' W', 'o', 'rld']);
      expect(getHighlightedParts('Hello World', 'world')).toEqual(['Hello ', 'World', '']);
    });
  });
});
