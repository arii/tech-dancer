import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';
import { getAllRoutes } from '../src/lib/routes-discovery.ts';
import { routes as ROUTE_CONFIGS, TOP_NAV_ROUTES } from '../src/config/routes.ts';
import { RESEARCH_TOOLS } from '../src/config/research-tools.ts';
import { parseFrontmatter } from '../src/lib/content/frontmatter.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const INDEX_HTML = path.join(DIST_DIR, 'index.html');
const BASE_URL = 'https://boomtick.blog';

// Shared sr-only treatment (visually hidden, accessible to screen readers) so
// the stub markup is zero-impact pre-hydration: no layout shift, no CLS.
const SR_ONLY_ATTRS = `class="sr-only" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0;"`;

// Automatically discover all routes
const { stubs: STUB_ROUTES } = getAllRoutes();

// Filter out root path as it already has index.html
const filteredRoutes = STUB_ROUTES.filter(route => route !== '/');

// Build map for static route metadata
const staticRouteMetaMap = new Map();
ROUTE_CONFIGS.forEach(r => {
  if (r.path && !r.path.includes(':') && r.path !== '*') {
    const isRoot = r.path === '/';
    const isServices = r.path === '/services';
    staticRouteMetaMap.set(r.path, {
      title: isRoot
        ? 'BoomTick.blog - West Coast Swing & AI Engineering'
        : (isServices
          ? 'Web Design & Digital Systems for San Francisco Creatives | BoomTick'
          : (r.label ? `${r.label} | BoomTick.blog` : 'BoomTick.blog - West Coast Swing & AI Engineering')),
      description: isServices
        ? 'Digital business systems and web design for San Francisco creatives, artists, and independent studios. Fast websites, booking systems, ecommerce, and workflow automation.'
        : 'West Coast Swing dance resources, custom apparel, gear guides, WCS Navigator event scheduling, and creator digital operations.',
      image: `${BASE_URL}/assets/home/wcs-travel-pack.webp`
    });
  }
});

// Build map for research tool metadata
RESEARCH_TOOLS.forEach(tool => {
  const toolRoute = tool.canonicalPath || `/research/${tool.id}`;
  staticRouteMetaMap.set(toolRoute, {
    title: `${tool.title} | BoomTick Research`,
    description: tool.description,
    image: tool.image ? (tool.image.startsWith('http') ? tool.image : `${BASE_URL}${tool.image.startsWith('/') ? '' : '/'}${tool.image}`) : `${BASE_URL}/assets/home/wcs-travel-pack.webp`
  });
});

// Load markdown metadata
const markdownMetaMap = new Map();

function loadMarkdownMeta(dirPath, routePrefix) {
  const fullPath = path.resolve(process.cwd(), dirPath);
  if (!fs.existsSync(fullPath)) return;

  const files = fs.readdirSync(fullPath);
  files.forEach(file => {
    if (!file.endsWith('.md')) return;
    const filePath = path.join(fullPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = parseFrontmatter(content);

    if (data.draft === true) return;

    const slug = file.replace(/\.md$/, '');
    const route = `${routePrefix}/${slug}`;

    let img = data.image || '/assets/home/wcs-travel-pack.webp';
    if (!img.startsWith('http')) {
      img = `${BASE_URL}${img.startsWith('/') ? '' : '/'}${img}`;
    }

    let computedTitle = '';
    if (data.seoTitle) {
      computedTitle = data.seoTitle.includes('BoomTick') ? data.seoTitle : `${data.seoTitle} | BoomTick`;
    } else if (data.title) {
      if (route.startsWith('/blog/') || route.startsWith('/gear/')) {
        computedTitle = `${data.title} | WCS Guide`;
      } else {
        computedTitle = `${data.title} | BoomTick`;
      }
    } else {
      computedTitle = 'BoomTick';
    }

    markdownMetaMap.set(route, {
      title: computedTitle,
      description: data.seoDescription || data.excerpt || data.description || 'BoomTick.blog West Coast Swing & AI research article.',
      image: img,
      rawTitle: data.title || slug,
      rawExcerpt: data.excerpt || data.description || '',
      date: data.updated || data.date || '',
      author: data.author || 'Ariel Anders'
    });
  });
}

loadMarkdownMeta('content/posts', '/blog');
loadMarkdownMeta('content/resources', '/gear');
loadMarkdownMeta('content/studies', '/research');

function getRouteMetadata(route) {
  if (markdownMetaMap.has(route)) {
    return markdownMetaMap.get(route);
  }
  if (staticRouteMetaMap.has(route)) {
    return staticRouteMetaMap.get(route);
  }

  // Fallbacks by prefix
  if (route.startsWith('/blog/')) {
    const slugName = route.replace('/blog/', '').replace(/-/g, ' ');
    return {
      title: `${slugName.charAt(0).toUpperCase() + slugName.slice(1)} | WCS Guide`,
      description: 'West Coast Swing guide, tips, and insights on BoomTick.',
      image: `${BASE_URL}/assets/home/wcs-travel-pack.webp`
    };
  }

  if (route.startsWith('/gear/')) {
    const slugName = route.replace('/gear/', '').replace(/-/g, ' ');
    return {
      title: `${slugName.charAt(0).toUpperCase() + slugName.slice(1)} | WCS Guide`,
      description: 'West Coast Swing gear review and dancer recommendation.',
      image: `${BASE_URL}/assets/home/wcs-travel-pack.webp`
    };
  }

  return {
    title: 'BoomTick - West Coast Swing & DevAI Research',
    description: 'West Coast Swing dance resources, custom apparel, gear guides, WCS Navigator event scheduling, and creator digital operations.',
    image: `${BASE_URL}/assets/home/wcs-travel-pack.webp`
  };
}

export function cleanInjectedHtml(html) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const toRemove = doc.head.querySelectorAll(
    'title, meta[name="description"], link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"], script[type="application/ld+json"], link[rel="preload"][as="image"]'
  );
  toRemove.forEach(el => el.remove());

  const rootEl = doc.getElementById('root');
  if (rootEl) {
    // Reset to the pristine build placeholder so stub generation is
    // idempotent: a rerun must not inherit a previously injected skeleton.
    rootEl.innerHTML = '';
  }

  return dom.serialize();
}

