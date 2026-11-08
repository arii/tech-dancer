import { describe, it, expect } from 'vitest';
import { normalizeAsset, normalizeStatus } from '../assets';
import { readingTime, normalizeReadTime } from '../utils';
import { parseFrontmatter } from '../frontmatter';
import { ASSET_PREFIX } from '@/config/constants';

describe('src/lib/content/assets', () => {
  it('normalizes asset paths correctly', () => {
    expect(normalizeAsset('')).toBeUndefined();
    expect(normalizeAsset(undefined)).toBeUndefined();
    expect(normalizeAsset(null)).toBeUndefined();
    expect(normalizeAsset(123)).toBe(123);
    expect(normalizeAsset('/assets/img.webp')).toBe(`${ASSET_PREFIX}/assets/img.webp`);
    expect(normalizeAsset(`${ASSET_PREFIX}/assets/img.webp`)).toBe(`${ASSET_PREFIX}/assets/img.webp`);
    expect(normalizeAsset('https://example.com/img.webp')).toBe('https://example.com/img.webp');
  });

  it('normalizes content status correctly', () => {
    expect(normalizeStatus('published')).toBe('published');
    expect(normalizeStatus('Published')).toBe('published');
    expect(normalizeStatus('draft')).toBe('draft');
    expect(normalizeStatus('planned')).toBe('planned');
    expect(normalizeStatus('invalid')).toBeUndefined();
    expect(normalizeStatus(null)).toBeUndefined();
    expect(normalizeStatus(123)).toBeUndefined();
  });
});

describe('src/lib/content/utils', () => {
  it('normalizes read time values correctly', () => {
    expect(normalizeReadTime(5)).toBe(5);
    expect(normalizeReadTime('5 min read')).toBe(5);
    expect(normalizeReadTime('invalid')).toBeUndefined();
    expect(normalizeReadTime(null)).toBeUndefined();
  });

  it('calculates reading time from content and excerpt fallback', () => {
    const text200 = Array(200).fill('word').join(' ');
    expect(readingTime(text200)).toBe(1);

    const text400 = Array(400).fill('word').join(' ');
    expect(readingTime(text400)).toBe(2);

    // 'word '.repeat(40) splits to 41 tokens (trailing space) -> 41/20 = 2.05 -> Math.ceil = 3,
    // matching the audited Math.ceil excerpt proxy in src/lib/content/utils.ts.
    expect(readingTime('', 'word '.repeat(40))).toBe(3);
    expect(readingTime('', '')).toBe(1);
    expect(readingTime(undefined, undefined)).toBe(1);
  });
});

describe('src/lib/content/frontmatter', () => {
  it('handles empty or non-frontmatter text gracefully', () => {
    expect(parseFrontmatter('')).toEqual({ data: {}, content: '' });
    expect(parseFrontmatter(null as unknown as string)).toEqual({ data: {}, content: '' });
    expect(parseFrontmatter('Just regular text')).toEqual({ data: {}, content: 'Just regular text' });
  });

  it('handles malformed frontmatter without crash', () => {
    const malformed = `---
unclosed_key: [incomplete
---
Body text`;
    const result = parseFrontmatter(malformed);
    expect(result.content).toBe('Body text');
  });

  it('parses arrays and boolean values', () => {
    const raw = `---
published: true
draft: false
tags: [tag1, tag2]
count: 42
---
Post body`;
    const { data, content } = parseFrontmatter(raw);
    expect(data.published).toBe(true);
    expect(data.draft).toBe(false);
    expect(data.tags).toEqual(['tag1', 'tag2']);
    expect(data.count).toBe(42);
    expect(content.trim()).toBe('Post body');
  });
});
