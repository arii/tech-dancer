import { describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';
import { TOP_NAV_ROUTES } from '@/config/routes';
import {
  buildStubHtml,
  buildStubNavHtml,
  buildStubRootHtml,
  cleanInjectedHtml,
} from '../../scripts/generate-spa-stubs.mjs';

const FIXTURE_INDEX = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script type="application/ld+json">{"@type":"PreExisting"}</script>
    <script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" async></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

const SAMPLE_ROUTES = [
  { route: '/', meta: { title: 'BoomTick.blog', description: 'Home', image: 'https://boomtick.blog/a.webp' } },
  { route: '/blog', meta: { title: 'Blog Posts | BoomTick.blog', description: 'Posts', image: 'https://boomtick.blog/a.webp' } },
  { route: '/blog/sample-post', meta: { title: 'Sample Post | WCS Guide', description: 'A post', image: 'https://boomtick.blog/a.webp', rawTitle: 'Sample Post' } },
  { route: '/privacy', meta: { title: 'Privacy Policy | BoomTick.blog', description: 'Privacy', image: 'https://boomtick.blog/a.webp' } },
];

function parse(html: string) {
  return new JSDOM(html).window.document;
}

describe('SPA stub landmark skeleton', () => {
  it('emits skip link, main navigation, and main landmark inside #root', () => {
    const doc = parse(buildStubRootHtml('Sample Heading'));

    const skipLink = doc.querySelector('#root > a[href="#main-content"]');
    expect(skipLink?.textContent).toBe('Skip to Content');

    const nav = doc.querySelector('#root > nav[aria-label="Main Navigation"]');
    expect(nav).not.toBeNull();

    const main = doc.querySelector('#root > main#main-content');
    expect(main).not.toBeNull();
    expect(main?.querySelector('h1.sr-only')?.textContent).toBe('Sample Heading');
  });

  it('nav skeleton mirrors the hydrated top-nav link set', () => {
    const doc = parse(buildStubNavHtml());
    const links = Array.from(doc.querySelectorAll('a')).map((a) => ({
      href: a.getAttribute('href'),
      label: a.textContent,
    }));

    expect(links).toContainEqual({ href: '/', label: 'Home' });
    for (const route of TOP_NAV_ROUTES) {
      expect(links).toContainEqual({ href: route.path, label: route.label });
    }
  });

  it.each(SAMPLE_ROUTES.map(({ route }) => [route]))(
    'stub for %s preserves head processing and injects landmarks',
    (route) => {
      const meta = SAMPLE_ROUTES.find((r) => r.route === route)!.meta;
      const stub = buildStubHtml(FIXTURE_INDEX, route, meta);
      const doc = parse(stub);

      // Landmarks land inside #root, replacing the empty placeholder exactly once
      expect(stub.indexOf('<div id="root">')).toBe(stub.lastIndexOf('<div id="root">'));
      expect(doc.querySelector('#root > nav[aria-label="Main Navigation"]')).not.toBeNull();
      expect(doc.querySelector('#root > main#main-content')).not.toBeNull();
      expect(doc.querySelector('#root > a[href="#main-content"]')).not.toBeNull();

      // Prerendered head markers preserved
      expect(doc.querySelector('title[data-rh="true"][data-prerendered="true"]')).not.toBeNull();
      expect(doc.querySelector('meta[name="description"][data-prerendered="true"]')).not.toBeNull();

      // Existing JSON-LD is untouched and the per-route schema is injected
      const ldJson = doc.querySelectorAll('script[type="application/ld+json"]');
      expect(ldJson.length).toBe(2);
      expect(ldJson[0].textContent).toContain('PreExisting');

      // Non-injected head scripts (future AdSense loader) survive stub generation
      expect(doc.querySelector('script[src*="adsbygoogle"]')).not.toBeNull();
    }
  );

  it('cleanInjectedHtml strips injected head tags but keeps third-party scripts', () => {
    const dirty = FIXTURE_INDEX.replace(
      '</head>',
      '<title data-rh="true">Old</title><meta property="og:title" content="Old" /></head>'
    );
    const doc = parse(cleanInjectedHtml(dirty));

    expect(doc.querySelector('title')).toBeNull();
    expect(doc.querySelector('meta[property="og:title"]')).toBeNull();
    expect(doc.querySelector('script[src*="adsbygoogle"]')).not.toBeNull();
    // Non-root body content is untouched; the root placeholder is reset
    expect(doc.querySelector('#root')).not.toBeNull();
    expect(doc.getElementById('root')?.innerHTML).toBe('');
  });

  it('stub generation is idempotent: reruns rebuild the skeleton, h1 included', () => {
    const firstPass = buildStubHtml(FIXTURE_INDEX, '/blog', SAMPLE_ROUTES[1].meta);

    // A rerun cleans the previously stubbed dist/index.html in place
    const cleaned = cleanInjectedHtml(firstPass);
    const secondPass = buildStubHtml(cleaned, '/blog', SAMPLE_ROUTES[1].meta);
    const doc = parse(secondPass);

    expect(secondPass.indexOf('<div id="root">')).toBe(secondPass.lastIndexOf('<div id="root">'));
    expect(doc.querySelector('#root > a[href="#main-content"]')).not.toBeNull();
    expect(doc.querySelector('#root > nav[aria-label="Main Navigation"]')).not.toBeNull();
    expect(doc.querySelector('#root > main#main-content')).not.toBeNull();
    // The prerendered h1 must survive regeneration (the test that reads dist/
    // stubs asserts it), not only appear on the first pass
    expect(doc.querySelector('main#main-content > h1.sr-only')?.textContent).toBe('Blog Posts');
  });
});
