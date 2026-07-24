import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

function execSyncSafe(cmd, options, fallback) {
  try {
    return execSync(cmd, options).trim();
  } catch (error) {
    console.warn(`[agent:prime] Command failed: "${cmd}". Using fallback "${fallback}". Error: ${error.message}`);
    return fallback;
  }
}

export function generateAgentContext(cwd = rootDir) {
  const gitSha = execSyncSafe('git rev-parse HEAD', { cwd, encoding: 'utf8', stdio: 'pipe' }, 'unknown');
  const submoduleSha = execSyncSafe('git rev-parse HEAD:boomtick-pkg', { cwd, encoding: 'utf8', stdio: 'pipe' }, 'unknown');

  let pkgName = 'tech-dancer';
  const pkgPath = resolve(cwd, 'package.json');
  if (existsSync(pkgPath)) {
    try {
      const pkgData = JSON.parse(readFileSync(pkgPath, 'utf8'));
      if (pkgData && typeof pkgData === 'object' && typeof pkgData.name === 'string') {
        pkgName = pkgData.name;
      } else {
        console.warn(`[agent:prime] Invalid package.json format. Using default name "${pkgName}".`);
      }
    } catch (error) {
      console.warn(`[agent:prime] Failed to parse package.json. Using default name "${pkgName}". Error: ${error.message}`);
    }
  }

  return {
    packageName: pkgName,
    updatedAt: new Date().toISOString(),
    gitCommit: gitSha,
    submodules: {
      'boomtick-pkg': submoduleSha
    },
    version: '1.0.0'
  };
}

export function primeAgentContext(cwd = rootDir) {
  const context = generateAgentContext(cwd);
  const outputPath = resolve(cwd, '.agent-context.json');
  writeFileSync(outputPath, JSON.stringify(context, null, 2), 'utf8');
  console.log(`[agent:prime] Updated .agent-context.json successfully (${context.gitCommit.slice(0, 7)})`);
  return context;
}

if (process.argv[1] === __filename) {
  primeAgentContext();
}
