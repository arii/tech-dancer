const fs = require('fs');

const content = fs.readFileSync('src/config/routes.ts', 'utf-8');
const routesMap = {};
const lines = content.split('\n');

let currentPath = '';

for (const line of lines) {
  const pathMatch = line.match(/path:\s*'([^']+)'/);
  if (pathMatch) {
    currentPath = pathMatch[1];
  }

  const lazyMatch = line.match(/lazy:\s*\(\)\s*=>\s*import\('([^']+)'\)/);
  if (lazyMatch && currentPath) {
    const importPath = lazyMatch[1].replace('@/', 'src/');
    // Just map .tsx directly since standard imports omit extensions
    routesMap[importPath + '.tsx'] = currentPath;
  }
}

console.log(JSON.stringify(routesMap, null, 2));
