import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

export function generateAgentContext(cwd = rootDir) {
  let gitSha = 'unknown';
  let submoduleSha = 'unknown';

  try {
    gitSha = execSync('git rev-parse HEAD', { cwd, encoding: 'utf8' }).trim();
  } catch {
    // Graceful fallback if git is unavailable
  }

  try {
    submoduleSha = execSync('git rev-parse HEAD:boomtick-pkg', { cwd, encoding: 'utf8' }).trim();
  } catch {
    // Graceful fallback if submodule is missing
  }

  let pkgName = 'tech-dancer';
  const pkgPath = resolve(cwd, 'package.json');
  if (existsSync(pkgPath)) {
    try {
      const pkgData = JSON.parse(readFileSync(pkgPath, 'utf8'));
      pkgName = pkgData.name || pkgName;
    } catch {
      // Ignore JSON parse errors
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
