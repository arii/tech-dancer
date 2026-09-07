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
    staticRouteMetaMap.set(r.path, {
      title: r.label ? `${r.label} | BoomTick.blog` : 'BoomTick.blog - West Coast Swing & AI Engineering',
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

    markdownMetaMap.set(route, {
      title: data.seoTitle || (data.title ? `${data.title} | BoomTick.blog` : 'BoomTick.blog'),
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

function generateMetadataTags(route, meta) {
  const canonicalUrl = `${BASE_URL}${route}`;
  const title = meta.title.replace(/"/g, '&quot;');
  const description = meta.description.replace(/"/g, '&quot;');
  const image = meta.image;

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
      "publisher": {
        "@type": "Organization",
        "name": "BoomTick.blog",
        "url": BASE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/favicon.ico`
        }
      }
    };
    if (meta.date) {
      jsonLd.datePublished = meta.date;
      jsonLd.dateModified = meta.date;
    }
    schemaJson = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
  } else {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": meta.title,
      "description": meta.description,
      "url": canonicalUrl,
      "publisher": {
        "@type": "Organization",
        "name": "BoomTick.blog",
        "url": BASE_URL
      }
    };
    schemaJson = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
  }

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${canonicalUrl}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${canonicalUrl}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    schemaJson
  ].join('\n    ');
}

async function generateStubs() {
  if (!fs.existsSync(INDEX_HTML)) {
    console.error('dist/index.html not found. Run build first.');
    process.exit(1);
  }

  const indexContent = fs.readFileSync(INDEX_HTML, 'utf-8');

  for (const route of filteredRoutes) {
    const dirPath = path.join(DIST_DIR, route);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const meta = getRouteMetadata(route);
    const metaTags = generateMetadataTags(route, meta);

    // Inject meta tags into <head>
    const stubContent = indexContent.replace('</head>', `    ${metaTags}\n  </head>`);

    const targetFile = path.join(dirPath, 'index.html');
    fs.writeFileSync(targetFile, stubContent);
    console.log(`Generated stub for ${route}: ${targetFile}`);
  }

  console.log('SPA stubs generated successfully.');
}

generateStubs().catch(err => {
  console.error('Failed to generate SPA stubs:', err);
  process.exit(1);
});
