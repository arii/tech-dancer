import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

async function runLighthouse() {
  const routesPath = path.join(process.cwd(), 'artifacts', 'ux-audit', 'routes.json');
  if (!fs.existsSync(routesPath)) {
    console.error('routes.json not found. Run route discovery first.');
    process.exit(1);
  }

  const { routes } = JSON.parse(fs.readFileSync(routesPath, 'utf-8'));
  const config = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'boomtick-pkg', 'cli', 'ux-audit.config.json'), 'utf-8'));

  const lighthouseDir = path.join(process.cwd(), 'artifacts', 'ux-audit', 'lighthouse');
  if (!fs.existsSync(lighthouseDir)) {
    fs.mkdirSync(lighthouseDir, { recursive: true });
  }

  // We'll limit to a subset of important routes if there are too many,
  // or just run for the ones requested. For now, let's just do a few key ones.
  const keyRoutes = routes.filter((r: string) => !r.includes(':') && routes.indexOf(r) < 10);

  for (const route of keyRoutes) {
    const url = `${config.baseUrl}${route}`;
    const slug = route.replace(/\//g, '_') || 'home';
    const reportPath = path.join(lighthouseDir, slug);

    console.log(`Running Lighthouse for ${url}...`);
    try {
      // Using lhci if available, otherwise fallback to lighthouse CLI if installed globally/locally
      // Here we assume lhci autorun might be overkill for a specific route runner,
      // but let's use the lighthouse CLI directly.
      execFileSync('npx', [
        'lighthouse',
        url,
        '--output=json',
        '--output=html',
        `--output-path=${reportPath}`,
        '--chrome-flags=--headless',
        '--only-categories=performance,accessibility,best-practices,seo'
      ], { stdio: 'inherit' });
    } catch (error) {
      console.error(`Lighthouse failed for ${route}:`, error);
    }
  }
}

runLighthouse().catch(console.error);