// Landmark skeleton mirroring the hydrated MainLayout shell so crawlers and
// no-JS visitors see the same nav/main/skip-link structure the SPA renders.
// Head-script handling is untouched: only the `#root` body changes, so any
// non-injected head script (e.g. a future AdSense loader) survives stub generation.
export function buildStubNavHtml() {
  const items = [
    { path: '/', label: 'Home' },
    ...TOP_NAV_ROUTES.map((route) => ({ path: route.path, label: route.label })),
  ];
  const links = items
    .map((item) => `<li><a href="${escapeHtml(item.path)}">${escapeHtml(item.label)}</a></li>`)
    .join('');
  return `<nav aria-label="Main Navigation" ${SR_ONLY_ATTRS}><ul>${links}</ul></nav>`;
}

export function buildStubRootHtml(headingText) {
  return `<div id="root">`
    + `<a href="#main-content" ${SR_ONLY_ATTRS}>Skip to Content</a>`
    + buildStubNavHtml()
    + `<main id="main-content"><h1 ${SR_ONLY_ATTRS}>${headingText}</h1></main>`
    + `</div>`;
}

export function buildStubHtml(cleanedIndexContent, route, meta) {
  const metaTags = generateMetadataTags(route, meta);
  const headingText = getPreRenderHeading(meta);

  // Inject meta tags into <head> and the landmark skeleton into <div id="root">
  let stubContent = cleanedIndexContent.replace('</head>', `    ${metaTags}\n  </head>`);
  stubContent = stubContent.replace('<div id="root"></div>', buildStubRootHtml(headingText));
  return stubContent;
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getPreRenderHeading(meta) {
  if (meta.rawTitle) {
    return escapeHtml((meta.rawTitle || '').slice(0, 150));
  }
  let title = meta.title || 'BoomTick.blog';
  if (title.includes(' | ')) {
    title = title.split(' | ')[0];
  }
  return escapeHtml(title.slice(0, 150));
}

function generateMetadataTags(route, meta) {
  const canonicalUrl = `${BASE_URL}${route}`;
  const title = (meta.title || '').replace(/"/g, '&quot;');
  const description = (meta.description || '').replace(/"/g, '&quot;');
  const image = meta.image;

  const publisherOrganization = {
    "@id": `${BASE_URL}/#organization`,
    "@type": "Organization",
    "name": "BoomTick",
    "url": BASE_URL,
    "email": "ari@boomtick.blog",
    "telephone": "+1-661-205-2489",
    "areaServed": "San Francisco, CA",
    "description": "West Coast Swing dance resources, custom apparel, gear guides, WCS Navigator event scheduling, and creator digital operations.",
    "knowsAbout": [
      "West Coast Swing",
      "Dance Event Scheduling & Technology",
      "Creator Operations & Automation",
      "Dance Apparel & Gear"
    ],
    "keywords": "West Coast Swing, WCS dance guides, social dancing, dance footwear, WCS competitions",
    "logo": {
      "@type": "ImageObject",
      "name": "BoomTick.blog Logo",
      "url": `${BASE_URL}/favicon.ico`
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "founder": {
      "@type": "Person",
      "name": "Ariel Anders",
      "jobTitle": "Roboticist & AI Engineer",
      "url": `${BASE_URL}/about`,
      "knowsAbout": [
        "West Coast Swing",
        "Robotics",
        "Artificial Intelligence"
      ],
      "sameAs": [
        "https://arii.github.io",
        "https://github.com/arii",
        "https://www.linkedin.com/in/ariel-anders/",
        "https://www.instagram.com/onasafari/"
      ]
    }
  };

  const schemas = [{ "@context": "https://schema.org", ...publisherOrganization }];

  if (route === '/') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "BoomTick.blog",
      "url": BASE_URL,
      "description": "West Coast Swing dance resources, custom apparel, gear guides, WCS Navigator event scheduling, and creator digital operations.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${BASE_URL}/blog?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    });
  }

  if (meta.rawTitle) {
    const articleLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": meta.rawTitle,
      "description": meta.rawExcerpt || meta.description,
      "image": image,
      "url": canonicalUrl,
      "author": {
        "@type": "Person",
        "name": meta.author || "Ariel Anders",
        "url": `${BASE_URL}/about`
      },
      "publisher": { "@id": `${BASE_URL}/#organization` }
    };
    if (meta.date) {
      articleLd.datePublished = meta.date;
      articleLd.dateModified = meta.date;
    }
    schemas.push(articleLd);
  } else {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": meta.title,
      "description": meta.description,
      "url": canonicalUrl,
      "publisher": { "@id": `${BASE_URL}/#organization` }
    });
  }

  const schemaJson = `<script data-rh="true" data-prerendered="true" type="application/ld+json">${JSON.stringify(schemas)}</script>`;

  const tags = [
    `<title data-rh="true" data-prerendered="true">${title}</title>`,
    `<meta data-rh="true" data-prerendered="true" name="description" content="${description}" />`,
    `<link data-rh="true" data-prerendered="true" rel="canonical" href="${canonicalUrl}" />`,
    `<meta data-rh="true" data-prerendered="true" property="og:type" content="website" />`,
    `<meta data-rh="true" data-prerendered="true" property="og:url" content="${canonicalUrl}" />`,
    `<meta data-rh="true" data-prerendered="true" property="og:title" content="${title}" />`,
    `<meta data-rh="true" data-prerendered="true" property="og:description" content="${description}" />`,
    `<meta data-rh="true" data-prerendered="true" property="og:image" content="${image}" />`,
    `<meta data-rh="true" data-prerendered="true" name="twitter:card" content="summary_large_image" />`,
    `<meta data-rh="true" data-prerendered="true" name="twitter:title" content="${title}" />`,
    `<meta data-rh="true" data-prerendered="true" name="twitter:description" content="${description}" />`,
    `<meta data-rh="true" data-prerendered="true" name="twitter:image" content="${image}" />`,
    schemaJson
  ];

  if (route === '/') {
    tags.unshift('<link rel="preload" as="image" href="/assets/home/wcs-travel-pack-400w.webp" imagesrcset="/assets/home/wcs-travel-pack-400w.webp 400w, /assets/home/wcs-travel-pack.webp 800w" imagesizes="(max-width: 640px) 100vw, 420px" fetchpriority="high" />');
  }

  return tags.join('\n    ');
}

