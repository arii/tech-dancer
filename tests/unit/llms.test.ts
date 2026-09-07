import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';

describe('llms.txt and llms-full.txt GEO integrity', () => {
  const publicDir = path.resolve(process.cwd(), 'public');
  const llmsPath = path.join(publicDir, 'llms.txt');
  const llmsFullPath = path.join(publicDir, 'llms-full.txt');

  it('should verify public/llms.txt exists and conforms to llmstxt.org specification', () => {
    expect(fs.existsSync(llmsPath)).toBe(true);
    const content = fs.readFileSync(llmsPath, 'utf-8');

    // Should start with a title header
    expect(content).toMatch(/^#\s+BoomTick\.blog/m);

    // Should contain summary block quote
    expect(content).toMatch(/^>\s+BoomTick\.blog is/m);

    // Should contain primary sections
    expect(content).toContain('## Core West Coast Swing Guides & Tutorials');
    expect(content).toContain('## Curated Gear & Footwear Reviews');
    expect(content).toContain('## AI Engineering & DevAI Research Tools');
    expect(content).toContain('## About the Author');

    // Should contain required links
    expect(content).toContain('https://boomtick.blog/blog/2026-04-18-make-shoe-dance');
    expect(content).toContain('https://boomtick.blog/blog/2026-06-01-event-travel-packing');
    expect(content).toContain('https://boomtick.blog/versiontruth');
    expect(content).toContain('https://boomtick.blog/wcs-navigator');
    expect(content).toContain('https://boomtick.blog/about');
    expect(content).toContain('https://arii.github.io');
  });

  it('should verify public/llms-full.txt exists with extended context and content overviews', () => {
    expect(fs.existsSync(llmsFullPath)).toBe(true);
    const content = fs.readFileSync(llmsFullPath, 'utf-8');

    // Should start with title
    expect(content).toMatch(/^#\s+BoomTick\.blog/m);

    // Should contain extended sections
    expect(content).toContain('## 1. West Coast Swing (WCS) Primary Knowledge Base');
    expect(content).toContain('## 2. DevAI & AI Software Engineering Research Portfolio');
    expect(content).toContain('## 3. Author Profile & E-E-A-T Information');

    // Should contain detailed topics
    expect(content).toContain('DIY Suede Shoe Modification');
    expect(content).toContain('Event Travel & Packing Essentials');
    expect(content).toContain('Competition Metrics & Relative Placement');
    expect(content).toContain('VersionTruth');
    expect(content).toContain('WCS Navigator');
    expect(content).toContain('Ariel Anders, PhD');
    expect(content).toContain('https://arii.github.io');
  });
});
