import type { VercelRequest, VercelResponse } from '@vercel/node';
import { afterEach, describe, expect, it, vi } from 'vitest';
import single from '../../api/compare-version';
import batch from '../../api/batch-compare';
import { resolveComparison } from '../../api/_lib/versions';

function responseRecorder() {
  const response = { setHeader: vi.fn(), status: vi.fn(), json: vi.fn(), end: vi.fn() };
  response.status.mockReturnValue(response);
  return response;
}

function mockUpstream(...payloads: unknown[]) {
  const fetch = vi.fn();
  for (const payload of payloads) fetch.mockResolvedValueOnce({ ok: true, json: async () => payload });
  vi.stubGlobal('fetch', fetch);
  return fetch;
}

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('shared API version comparison', () => {
  it.each([
    ['1.0.0', true, false, false],
    ['2.0.0', false, true, false],
    ['3.0.0', false, false, true],
  ])('preserves comparison flags for %s', async (candidate, isOutdated, isCurrent, isAheadOfLatest) => {
    mockUpstream({ version: '2.0.0' }, { deprecated: 'Use a newer version' });
    expect(await resolveComparison('npm', candidate, 'example')).toEqual({
      ecosystem: 'npm', name: 'example', candidate, latest: '2.0.0',
      isOutdated, isCurrent, isAheadOfLatest, isDeprecated: true, isEOL: null,
    });
  });

  it('defaults the Node name and checks EOL, without an npm lookup', async () => {
    const fetch = mockUpstream([{ version: 'v24.16.0' }], [{ cycle: '18', eol: '2025-04-30' }]);
    const result = await resolveComparison('node', '18.0.0');
    expect(result).toMatchObject({ name: 'node', latest: '24.16.0', isEOL: true, isDeprecated: null });
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('does not request deprecation or EOL for GitHub Actions', async () => {
    const fetch = mockUpstream({ tag_name: 'v7' });
    expect(await resolveComparison('gh-action', 'v7', 'actions/checkout')).toMatchObject({ isCurrent: true, isDeprecated: null, isEOL: null });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('returns null when the upstream version cannot be resolved', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    expect(await resolveComparison('npm', '1.0.0', 'example')).toBeNull();
  });

  it('keeps identical single/batch successful fields, with a timestamp only on single', async () => {
    mockUpstream({ version: '2.0.0' }, {}, { version: '2.0.0' }, {});
    const item = { ecosystem: 'npm', name: 'example', candidate: '1.0.0' };
    const one = responseRecorder();
    await single({ method: 'GET', query: item } as unknown as VercelRequest, one as unknown as VercelResponse);
    const many = responseRecorder();
    await batch({ method: 'POST', body: [item] } as unknown as VercelRequest, many as unknown as VercelResponse);
    const { checkedAt, ...payload } = one.json.mock.calls[0][0];
    expect(typeof checkedAt).toBe('string');
    expect(many.json).toHaveBeenCalledWith([payload]);
    expect(one.status).toHaveBeenCalledWith(200);
    expect(many.status).toHaveBeenCalledWith(200);
  });

  it('preserves different single/batch upstream failure contracts', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    const item = { ecosystem: 'npm', name: 'example', candidate: '1.0.0' };
    const one = responseRecorder();
    await single({ method: 'GET', query: item } as unknown as VercelRequest, one as unknown as VercelResponse);
    const many = responseRecorder();
    await batch({ method: 'POST', body: [item] } as unknown as VercelRequest, many as unknown as VercelResponse);
    expect(one.status).toHaveBeenCalledWith(502);
    expect(one.json).toHaveBeenCalledWith({ error: 'upstream lookup failed', ecosystem: 'npm', name: 'example' });
    expect(many.status).toHaveBeenCalledWith(200);
    expect(many.json).toHaveBeenCalledWith([{ error: 'Upstream lookup failed', ecosystem: 'npm', name: 'example' }]);
  });

  it('retains validation and OPTIONS short circuits without upstream calls', async () => {
    const fetch = mockUpstream();
    const one = responseRecorder();
    await single({ method: 'GET', query: { ecosystem: 'npm' } } as unknown as VercelRequest, one as unknown as VercelResponse);
    const options = responseRecorder();
    await batch({ method: 'OPTIONS' } as unknown as VercelRequest, options as unknown as VercelResponse);
    expect(one.status).toHaveBeenCalledWith(400);
    expect(options.status).toHaveBeenCalledWith(204);
    expect(fetch).not.toHaveBeenCalled();
  });
});
