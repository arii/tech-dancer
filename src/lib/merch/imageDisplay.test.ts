import { describe, expect, it } from 'vitest';
import { resolveMerchImages } from './imageDisplay';

const front = { src: '/front.webp', side: 'front' as const, alt: 'Front view' };
const back = { src: '/back.webp', side: 'back' as const, alt: 'Back view' };

describe('resolveMerchImages', () => {
  it('returns both front and back images for equal display mode', () => {
    const resolved = resolveMerchImages({
      title: 'Two-sided shirt',
      images: [front, back],
      imageDisplayMode: 'both-equal',
    });

    expect(resolved.primary).toBe(front);
    expect(resolved.secondary).toBe(back);
    expect(resolved.equal).toEqual([front, back]);
  });

  it('promotes the requested side for prominent display modes', () => {
    expect(resolveMerchImages({ title: 'Front shirt', images: [front, back], imageDisplayMode: 'front-prominent' }).primary).toBe(front);
    expect(resolveMerchImages({ title: 'Back shirt', images: [front, back], imageDisplayMode: 'back-prominent' }).primary).toBe(back);
  });

  it('handles back-only mode', () => {
    const resolved = resolveMerchImages({
      title: 'Back only shirt',
      images: [front, back],
      imageDisplayMode: 'back-only',
    });
    expect(resolved.mode).toBe('back-only');
    expect(resolved.primary).toBe(back);
    expect(resolved.secondary).toBeUndefined();
  });
});
