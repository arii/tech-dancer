import fs from 'fs';
import path from 'path';

export function getRouteMap(): Record<string, string> {
  const routesPath = path.resolve(process.cwd(), 'src/config/routes.ts');
  const fileContent = fs.readFileSync(routesPath, 'utf8');

  // Simple parser to extract path and lazy loading component
  const routeMap: Record<string, string> = {};

  // Matches blocks like:
  // path: '/blog/:slug',
  // lazy: () => import('@/pages/BlogPost').then(...)
  const routeRegex = /path:\s*['"]([^'"]+)['"][\s\S]*?(?:lazy:\s*\(\)\s*=>\s*import\(['"]@\/([^'"]+)['"]\)|Component:\s*\(\)\s*=>)/g;

  let match;
  while ((match = routeRegex.exec(fileContent)) !== null) {
    const routePath = match[1];
    const componentPathStr = match[2];

    if (componentPathStr) {
      // e.g. 'pages/Home' -> 'src/pages/Home.tsx'
      // We will assume .tsx for all of them based on typical React setup
      const fullPath = `src/${componentPathStr}.tsx`;
      routeMap[fullPath] = routePath;
    }
  }

  // Handle specific edge case, if Component is defined directly, it might not be captured with the componentPath
  // But based on our src/config/routes.ts, most use `lazy: () => import('@/pages/Home').then(m => ({ Component: m.default }))`

  return routeMap;
}

// Test execution when run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(getRouteMap());
}
