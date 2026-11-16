import { describe, expect, it } from 'vitest';

import { applyResponsive, resolveSpacing } from '@/lib/style-utils';

describe('applyResponsive', () => {
  const pad = resolveSpacing('p');

  it('prefixes breakpoint keys and leaves base unprefixed', () => {
    expect(applyResponsive({ base: 4, md: 8 }, pad)).toBe('p-4 md:p-8');
  });

  it('treats a default key as the unprefixed base value', () => {
    expect(applyResponsive({ default: 4, sm: 6 }, pad)).toBe('p-4 sm:p-6');
  });

  it('returns an empty string when no value is given', () => {
    expect(applyResponsive(undefined, pad)).toBe('');
  });
});
