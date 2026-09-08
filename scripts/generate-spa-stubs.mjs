import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml';
import { getAllRoutes } from '../src/lib/routes-discovery.ts';
import { routes as ROUTE_CONFIGS } from '../src/config/routes.ts';
import { RESEARCH_TOOLS } from '../src/config/research-tools.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const INDEX_HTML = path.join(DIST_DIR, 'index.html');
const BASE_URL = 'https://boomtick.blog';

function parseFrontmatter(content) {
  if (!content || typeof content !== 'string' || !content.startsWith('---')) {
    return { data: {}, content: content || '' };
  }

  const lineBreakLen = content.slice(3).startsWith('\r\n') ? 2 : (content.slice(3).startsWith('\n') ? 1 : 0);
  if (lineBreakLen === 0) return { data: {}, content };

  const startOffset = 3 + lineBreakLen;
  const match = content.slice(startOffset).match(/(?:^|\r?\n)---(?:\r?\n|$)/);
  if (!match || match.index === undefined) return { data: {}, content };

  const yamlEndIndex = startOffset + match.index;
  const yamlStr = content.slice(startOffset, yamlEndIndex).trim();
  const body = content.slice(yamlEndIndex + match[0].length);

  try {
    const data = parse(yamlStr);
    return { data: (data && typeof data === 'object') ? data : {}, content: body };
  } catch {
    return { data: {}, content: body };
  }
}

// Automatically discover all routes
const { stubs: STUB_ROUTES } = getAllRoutes();

// Filter out root path as it already has index.html
const filteredRoutes = STUB_ROUTES.filter(route => route !== '/');

// Build map for static route metadata
const staticRouteMetaMap = new Map();
ROUTE_CONFIGS.forEach(r => {
  if (r.path && !r.path.includes(':') && r.path !== '*') {
    const isRoot = r.path === '/';
    staticRouteMetaMap.set(r.path, {
      title: isRoot ? 'BoomTick.blog - West Coast Swing & AI Engineering' : (r.label ? `${r.label} | BoomTick.blog` : 'BoomTick.blog - West Coast Swing & AI Engineering'),
      description: 'The West Coast Swing Lifestyle Blog by Tech Dancer. Training tips, travel guides, gear reviews, and AI engineering research.',
      image: `${BASE_URL}/assets/comp_analysis_hero.webp`
    });
  }
});

// Build map for research tool metadata
RESEARCH_TOOLS.forEach(tool => {
  const toolRoute = tool.canonicalPath || `/research/${tool.id}`;
  staticRouteMetaMap.set(toolRoute, {
    title: `${tool.title} | BoomTick Research`,
    description: tool.description,
    image: tool.image ? (tool.image.startsWith('http') ? tool.image : `${BASE_URL}${tool.image.startsWith('/') ? '' : '/'}${tool.image}`) : `${BASE_URL}/assets/comp_analysis_hero.webp`
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

    let img = data.image || '/assets/comp_analysis_hero.webp';
    if (!img.startsWith('http')) {
      img = `${BASE_URL}${img.startsWith('/') ? '' : '/'}${img}`;
    }

    const computedTitle = data.seoTitle
      ? (data.seoTitle.includes('BoomTick') ? data.seoTitle : `${data.seoTitle} | BoomTick.blog`)
      : (data.title ? `${data.title} | BoomTick.blog` : 'BoomTick.blog');

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
      title: `${slugName.charAt(0).toUpperCase() + slugName.slice(1)} | BoomTick.blog`,
      description: 'West Coast Swing guide, tips, and insights on BoomTick.blog.',
      image: `${BASE_URL}/assets/comp_analysis_hero.webp`
    };
  }

  if (route.startsWith('/gear/')) {
    const slugName = route.replace('/gear/', '').replace(/-/g, ' ');
    return {
      title: `${slugName.charAt(0).toUpperCase() + slugName.slice(1)} | BoomTick Gear`,
      description: 'West Coast Swing gear review and dancer recommendation.',
      image: `${BASE_URL}/assets/comp_analysis_hero.webp`
    };
  }

  return {
    title: 'BoomTick.blog - West Coast Swing & DevAI Research',
    description: 'The West Coast Swing Lifestyle Blog by Tech Dancer. Training tips, travel guides, gear reviews, and DevAI research.',
    image: `${BASE_URL}/assets/comp_analysis_hero.webp`
  };
}

function cleanInjectedHead(html) {
  return html
    .replace(/<title.*?>.*?<\/title>\s*/gi, '')
    .replace(/<meta name="description".*?\/>\s*/gi, '')
    .replace(/<link rel="canonical".*?\/>\s*/gi, '')
    .replace(/<meta property="og:.*?".*?\/>\s*/gi, '')
    .replace(/<meta name="twitter:.*?".*?\/>\s*/gi, '')
    .replace(/<script type="application\/ld\+json".*?>.*?<\/script>\s*/gi, '');
}

function cleanInjectedRoot(html) {
  return html.replace(/<div id="root"><h1 class="sr-only".*?><\/h1><\/div>/gi, '<div id="root"></div>');
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
    return escapeHtml(meta.rawTitle).slice(0, 150);
  }
  let title = meta.title || 'BoomTick.blog';
  if (title.includes(' | ')) {
    title = title.split(' | ')[0];
  }
  return escapeHtml(title).slice(0, 150);
}

