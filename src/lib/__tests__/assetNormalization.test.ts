import { describe, it, expect } from 'vitest';
import { normalizeAsset } from '../content';
import { ASSET_PREFIX } from '@/config/constants';

describe('normalizeAsset', () => {
  it('should return undefined for empty values', () => {
    expect(normalizeAsset('')).toBeUndefined();
    expect(normalizeAsset(undefined)).toBeUndefined();
    expect(normalizeAsset(null)).toBeUndefined();
  });

  it('should prepend ASSET_PREFIX to root-relative paths', () => {
    const path = '/images/test.jpg';
    expect(normalizeAsset(path)).toBe(`${ASSET_PREFIX}${path}`);
  });

  it('should not prepend ASSET_PREFIX if already present', () => {
    const path = `${ASSET_PREFIX}/images/test.jpg`;
    expect(normalizeAsset(path)).toBe(path);
  });

  it('should not modify external URLs', () => {
    const url = 'https://example.com/image.png';
    expect(normalizeAsset(url)).toBe(url);
  });

  it('should not modify non-root relative paths', () => {
    const path = 'images/test.jpg';
    expect(normalizeAsset(path)).toBe(path);
  });
});