async function generateStubs() {
  if (!fs.existsSync(INDEX_HTML)) {
    console.error('dist/index.html not found. Run build first.');
    process.exit(1);
  }

  const rawIndexContent = fs.readFileSync(INDEX_HTML, 'utf-8');
  const indexContent = cleanInjectedHtml(rawIndexContent);

  for (const route of filteredRoutes) {
    const dirPath = path.join(DIST_DIR, route);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const meta = getRouteMetadata(route);
    const stubContent = buildStubHtml(indexContent, route, meta);

    const targetFile = path.join(dirPath, 'index.html');
    fs.writeFileSync(targetFile, stubContent);
    console.log(`Generated stub for ${route}: ${targetFile}`);
  }

  // Inject metadata for root route ('/') into dist/index.html
  const rootMeta = getRouteMetadata('/');
  fs.writeFileSync(INDEX_HTML, buildStubHtml(indexContent, '/', rootMeta));
  console.log(`Injected root route metadata into ${INDEX_HTML}`);

  console.log('SPA stubs generated successfully.');
}

// Run only when invoked directly (postbuild), so tests can import the builders.
const invokedPath = process.argv[1] ? fs.realpathSync(process.argv[1]) : '';
const modulePath = fs.realpathSync(fileURLToPath(import.meta.url));
if (invokedPath === modulePath) {
  generateStubs().catch(err => {
    console.error('Failed to generate SPA stubs:', err);
    process.exit(1);
  });
}
