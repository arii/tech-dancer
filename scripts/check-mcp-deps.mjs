import { existsSync } from 'node:fs';
import { join } from 'node:path';

// Check for node_modules in root or in mcp package
const rootNodeModules = join(process.cwd(), 'node_modules');
const mcpNodeModules = join(process.cwd(), 'boomtick-pkg', 'mcp', 'node_modules');

if (!existsSync(rootNodeModules) && !existsSync(mcpNodeModules)) {
  console.warn('⚠️  Warning: node_modules is missing.');
  console.warn('   Run `pnpm install` in the root directory to set up dependencies.');
  process.exit(1);
}

console.log('✅ Node dependencies found.');
