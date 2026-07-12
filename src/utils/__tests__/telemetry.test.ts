import { describe, it, expect, vi, beforeEach } from 'vitest';
import { reportError } from '../telemetry';

describe('telemetry', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      sendBeacon: vi.fn().mockReturnValue(true),
      userAgent: 'test-agent'
    });
    vi.stubGlobal('window', {
      location: { href: 'http://localhost/' }
    });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
  });

  it('deduplicates identical errors', () => {
    const payload = { message: 'test error', type: 'error' as const };

    // First report
    reportError(payload);
    expect(navigator.sendBeacon).toHaveBeenCalledTimes(1);

    // Second report (duplicate)
    reportError(payload);
    expect(navigator.sendBeacon).toHaveBeenCalledTimes(1);
  });

  it('sends data via sendBeacon', () => {
    const payload = { message: 'unique error', type: 'error' as const };
    reportError(payload);

    expect(navigator.sendBeacon).toHaveBeenCalledWith(
      '/api/telemetry',
      expect.any(Blob)
    );
  });
});
