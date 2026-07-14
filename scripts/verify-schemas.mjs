import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Orchestrates the schema verification and synchronization process.
 */
function verifySchemas() {
  if (process.env.SKIP_BOOMTICK_PKG === 'true' || process.env.VERCEL === '1') {
    console.log('⏭️ Skipping schema verification (SKIP_BOOMTICK_PKG is true or on Vercel).');
    return;
  }

  const root = process.cwd();

  // 1. Check dependencies
  console.log('🔍 Checking dependencies...');
  const rootNodeModules = join(root, 'node_modules');
  const mcpNodeModules = join(root, 'boomtick-pkg', 'mcp', 'node_modules');

  if (!existsSync(rootNodeModules) && !existsSync(mcpNodeModules)) {
    console.error('❌ Error: node_modules is missing.');
    console.error('   Please run `pnpm install` in the root directory to set up dependencies.');
    process.exit(1);
  }

  try {
    // 2. Python Dependency Check
    console.log('🐍 Checking Python dependencies...');
    try {
      execSync('python3 -c "import pydantic"', { stdio: 'pipe' });
    } catch {
      console.error('❌ Error: Python dependency `pydantic` is missing.');
      console.error('   Please run `pip install -e boomtick-pkg/cli/` to install CLI dependencies.');
      process.exit(1);
    }

    // 3. Python Schema Generation
    console.log('🐍 Generating CLI schema from Python models...');
    execSync('PYTHONPATH=boomtick-pkg/cli python3 boomtick-pkg/cli/dev_tools/schema_gen.py', {
      stdio: 'inherit',
      env: { ...process.env, PYTHONPATH: 'boomtick-pkg/cli' }
    });

    // 4. Sync Contracts
    console.log('🔄 Syncing contracts...');
    execSync('pnpm exec tsx boomtick-pkg/mcp/scripts/sync-contracts.ts', { stdio: 'inherit' });

    // 5. Sync MCP Schemas
    console.log('🛠️  Syncing MCP schemas...');
    execSync('pnpm --filter ./boomtick-pkg/mcp run sync:mcp-schemas', { stdio: 'inherit' });

    // 6. Generation complete
    console.log('📊 Schema/contract generation complete.');

    console.log('\n✅ Schema verification complete.');
  } catch (err) {
    console.error('\n❌ Verification failed due to an error in the sub-tasks:', err);
    process.exit(1);
  }
}

verifySchemas();
