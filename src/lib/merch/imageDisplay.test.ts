import { describe, expect, it } from 'vitest';
import { resolveMerchImages } from './imageDisplay';

const front = { src: '/front.webp', side: 'front' as const, alt: 'Front view' };
const back = { src: '/back.webp', side: 'back' as const, alt: 'Back view' };

describe('resolveMerchImages', () => {
  it('falls back to the legacy imageUrl as a single front image', () => {
    const resolved = resolveMerchImages({ title: 'Legacy shirt', imageUrl: '/legacy.webp' });

    expect(resolved).toEqual({
      mode: 'single',
      primary: { src: '/legacy.webp', side: 'front', alt: 'Legacy shirt product image' },
      secondary: undefined,
      equal: [],
    });
  });

  it('returns both front and back images for equal display mode', () => {
    const resolved = resolveMerchImages({
      title: 'Two-sided shirt',
      imageUrl: '/front.webp',
      images: [front, back],
      imageDisplayMode: 'both-equal',
    });

    expect(resolved.primary).toBe(front);
    expect(resolved.secondary).toBe(back);
    expect(resolved.equal).toEqual([front, back]);
  });

  it('promotes the requested side for prominent display modes', () => {
    expect(resolveMerchImages({ title: 'Front shirt', imageUrl: '/front.webp', images: [front, back], imageDisplayMode: 'front-prominent' }).primary).toBe(front);
    expect(resolveMerchImages({ title: 'Back shirt', imageUrl: '/back.webp', images: [front, back], imageDisplayMode: 'back-prominent' }).primary).toBe(back);
  });
});
