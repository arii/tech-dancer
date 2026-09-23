import { describe, it, expect, vi } from 'vitest';
import { getTokens } from '../../../scripts/generate-assets';
import fs from 'fs';

vi.mock('fs');

describe('getTokens', () => {
  it('should resolve nested CSS variables correctly', async () => {
    const mockCss = `
      :root {
        --raw-color-bg: #020617; /* impeccable-ignore */
        --raw-color-accent-brand: #22d3ee; /* impeccable-ignore */
        --raw-color-accent-purple: #8b5cf6; /* impeccable-ignore */
        --hero-accent: var(--raw-color-accent-brand);
      }
    `;

    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockCss);

    const tokens = await getTokens();

    expect(tokens).toEqual({
      heroAccent: '#22d3ee', // impeccable-ignore
      accentPurple: '#8b5cf6', // impeccable-ignore
      rawColorBg: '#020617', // impeccable-ignore
    });
  });

  it('should return null if tokens file does not exist', async () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    const tokens = await getTokens();
    expect(tokens).toBeNull();
    consoleSpy.mockRestore();
  });
});
