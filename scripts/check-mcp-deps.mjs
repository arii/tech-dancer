import { existsSync } from 'node:fs';
import { join } from 'node:path';

const mcpDir = join(process.cwd(), 'boomtick-pkg', 'mcp');
const nodeModulesPath = join(mcpDir, 'node_modules');

if (!existsSync(nodeModulesPath)) {
  console.warn('⚠️  Warning: boomtick-pkg/mcp/node_modules is missing.');
  console.warn('   Run `pnpm install` in the root directory to set up dependencies.');
  process.exit(1);
}

console.log('✅ MCP dependencies found.');
