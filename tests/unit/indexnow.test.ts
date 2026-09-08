import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import { generateIndexNowKeyFile, getIndexNowKey } from '../../scripts/generate-indexnow.js';
import { buildIndexNowPayload } from '../../scripts/submit-indexnow.js';

describe('IndexNow Generator & Submission Utility', () => {
  const originalEnv = process.env;
  const publicDir = path.resolve(process.cwd(), 'public');
  const distDir = path.resolve(process.cwd(), 'dist');

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.INDEXNOW_KEY;
    delete process.env.VITE_INDEXNOW_KEY;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('retrieves IndexNow key from INDEXNOW_KEY or VITE_INDEXNOW_KEY', () => {
    expect(getIndexNowKey()).toBeNull();

    process.env.VITE_INDEXNOW_KEY = 'vitekey123';
    expect(getIndexNowKey()).toBe('vitekey123');

    process.env.INDEXNOW_KEY = 'mainkey456';
    expect(getIndexNowKey()).toBe('mainkey456');
  });

  it('skips key generation when environment key is absent', () => {
    const result = generateIndexNowKeyFile();
    expect(result).toBeNull();
  });

  it('generates public/<key>.txt and dist/<key>.txt when environment key is provided', () => {
    const testKey = 'testkey789';
    process.env.INDEXNOW_KEY = testKey;

    const testFile = path.join(publicDir, `${testKey}.txt`);

    try {
      const generatedKey = generateIndexNowKeyFile();
      expect(generatedKey).toBe(testKey);

      expect(fs.existsSync(testFile)).toBe(true);
      expect(fs.readFileSync(testFile, 'utf-8')).toBe(`${testKey}\n`);
    } finally {
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
      }
    }
  });

  it('constructs correct payload for IndexNow submission', () => {
    const testKey = 'payloadkey123';
    process.env.INDEXNOW_KEY = testKey;

    const payload = buildIndexNowPayload('https://boomtick.blog/', testKey);
    expect(payload).not.toBeNull();
    expect(payload?.host).toBe('boomtick.blog');
    expect(payload?.key).toBe(testKey);
    expect(payload?.keyLocation).toBe(`https://boomtick.blog/${testKey}.txt`);
    expect(Array.isArray(payload?.urlList)).toBe(true);
    expect(payload?.urlList.length).toBeGreaterThan(0);
    expect(payload?.urlList).toContain('https://boomtick.blog/');
    expect(payload?.urlList).toContain('https://boomtick.blog/blog');
  });
});
