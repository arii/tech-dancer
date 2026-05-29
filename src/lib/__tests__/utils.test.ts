import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cn, safeSearch, escapeRegExp, getHighlightedParts, formatRelativeTime } from '../utils';

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

  describe('formatRelativeTime', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-04-19T12:00:00Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('formats seconds correctly', () => {
      const past = new Date('2026-04-19T11:59:50Z');
      expect(formatRelativeTime(past)).toBe('10 seconds ago');
    });

    it('formats minutes correctly', () => {
      const past = new Date('2026-04-19T11:55:00Z');
      expect(formatRelativeTime(past)).toBe('5 minutes ago');
    });

    it('formats hours correctly', () => {
      const past = new Date('2026-04-19T10:00:00Z');
      expect(formatRelativeTime(past)).toBe('2 hours ago');
    });

    it('formats days correctly', () => {
      const past = new Date('2026-04-17T12:00:00Z');
      expect(formatRelativeTime(past)).toBe('2 days ago');
    });

    it('handles string input', () => {
      expect(formatRelativeTime('2026-04-19T11:59:00Z')).toBe('1 minute ago');
    });
  });
});
