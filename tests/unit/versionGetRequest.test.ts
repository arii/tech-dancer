import type { VercelRequest, VercelResponse } from '@vercel/node';
import { afterEach, describe, expect, it, vi } from 'vitest';
import compare from '../../api/compare-version';
import latest from '../../api/latest-version';

const recorder = () => {
  const res = {setHeader: vi.fn(), status: vi.fn(), json: vi.fn(), end: vi.fn()};
  res.status.mockReturnValue(res);
  return res;
};
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });

describe.each([['compare', compare], ['latest', latest]] as const)('%s GET endpoint contract', (name, handler) => {
  it.each([
    ['OPTIONS', {}, 204, undefined],
    ['POST', {}, 405, 'GET only'],
    ['GET', {}, 400, 'ecosystem must be one of: npm, node, gh-action'],
    ['GET', {ecosystem: ['npm', 'node']}, 400, 'ecosystem must be one of: npm, node, gh-action'],
    ['GET', {ecosystem: 'npm'}, 400, name === 'compare' ? 'candidate is required, e.g. candidate=v4' : 'name is required for ecosystem=npm'],
    ['GET', {ecosystem: 'npm', candidate:'v4', name:'x'.repeat(65)}, 400, 'name must be 64 characters or fewer'],
    ['GET', {ecosystem:'node', candidate:'x'.repeat(65)}, name === 'compare' ? 400 : 200, name === 'compare' ? 'candidate must be 64 characters or fewer' : undefined],
    ['GET', {ecosystem:'gh-action',candidate:'v4'}, 400, 'name is required for ecosystem=gh-action'],
  ])('retains %s %j validation order', async (method, query, status, error) => {
    const fetch = vi.fn().mockResolvedValue({ok:true,json:async()=>[{version:'v24.16.0'}]});
    vi.stubGlobal('fetch',fetch);
    const res = recorder();
    await handler({method,query} as unknown as VercelRequest,res as unknown as VercelResponse);
    expect(res.status).toHaveBeenCalledWith(status);
    expect(res.setHeader.mock.calls).toEqual([
      ['Access-Control-Allow-Origin','*'],['Access-Control-Allow-Methods','GET, OPTIONS'],
      ['Cache-Control','s-maxage=1800, stale-while-revalidate=3600'],
    ]);
    if(error) expect(res.json).toHaveBeenCalledWith({error});
    if(status !== 200) expect(fetch).not.toHaveBeenCalled();
    if(status === 204) expect(res.end).toHaveBeenCalled();
  });

  it('keeps successful payload and timestamp unchanged', async () => {
    vi.useFakeTimers(); vi.setSystemTime(new Date('2026-11-20T22:00:00Z'));
    vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:true,json:async()=>({version:'2.0.0'})}));
    const res=recorder();
    await handler({method:'GET',query:{ecosystem:'npm',name:'example',candidate:'1.0.0'}} as unknown as VercelRequest,res as unknown as VercelResponse);
    expect(res.json.mock.calls[0][0]).toMatchSnapshot();
  });

  it('keeps upstream failure status and payload unchanged', async () => {
    vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:false,status:503}));
    const res=recorder();
    await handler({method:'GET',query:{ecosystem:'node',candidate:'24.0.0'}} as unknown as VercelRequest,res as unknown as VercelResponse);
    expect(res.status).toHaveBeenCalledWith(502);
    expect(res.json).toHaveBeenCalledWith({error:'upstream lookup failed',ecosystem:'node',name:null});
  });
});
