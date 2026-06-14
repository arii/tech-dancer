import fs from 'fs';
import path from 'path';

// Note: We avoid importing src/config/routes.ts directly to avoid complex dependency chains
// and alias resolution issues in a simple script. Instead, we define the core static routes
// and then discover dynamic ones from the content directory.

const STATIC_ROUTES = [
  '/',
  '/blog',
  '/events',
  '/research',
  '/merch',
  '/about',
  '/contact',
  '/subscribe'
];

const CONTENT_DIRS = {
  '/blog/:slug': 'content/posts',
  '/events/:slug': 'content/events',
  '/research/:id': 'content/studies'
};

function getSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));
}

async function discoverRoutes() {
  const routes = [...STATIC_ROUTES];

  for (const [pattern, dir] of Object.entries(CONTENT_DIRS)) {
    const slugs = getSlugs(dir);
    slugs.forEach(slug => {
      routes.push(pattern.replace(':slug', slug).replace(':id', slug));
    });
  }

  const outputDir = path.join(process.cwd(), 'artifacts', 'ux-audit');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'routes.json');
  fs.writeFileSync(outputPath, JSON.stringify({ routes }, null, 2));
  console.log(`Discovered ${routes.length} routes. Saved to ${outputPath}`);
}

discoverRoutes().catch(console.error);
