import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { JSDOM } from 'jsdom';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const INDEX_HTML = path.join(DIST_DIR, 'index.html');
const ABOUT_INDEX_HTML = path.join(DIST_DIR, 'about', 'index.html');
const RESEARCH_INDEX_HTML = path.join(DIST_DIR, 'research', 'index.html');

function findIndexHtmlFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findIndexHtmlFiles(filePath));
    } else if (file === 'index.html') {
      results.push(filePath);
    }
  }
  return results;
}

describe('SPA Stubs & Root Meta Tag Generation', () => {
  beforeAll(() => {
    // Ensure build and postbuild scripts run so dist files are fresh
    if (!fs.existsSync(INDEX_HTML)) {
      execSync('pnpm run build && pnpm run postbuild', { stdio: 'inherit' });
    } else {
      execSync('pnpm exec tsx scripts/generate-spa-stubs.mjs', { stdio: 'inherit' });
    }
  }, 120000);

  it('injects route-specific metadata for the root route in dist/index.html', () => {
    expect(fs.existsSync(INDEX_HTML)).toBe(true);
    const indexContent = fs.readFileSync(INDEX_HTML, 'utf-8');

    expect(indexContent).toContain('<title data-rh="true" data-prerendered="true">BoomTick.blog - West Coast Swing & AI Engineering</title>');
    expect(indexContent).toContain('<meta data-rh="true" data-prerendered="true" name="description" content="The West Coast Swing Lifestyle Blog by Tech Dancer. Training tips, travel guides, gear reviews, and AI engineering research." />');
    expect(indexContent).toContain('<link data-rh="true" data-prerendered="true" rel="canonical" href="https://boomtick.blog/" />');
    expect(indexContent).toContain('<meta data-rh="true" data-prerendered="true" property="og:title" content="BoomTick.blog - West Coast Swing & AI Engineering" />');
    expect(indexContent).toContain('<meta data-rh="true" data-prerendered="true" property="og:description" content="The West Coast Swing Lifestyle Blog by Tech Dancer. Training tips, travel guides, gear reviews, and AI engineering research." />');
    expect(indexContent).toContain('<meta data-rh="true" data-prerendered="true" name="twitter:title" content="BoomTick.blog - West Coast Swing & AI Engineering" />');
  });

  it('ensures sub-routes maintain their custom metadata without root tag pollution', () => {
    expect(fs.existsSync(ABOUT_INDEX_HTML)).toBe(true);
    const aboutContent = fs.readFileSync(ABOUT_INDEX_HTML, 'utf-8');

    expect(aboutContent).toContain('<title data-rh="true" data-prerendered="true">About | BoomTick.blog</title>');
    expect(aboutContent).toContain('<link data-rh="true" data-prerendered="true" rel="canonical" href="https://boomtick.blog/about" />');
    expect(aboutContent).not.toContain('<link rel="canonical" href="https://boomtick.blog/" />');

    expect(fs.existsSync(RESEARCH_INDEX_HTML)).toBe(true);
    const researchContent = fs.readFileSync(RESEARCH_INDEX_HTML, 'utf-8');

    expect(researchContent).toContain('<title data-rh="true" data-prerendered="true">Experiments | BoomTick.blog</title>');
    expect(researchContent).toContain('<link data-rh="true" data-prerendered="true" rel="canonical" href="https://boomtick.blog/research" />');
    expect(researchContent).not.toContain('<link rel="canonical" href="https://boomtick.blog/" />');
  });

  it('verifies strictly single title, meta description, and canonical tags before and after hydration across generated stubs', () => {
    const indexFiles = findIndexHtmlFiles(DIST_DIR).filter(p => !p.includes('previews/index.html'));
    expect(indexFiles.length).toBeGreaterThan(10);

    for (const filePath of indexFiles) {
      const relativePath = path.relative(DIST_DIR, filePath);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Check pre-rendered HTML DOM (before client-side hydration)
      const dom = new JSDOM(content);
      const doc = dom.window.document;

      const titles = doc.querySelectorAll('title');
      const descriptions = doc.querySelectorAll('meta[name="description"]');
      const canonicals = doc.querySelectorAll('link[rel="canonical"]');

      expect(titles.length, `Pre-rendered duplicate title found in ${relativePath}`).toBe(1);
      expect(descriptions.length, `Pre-rendered duplicate meta description found in ${relativePath}`).toBe(1);
      expect(canonicals.length, `Pre-rendered duplicate canonical link found in ${relativePath}`).toBe(1);

      // Verify that data-prerendered="true" and data-rh="true" are present
      expect(titles[0].getAttribute('data-prerendered')).toBe('true');
      expect(titles[0].getAttribute('data-rh')).toBe('true');

      // Simulate client-side mount / hydration cleanup (useLayoutEffect behavior from SEO.tsx)
      // and client-side Helmet tag injection
      const prerenderedTags = doc.querySelectorAll('head [data-prerendered="true"]');
      prerenderedTags.forEach(el => el.remove());

      const hydratedTitle = doc.createElement('title');
      hydratedTitle.setAttribute('data-rh', 'true');
      hydratedTitle.textContent = titles[0].textContent;
      doc.head.appendChild(hydratedTitle);

      const hydratedDesc = doc.createElement('meta');
      hydratedDesc.setAttribute('data-rh', 'true');
      hydratedDesc.setAttribute('name', 'description');
      hydratedDesc.setAttribute('content', descriptions[0].getAttribute('content') || '');
      doc.head.appendChild(hydratedDesc);

      const hydratedCanonical = doc.createElement('link');
      hydratedCanonical.setAttribute('data-rh', 'true');
      hydratedCanonical.setAttribute('rel', 'canonical');
      hydratedCanonical.setAttribute('href', canonicals[0].getAttribute('href') || '');
      doc.head.appendChild(hydratedCanonical);

      // Verify exactly 1 title, meta description, and canonical link remain in the DOM after hydration
      const postCleanupTitles = doc.querySelectorAll('title');
      const postCleanupDescriptions = doc.querySelectorAll('meta[name="description"]');
      const postCleanupCanonicals = doc.querySelectorAll('link[rel="canonical"]');

      expect(postCleanupTitles.length, `Post-hydration title count in ${relativePath}`).toBe(1);
      expect(postCleanupDescriptions.length, `Post-hydration meta description count in ${relativePath}`).toBe(1);
      expect(postCleanupCanonicals.length, `Post-hydration canonical link count in ${relativePath}`).toBe(1);
    }
  });

  it('verifies every generated route stub in dist/ contains a valid semantic <h1> tag under 150 characters', () => {
    const indexFiles = findIndexHtmlFiles(DIST_DIR);
    expect(indexFiles.length).toBeGreaterThan(10); // Expect all discovered sitemap route stubs

    for (const filePath of indexFiles) {
      const relativePath = path.relative(DIST_DIR, filePath);
      const content = fs.readFileSync(filePath, 'utf-8');

      const dom = new JSDOM(content);
      const h1Element = dom.window.document.querySelector('h1');
      expect(h1Element, `Missing static <h1> tag in pre-rendered stub: ${relativePath}`).not.toBeNull();

      if (h1Element) {
        const textOnly = (h1Element.textContent || '').trim();
        expect(textOnly.length, `Heading text empty in ${relativePath}`).toBeGreaterThan(0);
        expect(textOnly.length, `Heading text exceeds 150 chars in ${relativePath}: "${textOnly}"`).toBeLessThanOrEqual(150);
      }
    }
  });
});
