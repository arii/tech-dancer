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

function ensureWorktree(): void {
  // Check if it's already a worktree
  try {
    const worktrees = execFileSync('git', ['worktree', 'list', '--porcelain'], { encoding: 'utf8' });
    if (worktrees.includes(`worktree ${worktreePath}`)) {
      console.log(`✅ Worktree already exists at ${worktreePath}`);
      return;
    }
  } catch (_e) {
    // Ignore and proceed with creation
  }

  if (fs.existsSync(worktreePath)) {
    console.log(`⚠️  Directory ${worktreePath} exists but is not a registered worktree. Cleaning up.`);
    fs.rmSync(worktreePath, { recursive: true, force: true });
  }

  try {
    run('git', ['rev-parse', '--verify', baseRef]);
  } catch {
    run('git', ['fetch', 'origin', 'main', '--depth=1']);
  }

  console.log(`🌱 Creating worktree at ${worktreePath} for ${baseRef}`);
  run('git', ['worktree', 'add', worktreePath, baseRef]);
}

ensureWorktree();

if (fs.existsSync(path.join(worktreePath, 'dist'))) {
  console.log('✅ Found existing dist/ in worktree. Skipping build.');
} else {
  console.log('🏗️ Building main branch from scratch...');
  run('pnpm', ['install', '--frozen-lockfile', '--prefer-offline'], worktreePath);
  run('pnpm', ['run', 'build'], worktreePath);
}

console.log(`✅ Built base branch worktree at ${worktreePath}`);
