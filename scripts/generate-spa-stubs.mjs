import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { CONTENT_DIR_MAP, getContentSlugs } from './content-loader.ts';

const DIST_DIR = path.resolve(__dirname, '../dist');
const INDEX_HTML = path.join(DIST_DIR, 'index.html');

// Static routes
const STATIC_ROUTES = [
  '/blog',
  '/gear',
  '/research',
  '/ux-auditor',
  '/about',
  '/contact',
];

// Dynamic routes from content
const DYNAMIC_ROUTES = Object.entries(CONTENT_DIR_MAP).flatMap(([prefix, dir]) =>
  getContentSlugs(dir, prefix)
);

const STUB_ROUTES = [...STATIC_ROUTES, ...DYNAMIC_ROUTES];

async function generateStubs() {
  if (!fs.existsSync(INDEX_HTML)) {
    console.error('dist/index.html not found. Run build first.');
    process.exit(1);
  }

  const indexContent = fs.readFileSync(INDEX_HTML, 'utf-8');

  for (const route of STUB_ROUTES) {
    const dirPath = path.join(DIST_DIR, route);
    
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const targetFile = path.join(dirPath, 'index.html');
    fs.writeFileSync(targetFile, indexContent);
    console.log(`Generated stub for ${route}: ${targetFile}`);
  }

  console.log('SPA stubs generated successfully.');
}

generateStubs().catch(err => {
  console.error('Failed to generate SPA stubs:', err);
  process.exit(1);
});
