import { describe, it, expect } from 'vitest';
import { safeSearch, escapeRegExp, getHighlightedParts } from '@/lib/utils';

describe('utils.ts', () => {
  describe('safeSearch', () => {
    it('returns true for empty query', () => {
      expect(safeSearch('any value', '')).toBe(true);
    });

    it('finds match ignoring case', () => {
      expect(safeSearch('Hello World', 'hello')).toBe(true);
    });

    it('returns false if no match', () => {
      expect(safeSearch('Hello World', 'bye')).toBe(false);
    });

    it('handles numeric values', () => {
      expect(safeSearch(12345, '23')).toBe(true);
    });

    it('handles array values', () => {
      expect(safeSearch(['apple', 'banana'], 'nan')).toBe(true);
    });
  });

  describe('escapeRegExp', () => {
    it('escapes special regex characters', () => {
      expect(escapeRegExp('*.+?^$')).toBe('\\*\\.\\+\\?\\^\\$');
    });
  });

  describe('getHighlightedParts', () => {
    it('splits text by query correctly', () => {
      const parts = getHighlightedParts('Hello World', 'o');
      expect(parts).toEqual(['Hell', 'o', ' W', 'o', 'rld']);
    });

    it('returns full text if query is empty', () => {
      const parts = getHighlightedParts('Hello World', '');
      expect(parts).toEqual(['Hello World']);
    });
  });
});
