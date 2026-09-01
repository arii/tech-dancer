import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { reportError, initTelemetry } from '@/utils/telemetry';

describe('telemetry utils', () => {
  const originalWindow = globalThis.window;
  const originalNavigator = globalThis.navigator;
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal('navigator', {
      sendBeacon: vi.fn().mockReturnValue(true),
      userAgent: 'test-user-agent',
    });
    vi.stubGlobal('window', {
      location: { href: 'https://boomtick.blog/test-page' },
      addEventListener: vi.fn(),
    });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    if (originalWindow) globalThis.window = originalWindow;
    if (originalNavigator) globalThis.navigator = originalNavigator;
    if (originalFetch) globalThis.fetch = originalFetch;
  });

  describe('reportError', () => {
    it('sends telemetry payload via sendBeacon when available', () => {
      const payload = { message: 'Test error message', type: 'error' as const };
      reportError(payload);

      expect(navigator.sendBeacon).toHaveBeenCalledTimes(1);
      const [endpoint, blob] = (navigator.sendBeacon as any).mock.calls[0];
      expect(endpoint).toBe('/api/telemetry');
      expect(blob).toBeInstanceOf(Blob);
    });

    it('populates default parameters when partial payload is provided', () => {
      reportError({});

      expect(navigator.sendBeacon).toHaveBeenCalledTimes(1);
      const [, blob] = (navigator.sendBeacon as any).mock.calls[0];

      // We can read text from Blob using FileReader or standard Blob methods in jsdom/vitest
      return blob.text().then((text: string) => {
        const data = JSON.parse(text);
        expect(data.message).toBe('Unknown error');
        expect(data.type).toBe('error');
        expect(data.url).toBe('https://boomtick.blog/test-page');
        expect(data.userAgent).toBe('test-user-agent');
        expect(data.timestamp).toBeDefined();
      });
    });

    it('falls back to fetch when navigator.sendBeacon is unavailable', () => {
      vi.stubGlobal('navigator', {
        userAgent: 'fallback-agent',
      });

      reportError({ message: 'Fetch fallback error', type: 'error' });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        '/api/telemetry',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          keepalive: true,
        })
      );
    });

    it('silently catches fetch rejection without throwing', async () => {
      vi.stubGlobal('navigator', { userAgent: 'test-agent' });
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network failure')));

      expect(() => {
        reportError({ message: 'Silent fetch error', type: 'error' });
      }).not.toThrow();

      // Wait a tick for promise rejection handler
      await new Promise((r) => setTimeout(r, 10));
    });

    it('deduplicates identical error reports within the window', () => {
      const payload = { message: 'Dedupe error', type: 'error' as const };

      reportError(payload);
      expect(navigator.sendBeacon).toHaveBeenCalledTimes(1);

      // Duplicate report
      reportError(payload);
      expect(navigator.sendBeacon).toHaveBeenCalledTimes(1);
    });

    it('evicts oldest cache entry when MAX_CACHE_SIZE (100) is exceeded', () => {
      // Fill cache with 100 unique error messages
      for (let i = 0; i < 100; i++) {
        reportError({ message: `Unique error ${i}`, type: 'error' });
      }

      expect(navigator.sendBeacon).toHaveBeenCalledTimes(100);

      // Triggering 101st unique error causes LRU eviction of the 1st error ('Unique error 0')
      reportError({ message: 'Unique error 100', type: 'error' });
      expect(navigator.sendBeacon).toHaveBeenCalledTimes(101);

      // Re-reporting 'Unique error 0' should now be permitted since it was evicted from cache
      reportError({ message: 'Unique error 0', type: 'error' });
      expect(navigator.sendBeacon).toHaveBeenCalledTimes(102);
    });

    it('handles SSR environment where window and navigator are undefined', () => {
      vi.stubGlobal('window', undefined);
      vi.stubGlobal('navigator', undefined);

      expect(() => {
        reportError({ message: 'SSR error', type: 'error' });
      }).not.toThrow();
    });
  });

  describe('initTelemetry', () => {
    it('registers window event listeners for error and unhandledrejection', () => {
      const listeners: Record<string, Function> = {};
      const mockAddEventListener = vi.fn((event, handler) => {
        listeners[event] = handler;
      });

      vi.stubGlobal('window', {
        location: { href: 'http://localhost' },
        addEventListener: mockAddEventListener,
      });

      initTelemetry();

      expect(mockAddEventListener).toHaveBeenCalledWith('error', expect.any(Function));
      expect(mockAddEventListener).toHaveBeenCalledWith('unhandledrejection', expect.any(Function));

      // Test error listener callback
      const mockErrorEvent = {
        message: 'Uncaught Error',
        error: new Error('Error object stack'),
      };
      listeners['error'](mockErrorEvent);
      expect(navigator.sendBeacon).toHaveBeenCalledTimes(1);

      // Test unhandledrejection listener callback with Reason object
      const mockRejectionEvent1 = {
        reason: new Error('Rejected promise'),
      };
      listeners['unhandledrejection'](mockRejectionEvent1);
      expect(navigator.sendBeacon).toHaveBeenCalledTimes(2);

      // Test unhandledrejection listener callback with String reason
      const mockRejectionEvent2 = {
        reason: 'String rejection reason',
      };
      listeners['unhandledrejection'](mockRejectionEvent2);
      expect(navigator.sendBeacon).toHaveBeenCalledTimes(3);
    });

    it('does nothing in non-browser SSR environment', () => {
      vi.stubGlobal('window', undefined);

      expect(() => {
        initTelemetry();
      }).not.toThrow();
    });
  });
});
