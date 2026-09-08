import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const INDEX_HTML = path.join(DIST_DIR, 'index.html');
const ABOUT_INDEX_HTML = path.join(DIST_DIR, 'about', 'index.html');
const RESEARCH_INDEX_HTML = path.join(DIST_DIR, 'research', 'index.html');

describe('SPA Stubs & Root Meta Tag Generation', () => {
  beforeAll(() => {
    // Ensure build and postbuild scripts run so dist files are fresh
    if (!fs.existsSync(INDEX_HTML)) {
      execSync('pnpm run build', { stdio: 'inherit' });
    }
  }, 120000);

  it('injects route-specific metadata for the root route in dist/index.html', () => {
    expect(fs.existsSync(INDEX_HTML)).toBe(true);
    const indexContent = fs.readFileSync(INDEX_HTML, 'utf-8');

    expect(indexContent).toContain('<title>BoomTick.blog - West Coast Swing & AI Engineering</title>');
    expect(indexContent).toContain('<meta name="description" content="The West Coast Swing Lifestyle Blog by Tech Dancer. Training tips, travel guides, gear reviews, and AI engineering research." />');
    expect(indexContent).toContain('<link rel="canonical" href="https://boomtick.blog/" />');
    expect(indexContent).toContain('<meta property="og:title" content="BoomTick.blog - West Coast Swing & AI Engineering" />');
    expect(indexContent).toContain('<meta property="og:description" content="The West Coast Swing Lifestyle Blog by Tech Dancer. Training tips, travel guides, gear reviews, and AI engineering research." />');
    expect(indexContent).toContain('<meta name="twitter:title" content="BoomTick.blog - West Coast Swing & AI Engineering" />');
  });

  it('ensures sub-routes maintain their custom metadata without root tag pollution', () => {
    expect(fs.existsSync(ABOUT_INDEX_HTML)).toBe(true);
    const aboutContent = fs.readFileSync(ABOUT_INDEX_HTML, 'utf-8');

    expect(aboutContent).toContain('<title>About | BoomTick.blog</title>');
    expect(aboutContent).toContain('<link rel="canonical" href="https://boomtick.blog/about" />');
    expect(aboutContent).not.toContain('<link rel="canonical" href="https://boomtick.blog/" />');

    expect(fs.existsSync(RESEARCH_INDEX_HTML)).toBe(true);
    const researchContent = fs.readFileSync(RESEARCH_INDEX_HTML, 'utf-8');

    expect(researchContent).toContain('<title>Experiments | BoomTick.blog</title>');
    expect(researchContent).toContain('<link rel="canonical" href="https://boomtick.blog/research" />');
    expect(researchContent).not.toContain('<link rel="canonical" href="https://boomtick.blog/" />');
  });
});
