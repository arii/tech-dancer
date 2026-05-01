import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { getAllRoutes } from '../src/lib/routes-discovery.ts';

const DIST_DIR = path.resolve(__dirname, '../dist');
const INDEX_HTML = path.join(DIST_DIR, 'index.html');

// Automatically discover all routes
const { all: STUB_ROUTES } = getAllRoutes();

// Filter out root path as it already has index.html
const filteredRoutes = STUB_ROUTES.filter(route => route !== '/');

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
