/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parseFrontmatter } from '@/lib/content/frontmatter';

const POSTS_DIR = join(__dirname, '..', '..', 'content', 'posts');
const AFFILIATES_PATH = join(__dirname, '..', '..', 'src', 'data', 'affiliates.json');
const PUBLIC_POSTS_ASSETS = join(__dirname, '..', '..', 'public', 'assets', 'posts');

/** The growth-pass batch date — these posts must meet the full SEO contract. */
const BATCH_DATE = '2026-11-13';

type Frontmatter = Record<string, unknown>;

const listPostFiles = (): string[] =>
  readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort();

const loadPost = (file: string): { file: string; frontmatter: Frontmatter; body: string } => {
  const raw = readFileSync(join(POSTS_DIR, file), 'utf-8');
  const { data, content } = parseFrontmatter(raw);
  return { file, frontmatter: data, body: content };
};

const affiliates = JSON.parse(readFileSync(AFFILIATES_PATH, 'utf-8')) as Record<string, unknown>;
const affiliateIds = new Set(Object.keys(affiliates));

const asArray = (value: unknown): string[] => (Array.isArray(value) ? value.map(String) : value ? [String(value)] : []);

const extractInlineAffiliateIds = (body: string): string[] =>
  Array.from(body.matchAll(/<notice\s+type=["']affiliate["']\s+id=["']([^"']+)["']/gi)).map((m) => m[1]);

describe('content posts — every post', () => {
  const files = listPostFiles();

  it('has posts to validate', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)('$file has required core fields and resolvable affiliateIds', (file) => {
    const { frontmatter, body } = loadPost(file);

    expect(frontmatter.title, 'title').toBeTruthy();
    expect(frontmatter.category, 'category').toBeTruthy();
    expect(frontmatter.excerpt, 'excerpt').toBeTruthy();
    expect(String(frontmatter.date)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(asArray(frontmatter.tags).length, 'tags').toBeGreaterThan(0);
    expect(body.trim().length, 'body content').toBeGreaterThan(0);

    for (const id of asArray(frontmatter.affiliateIds)) {
      expect(affiliateIds, `frontmatter affiliateIds entry "${id}"`).toContain(id);
    }

    for (const id of extractInlineAffiliateIds(body)) {
      expect(affiliateIds, `inline <notice> id "${id}"`).toContain(id);
    }
  });
});

describe('content posts — growth pass batch', () => {
  const batchFiles = listPostFiles().filter((f) => {
    const { frontmatter } = loadPost(f);
    return String(frontmatter.date) === BATCH_DATE;
  });

  it('contains the approved 8-10 post batch', () => {
    expect(batchFiles.length).toBeGreaterThanOrEqual(8);
    expect(batchFiles.length).toBeLessThanOrEqual(10);
  });

  it.each(batchFiles)('$file meets the full SEO and monetization contract', (file) => {
    const { frontmatter, body } = loadPost(file);
    const slug = file.replace(/\.md$/, '');

    for (const field of ['seoTitle', 'seoDescription', 'image', 'imageAlt', 'author']) {
      expect(frontmatter[field], field).toBeTruthy();
    }
    expect(String(frontmatter.image)).toBe(`/assets/posts/${slug}.webp`);
    expect(existsSync(join(PUBLIC_POSTS_ASSETS, `${slug}.webp`)), 'hero webp exists').toBe(true);

    const ids = asArray(frontmatter.affiliateIds);
    expect(ids.length, '2-4 affiliateIds').toBeGreaterThanOrEqual(2);
    expect(ids.length, '2-4 affiliateIds').toBeLessThanOrEqual(4);
    for (const id of ids) {
      expect(affiliateIds, `affiliateId "${id}"`).toContain(id);
    }

    const inline = extractInlineAffiliateIds(body);
    expect(inline.length, 'inline affiliate notices').toBeGreaterThan(0);
    for (const id of inline) {
      expect(affiliateIds, `inline <notice> id "${id}"`).toContain(id);
    }
  });
});
