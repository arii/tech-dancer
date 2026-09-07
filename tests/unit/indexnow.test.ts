import fs from 'fs';
import path from 'path';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  INDEXNOW_KEY,
  buildIndexNowPayload,
  discoverSiteUrls,
  submitIndexNow
} from '../../scripts/submit-indexnow';

describe('IndexNow Verification and URL Submission', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('contains valid verification key file in public directory', () => {
    const keyFilePath = path.resolve(process.cwd(), `public/${INDEXNOW_KEY}.txt`);
    expect(fs.existsSync(keyFilePath)).toBe(true);

    const fileContent = fs.readFileSync(keyFilePath, 'utf-8').trim();
    expect(fileContent).toBe(INDEXNOW_KEY);
  });

  it('builds compliant IndexNow payload for custom domain and routes', () => {
    const appUrl = 'https://arii.github.io/tech-dancer';
    const urls = [
      'https://arii.github.io/tech-dancer/',
      'https://arii.github.io/tech-dancer/blog/wcs-basics',
      'https://arii.github.io/tech-dancer/blog/wcs-basics' // Duplicate to verify deduplication
    ];

    const payload = buildIndexNowPayload(appUrl, urls, INDEXNOW_KEY);

    expect(payload.host).toBe('arii.github.io');
    expect(payload.key).toBe(INDEXNOW_KEY);
    expect(payload.keyLocation).toBe(`https://arii.github.io/tech-dancer/${INDEXNOW_KEY}.txt`);
    expect(payload.urlList).toHaveLength(2);
    expect(payload.urlList).toContain('https://arii.github.io/tech-dancer/');
    expect(payload.urlList).toContain('https://arii.github.io/tech-dancer/blog/wcs-basics');
  });

  it('discovers site URLs fallback from route discovery utility', () => {
    const appUrl = 'https://boomtick.blog';
    const discovered = discoverSiteUrls(appUrl);

    expect(discovered.length).toBeGreaterThan(0);
    expect(discovered[0]).toContain('https://boomtick.blog');
    expect(discovered.some(u => u.includes('/blog'))).toBe(true);
  });

  it('executes dry-run submission without performing network requests', async () => {
    const appUrl = 'https://arii.github.io/tech-dancer';
    const result = await submitIndexNow({
      appUrl,
      urls: [`${appUrl}/blog/test-post`],
      dryRun: true
    });

    expect(result.success).toBe(true);
    expect(result.dryRun).toBe(true);
    expect(result.statusCode).toBe(200);
    expect(result.payload.host).toBe('arii.github.io');
    expect(result.payload.keyLocation).toBe(`${appUrl}/${INDEXNOW_KEY}.txt`);
    expect(result.payload.urlList).toEqual([`${appUrl}/blog/test-post`]);
  });

  it('handles API response statuses during submitIndexNow execution', async () => {
    const appUrl = 'https://arii.github.io/tech-dancer';
    const mockFetch = vi.fn().mockResolvedValue({
      status: 200,
      text: async () => 'OK'
    });
    vi.stubGlobal('fetch', mockFetch);

    const result = await submitIndexNow({
      appUrl,
      urls: [`${appUrl}/about`],
      dryRun: false
    });

    expect(result.success).toBe(true);
    expect(result.statusCode).toBe(200);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const fetchBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(fetchBody.host).toBe('arii.github.io');
    expect(fetchBody.urlList).toEqual([`${appUrl}/about`]);
  });
});
