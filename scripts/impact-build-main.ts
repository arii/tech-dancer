import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { loadProjectConfig } from './lib/projectConfig';

const worktreePath = path.join(process.cwd(), '.tmp-main');
const config = loadProjectConfig();
const baseRef = process.env.IMPACT_BASE_REF ?? config.base_branch;

function run(command: string, args: string[], cwd = process.cwd()): void {
  console.log(`$ ${command} ${args.join(' ')}`);
  execFileSync(command, args, { cwd, stdio: 'inherit', env: { ...process.env, VITE_BASE_PATH: '/', DISABLE_MINIFY: 'true' } });
}

function removeExistingWorktree(): void {
  if (!fs.existsSync(worktreePath)) return;

  try {
    // If we're not using a cached build, remove the worktree to ensure a clean slate
    if (!fs.existsSync(path.join(worktreePath, 'dist'))) {
      run('git', ['worktree', 'remove', '--force', worktreePath]);
    }
  } catch {
    fs.rmSync(worktreePath, { recursive: true, force: true });
    run('git', ['worktree', 'prune']);
  }
}

removeExistingWorktree();

try {
  run('git', ['rev-parse', '--verify', baseRef]);
} catch {
  run('git', ['fetch', 'origin', 'main']);
}

if (!fs.existsSync(path.join(worktreePath, 'dist'))) {
  run('git', ['worktree', 'add', worktreePath, baseRef]);
  run('pnpm', ['install', '--frozen-lockfile', '--prefer-offline'], worktreePath);
  run('pnpm', ['run', 'build'], worktreePath);
} else {
  console.log('✅ Found existing dist in worktree (restored from cache). Skipping build.');
}

console.log(`✅ Built base branch worktree at ${worktreePath}`);
