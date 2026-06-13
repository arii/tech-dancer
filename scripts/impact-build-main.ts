import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * Executes a shell command and returns the output.
 * Throws an error if the command fails.
 */
function exec(command: string, cwd?: string): string {
  try {
    return execSync(command, { encoding: 'utf-8', cwd, stdio: 'inherit' })?.trim() || '';
  } catch (error: unknown) {
    const err = error as { stderr?: string; message?: string };
    throw new Error(`Command failed: ${command}\n${err.stderr || err.message}`, { cause: error });
  }
}

async function main() {
  console.log('🚀 Building main branch for visual/DOM diffing...');

  const worktreePath = path.join(process.cwd(), '.tmp-main');

  if (!fs.existsSync(worktreePath)) {
    console.log('📦 Creating .tmp-main worktree...');
    // Ensure origin/main exists in local git
    try {
      execSync('git fetch origin main', { stdio: 'ignore' });
    } catch {
      console.log('⚠️ Could not fetch origin main. Ignoring.');
    }

    let base = 'origin/main';
    try {
       execSync(`git rev-parse ${base}`, { stdio: 'ignore' });
    } catch {
       base = 'main'; // fallback to local main
    }

    exec(`git worktree add .tmp-main ${base}`);
  } else {
    console.log('🔄 .tmp-main worktree already exists.');
    // Check out latest changes if possible
    try {
        exec('git reset --hard HEAD', worktreePath);
        exec('git checkout origin/main', worktreePath);
    } catch {
        // ignore errors
    }
  }

  console.log('📦 Installing dependencies in .tmp-main...');
  exec('CI=true pnpm install --frozen-lockfile', worktreePath);

  console.log('🏗️ Building .tmp-main...');
  exec('CI=true pnpm build', worktreePath);

  console.log('✅ Main branch build complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
