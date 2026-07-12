import { describe, it, expect, vi, beforeEach } from 'vitest';
import { compareVersions, checkNpmDeprecation, checkNodeEol } from '../../api/_lib/versions';

describe('versions utilities', () => {
  describe('compareVersions', () => {
    it('should return 0 for equal versions', () => {
      expect(compareVersions('1.2.3', '1.2.3')).toBe(0);
      expect(compareVersions('v1.2', '1.2.0')).toBe(0);
    });

    it('should return 1 when a > b (happy path)', () => {
      expect(compareVersions('2.0.0', '1.9.9')).toBe(1);
      expect(compareVersions('v24.16.0', '24.15.0')).toBe(1);
    });

    it('should return -1 when a < b (happy path)', () => {
      expect(compareVersions('1.9.9', '2.0.0')).toBe(-1);
      expect(compareVersions('v4', 'v6.0.1')).toBe(-1);
    });

    it('should handle edge cases like wildcards and incomplete version strings', () => {
      expect(compareVersions('24.x', '24.16.0')).toBe(-1); // 24.x normalizes to 24.0.0
      expect(compareVersions('v6', 'v6.0.1')).toBe(-1); // v6 normalizes to [6] which is smaller than [6, 0, 1]
    });
  });

  describe('checkNpmDeprecation', () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it('should return true if package version is deprecated', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ deprecated: 'This version is deprecated' }),
      });
      vi.stubGlobal('fetch', mockFetch);

      const isDep = await checkNpmDeprecation('some-pkg', '1.0.0');
      expect(isDep).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith('https://registry.npmjs.org/some-pkg/1.0.0');
    });

    it('should return false if package version is not deprecated', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({}),
      }));

      const isDep = await checkNpmDeprecation('some-pkg', '1.0.0');
      expect(isDep).toBe(false);
    });
  });

  describe('checkNodeEol', () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it('should return true if Node version is EOL (date in the past)', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          { cycle: '18', eol: '2025-04-30' }
        ],
      }));

      const isEol = await checkNodeEol('18.0.0');
      expect(isEol).toBe(true);
    });

    it('should return false if Node version is not EOL (date in the future)', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          { cycle: '22', eol: '2099-12-31' }
        ],
      }));

      const isEol = await checkNodeEol('22.0.0');
      expect(isEol).toBe(false);
    });

    it('should return null if fetch fails (fallback logic removed)', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));

      const isEol = await checkNodeEol('18.0.0');
      expect(isEol).toBeNull();
    });

    it('should return null if fetch returns non-2xx status', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }));

      const isEol = await checkNodeEol('18.0.0');
      expect(isEol).toBeNull();
    });
  });
});
