import * as fs from 'fs';
import * as path from 'path';
import { MCP_TOOLS } from '../src/mcp/definitions.js';

const homeDir = process.env.HOME || process.env.USERPROFILE || '';
const globalTargetDir = path.join(homeDir, '.gemini', 'antigravity-cli', 'mcp', 'boomtick-mcp');
const projectTargetDir = path.join(process.cwd(), '.mcp', 'schemas');

function syncSchemas() {
  console.log('🔄 Synchronizing MCP tool schemas...');

  [globalTargetDir, projectTargetDir].forEach(dir => {
    if (dir && !fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });

  if (!globalTargetDir && !projectTargetDir) {
    console.error('❌ Could not determine target directories.');
    process.exit(1);
  }

  MCP_TOOLS.forEach(tool => {
    const schemaContent = JSON.stringify(tool.inputSchema, null, 2);
    const fileName = `${tool.name}.json`;

    if (globalTargetDir) {
      const globalFilePath = path.join(globalTargetDir, fileName);
      fs.writeFileSync(globalFilePath, schemaContent);
    }

    if (projectTargetDir) {
      const projectFilePath = path.join(projectTargetDir, fileName);
      fs.writeFileSync(projectFilePath, schemaContent);
    }
  });

  console.log(`✅ Synchronized ${MCP_TOOLS.length} tool schemas.`);
  if (globalTargetDir) console.log(`   - Global: ${globalTargetDir}`);
  if (projectTargetDir) console.log(`   - Local:  ${projectTargetDir}`);
}

try {
  syncSchemas();
} catch (error) {
  console.error('❌ Failed to synchronize MCP schemas:', error);
  process.exit(1);
}
