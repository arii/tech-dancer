// impeccable-ignore-file
import { describe, it, expect } from 'vitest';
import { resolveJIT } from '../style-utils';

describe('style-utils', () => {
  describe('resolveJIT', () => {
    it('handles integers as tokens', () => {
      expect(resolveJIT(4, 'p')).toBe('p-4');
      expect(resolveJIT('4', 'p')).toBe('p-4');
    });

    it('handles negative integers as tokens', () => {
      expect(resolveJIT(-4, 'm')).toBe('-m-4');
      expect(resolveJIT('-4', 'm')).toBe('-m-4');
    });

    it('handles .5 increments as tokens (standard Tailwind spacing)', () => {
      expect(resolveJIT(1.5, 'p')).toBe('p-1.5');
      expect(resolveJIT(0.5, 'p')).toBe('p-0.5');
      expect(resolveJIT(-1.5, 'm')).toBe('-m-1.5');
    });

    it('handles arbitrary decimal values as JIT brackets', () => {
      // 0.3 is an opacity token value but should be tokenized elsewhere
      // If passed directly to resolveJIT, it should be brackets if not a spacing token
      expect(resolveJIT(0.3, 'opacity')).toBe('opacity-[0.3]');
      expect(resolveJIT(0.9, 'opacity')).toBe('opacity-[0.9]');
    });

    it('handles standard alphanumeric tokens', () => {
      expect(resolveJIT('accent', 'text')).toBe('text-accent');
      expect(resolveJIT('main', 'text')).toBe('text-main');
    });

    it('handles CSS units as arbitrary values', () => {
      expect(resolveJIT('100px', 'w')).toBe('w-[100px]');
      expect(resolveJIT('50%', 'w')).toBe('w-[50%]');
      expect(resolveJIT('2rem', 'mt')).toBe('mt-[2rem]');
    });

    it('handles already bracketed values', () => {
      expect(resolveJIT('[calc(100%-1rem)]', 'w')).toBe('w-[calc(100%-1rem)]');
    });

    it('returns empty string for null/undefined/empty', () => {
      expect(resolveJIT(null, 'p')).toBe('');
      expect(resolveJIT(undefined, 'p')).toBe('');
      expect(resolveJIT('', 'p')).toBe('');
    });
  });
});
