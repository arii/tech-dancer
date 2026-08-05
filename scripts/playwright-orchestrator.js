import fs from 'fs';
import path from 'path';
import { execSync, spawnSync } from 'child_process';

/**
 * Smart Playwright test orchestrator that ensures all prerequisites (dependencies,
 * browser binaries, and compiled assets) are ready before execution.
 *
 * Progress and logging are directed to stderr to keep stdout clean for tools
 * that parse JSON-formatted test results from stdout.
 */

const nodeModulesPath = path.join(process.cwd(), 'node_modules');

// 1. Ensure npm dependencies are installed first
if (!fs.existsSync(nodeModulesPath)) {
  console.warn('📦 node_modules not found. Automatically running "pnpm install"...');
  try {
    execSync('pnpm install', { stdio: 'inherit' });
  } catch (err) {
    console.error('❌ Error: pnpm install failed:', err.message);
    process.exit(1);
  }
}

// 2. Ensure Playwright browser binaries are present for the active Playwright version
function checkAndInstallPlaywright() {
  try {
    // Run dry-run to discover the exact cache folder used by the current Playwright version
    const output = execSync('pnpm exec playwright install --dry-run', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    });
    const match = output.match(/Install location:\s*(.*chromium-\d+)/i);
    if (match && match[1]) {
      const installPath = match[1].trim();
      // Only skip installation if the directory exists and contains files
      if (fs.existsSync(installPath) && fs.readdirSync(installPath).length > 0) {
        return;
      }
    }
    console.warn('🌐 Playwright browser binaries not found. Automatically running "pnpm exec playwright install chromium"...');
    execSync('pnpm exec playwright install chromium', { stdio: 'inherit' });
  } catch (err) {
    console.warn('⚠️ Warning: Failed to check Playwright installation via dry-run:', err.message);
    console.warn('🌐 Attempting to run "pnpm exec playwright install chromium" as a fallback...');
    try {
      execSync('pnpm exec playwright install chromium', { stdio: 'inherit' });
    } catch (installErr) {
      console.error('❌ Error: Playwright installation failed:', installErr.message);
      process.exit(1);
    }
  }
}

checkAndInstallPlaywright();

// 3. Ensure built distribution assets exist and are up to date with source files
function checkAndBuild() {
  const distPath = path.join(process.cwd(), 'dist');
  const indexPath = path.join(distPath, 'index.html');
  let needsBuild = false;

  if (!fs.existsSync(indexPath)) {
    needsBuild = true;
  } else {
    const distMtime = fs.statSync(indexPath).mtimeMs;
    let newestSrcMtime = 0;

    function checkDir(dir) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          checkDir(fullPath);
        } else if (stat.isFile()) {
          if (stat.mtimeMs > newestSrcMtime) {
            newestSrcMtime = stat.mtimeMs;
          }
        }
      }
    }

    const srcDir = path.join(process.cwd(), 'src');
    if (fs.existsSync(srcDir)) {
      checkDir(srcDir);
    }

    const rootIndex = path.join(process.cwd(), 'index.html');
    if (fs.existsSync(rootIndex)) {
      const mtime = fs.statSync(rootIndex).mtimeMs;
      if (mtime > newestSrcMtime) newestSrcMtime = mtime;
    }

    // Trigger rebuild if source files are newer than the compiled index
    if (newestSrcMtime > distMtime) {
      needsBuild = true;
    }
  }

  if (needsBuild) {
    console.warn('🏗️ dist/ is missing or outdated. Automatically running "pnpm run build"...');
    try {
      execSync('pnpm run build', { stdio: 'inherit' });
    } catch (err) {
      console.error('❌ Error: Build failed:', err.message);
      process.exit(1);
    }
  }
}

checkAndBuild();

// 4. Run the actual Playwright tests forwarding all arguments
const args = process.argv.slice(2);
const runArgs = ['exec', 'playwright', 'test', ...args];
const result = spawnSync('pnpm', runArgs, { stdio: 'inherit' });
process.exit(result.status ?? 1);
