// impeccable-ignore-file
import { describe, it, expect, vi } from 'vitest';
import { getTokens } from '../../../scripts/generate-assets';
import fs from 'fs';

vi.mock('fs');

describe('getTokens', () => {
  it('should resolve nested CSS variables correctly', async () => {
    const mockCss = `
      :root {
        --raw-color-bg: #020617;
        --raw-color-accent-brand: #0891b2;
        --raw-color-accent-purple: #8b5cf6;
        --hero-accent: var(--raw-color-accent-brand);
      }
    `;

    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockCss);

    const tokens = await getTokens();

    expect(tokens).toEqual({
      heroAccent: '#0891b2',
      accentPurple: '#8b5cf6',
      rawColorBg: '#020617',
    });
  });

  it('should return null if tokens file does not exist', async () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    const tokens = await getTokens();
    expect(tokens).toBeNull();
  });
});
