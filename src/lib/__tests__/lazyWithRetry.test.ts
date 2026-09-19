import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  isChunkLoadError,
  handleChunkLoadError,
  lazyWithRetry,
} from '../lazyWithRetry';

describe('lazyWithRetry utility', () => {
  const originalLocation = window.location;
  const originalSessionStorage = window.sessionStorage;

  let mockReload: ReturnType<typeof vi.fn>;
  let sessionStorageStore: Record<string, string> = {};

  beforeEach(() => {
    vi.restoreAllMocks();
    sessionStorageStore = {};

    mockReload = vi.fn();

    // Mock window.location
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        ...originalLocation,
        pathname: '/test-route',
        reload: mockReload,
      },
    });

    // Mock sessionStorage
    Object.defineProperty(window, 'sessionStorage', {
      writable: true,
      value: {
        getItem: vi.fn((key: string) => sessionStorageStore[key] || null),
        setItem: vi.fn((key: string, value: string) => {
          sessionStorageStore[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
          delete sessionStorageStore[key];
        }),
        clear: vi.fn(() => {
          sessionStorageStore = {};
        }),
      },
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation,
    });
    Object.defineProperty(window, 'sessionStorage', {
      writable: true,
      value: originalSessionStorage,
    });
  });

  describe('isChunkLoadError', () => {
    it('identifies dynamic import failure error messages correctly', () => {
      expect(
        isChunkLoadError(new Error('Failed to fetch dynamically imported module: https://example.com/assets/chunk.js'))
      ).toBe(true);

      expect(
        isChunkLoadError(new Error('error loading dynamically imported module'))
      ).toBe(true);

      expect(
        isChunkLoadError(new Error('Loading chunk 404 failed.'))
      ).toBe(true);

      expect(
        isChunkLoadError('Failed to fetch dynamically imported module')
      ).toBe(true);
    });

    it('returns false for non-chunk errors and null/undefined values', () => {
      expect(isChunkLoadError(new Error('Cannot read properties of undefined'))).toBe(false);
      expect(isChunkLoadError(new TypeError('NetworkError when attempting to fetch resource.'))).toBe(false);
      expect(isChunkLoadError(null)).toBe(false);
      expect(isChunkLoadError(undefined)).toBe(false);
      expect(isChunkLoadError('')).toBe(false);
    });
  });

  describe('handleChunkLoadError', () => {
    it('sets sessionStorage flag and triggers window.location.reload() on first chunk error', () => {
      const result = handleChunkLoadError(new Error('Failed to fetch dynamically imported module'));

      expect(result).toBe(true);
      expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
        'chunk_reload_attempted:/test-route',
        expect.any(String)
      );
      expect(mockReload).toHaveBeenCalledTimes(1);
    });

    it('suppresses reload if called again within cooldown period (preventing infinite loops)', () => {
      // First attempt triggers reload
      const result1 = handleChunkLoadError(new Error('Failed to fetch dynamically imported module'));
      expect(result1).toBe(true);
      expect(mockReload).toHaveBeenCalledTimes(1);

      // Second attempt immediately after should be suppressed
      const result2 = handleChunkLoadError(new Error('Failed to fetch dynamically imported module'));
      expect(result2).toBe(false);
      expect(mockReload).toHaveBeenCalledTimes(1); // Still 1 call
    });

    it('allows reload if cooldown period (10s) has passed', () => {
      const now = Date.now();
      vi.spyOn(Date, 'now').mockReturnValue(now);

      // First attempt
      handleChunkLoadError(new Error('Failed to fetch dynamically imported module'));
      expect(mockReload).toHaveBeenCalledTimes(1);

      // Advance time by 11 seconds
      vi.spyOn(Date, 'now').mockReturnValue(now + 11000);

      // Second attempt after 11s should succeed
      const result2 = handleChunkLoadError(new Error('Failed to fetch dynamically imported module'));
      expect(result2).toBe(true);
      expect(mockReload).toHaveBeenCalledTimes(2);
    });

    it('returns false and does not reload for non-chunk errors', () => {
      const result = handleChunkLoadError(new Error('Regular application error'));

      expect(result).toBe(false);
      expect(mockReload).not.toHaveBeenCalled();
    });
  });

  describe('lazyWithRetry', () => {
    it('returns result of importFn when successful', async () => {
      const mockComponent = { Component: () => null };
      const importFn = vi.fn().mockResolvedValue(mockComponent);

      const wrappedImport = lazyWithRetry(importFn);
      const res = await wrappedImport();

      expect(res).toBe(mockComponent);
      expect(importFn).toHaveBeenCalledTimes(1);
    });

    it('triggers reload and returns unresolved promise on chunk load error', async () => {
      const chunkError = new Error('Failed to fetch dynamically imported module');
      const importFn = vi.fn().mockRejectedValue(chunkError);

      const wrappedImport = lazyWithRetry(importFn);
      const promise = wrappedImport();

      // Yield to microtasks so async import catch block executes
      await new Promise((r) => setTimeout(r, 10));

      // Check reload was triggered
      expect(mockReload).toHaveBeenCalledTimes(1);

      // Verify the returned promise stays pending
      let resolved = false;
      let rejected = false;
      promise.then(() => { resolved = true; }).catch(() => { rejected = true; });

      await new Promise((r) => setTimeout(r, 20));
      expect(resolved).toBe(false);
      expect(rejected).toBe(false);
    });

    it('rethrows non-chunk errors without triggering reload', async () => {
      const regularError = new Error('Syntax error in module');
      const importFn = vi.fn().mockRejectedValue(regularError);

      const wrappedImport = lazyWithRetry(importFn);

      await expect(wrappedImport()).rejects.toThrow('Syntax error in module');
      expect(mockReload).not.toHaveBeenCalled();
    });

    it('rethrows chunk error when reload loop guard suppresses reload', async () => {
      const chunkError = new Error('Failed to fetch dynamically imported module');
      const importFn = vi.fn().mockRejectedValue(chunkError);

      // Set sessionStorage key to simulate previous reload attempt within cooldown
      sessionStorageStore['chunk_reload_attempted:/test-route'] = Date.now().toString();

      const wrappedImport = lazyWithRetry(importFn);

      await expect(wrappedImport()).rejects.toThrow('Failed to fetch dynamically imported module');
      expect(mockReload).not.toHaveBeenCalled();
    });
  });
});