function generateMetadataTags(route, meta) {
  const canonicalUrl = `${BASE_URL}${route}`;
  const title = meta.title.replace(/"/g, '&quot;');
  const description = meta.description.replace(/"/g, '&quot;');
  const image = meta.image;

  const publisherOrganization = {
    "@type": "Organization",
    "name": "BoomTick (BoomTick.blog)",
    "url": BASE_URL,
    "email": "ari@boomtick.blog",
    "description": "West Coast Swing dance resources, event guides, competition timing mechanics, and custom dancer apparel.",
    "knowsAbout": [
      "West Coast Swing",
      "Social Dancing",
      "Dance Mechanics and Timing",
      "WCS Event Travel and Logistics"
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
        "https://arii.github.io/",
        "https://github.com/arii",
        "https://www.linkedin.com/in/ariel-anders/",
        "https://www.instagram.com/onasafari/"
      ]
    }
  };

  let schemaJson = '';
  if (meta.rawTitle) {
    const jsonLd = {
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
      "publisher": publisherOrganization
    };
    if (meta.date) {
      jsonLd.datePublished = meta.date;
      jsonLd.dateModified = meta.date;
    }
    schemaJson = `<script data-rh="true" data-prerendered="true" type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
  } else {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": meta.title,
      "description": meta.description,
      "url": canonicalUrl,
      "publisher": publisherOrganization
    };
    schemaJson = `<script data-rh="true" data-prerendered="true" type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
  }

  return [
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
  ].join('\n    ');
}

async function generateStubs() {
  if (!fs.existsSync(INDEX_HTML)) {
    console.error('dist/index.html not found. Run build first.');
    process.exit(1);
  }

  const rawIndexContent = fs.readFileSync(INDEX_HTML, 'utf-8');
  const indexContent = cleanInjectedRoot(cleanInjectedHead(rawIndexContent));

  for (const route of filteredRoutes) {
    const dirPath = path.join(DIST_DIR, route);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const meta = getRouteMetadata(route);
    const metaTags = generateMetadataTags(route, meta);

    const headingText = getPreRenderHeading(meta);
    const rootHtml = `<div id="root"><h1 class="sr-only" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0;">${headingText}</h1></div>`;

    // Inject meta tags into <head> and fallback h1 into <div id="root">
    let stubContent = indexContent.replace('</head>', `    ${metaTags}\n  </head>`);
    stubContent = stubContent.replace('<div id="root"></div>', rootHtml);

    const targetFile = path.join(dirPath, 'index.html');
    fs.writeFileSync(targetFile, stubContent);
    console.log(`Generated stub for ${route}: ${targetFile}`);
  }

  // Inject metadata for root route ('/') into dist/index.html
  const rootMeta = getRouteMetadata('/');
  const rootMetaTags = generateMetadataTags('/', rootMeta);
  const rootHeadingText = getPreRenderHeading(rootMeta);
  const rootRootHtml = `<div id="root"><h1 class="sr-only" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0;">${rootHeadingText}</h1></div>`;

  let rootContent = indexContent.replace('</head>', `    ${rootMetaTags}\n  </head>`);
  rootContent = rootContent.replace('<div id="root"></div>', rootRootHtml);
  fs.writeFileSync(INDEX_HTML, rootContent);
  console.log(`Injected root route metadata into ${INDEX_HTML}`);

  console.log('SPA stubs generated successfully.');
}

generateStubs().catch(err => {
  console.error('Failed to generate SPA stubs:', err);
  process.exit(1);
});
