import fs from 'fs';
import path from 'path';

// Note: We avoid importing src/config/routes.ts directly to avoid complex dependency chains
// and alias resolution issues in a simple script. Instead, we define the core static routes
// and then discover dynamic ones from the content directory.

const STATIC_ROUTES = [
  '/',
  '/blog',
  '/gear',
  '/merch',
  '/about'
];

const CONTENT_DIRS = {
  '/blog/:slug': ['content/posts', 'content/blog'],
  '/gear/:slug': 'content/resources', // In this project, gear is mapped to resources
};

function getSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));
}

async function discoverRoutes() {
  const routes = [...STATIC_ROUTES];

  for (const [pattern, dirOrDirs] of Object.entries(CONTENT_DIRS)) {
    const dirs = Array.isArray(dirOrDirs) ? dirOrDirs : [dirOrDirs];
    for (const dir of dirs) {
      const slugs = getSlugs(dir);
      slugs.forEach(slug => {
        routes.push(pattern.replace(':slug', slug).replace(':id', slug));
      });
    }
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
