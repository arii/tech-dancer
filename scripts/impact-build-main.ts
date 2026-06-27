import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { loadProjectConfig } from './lib/projectConfig';
import { logHeartbeat } from './lib/heartbeat';

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
    run('git', ['worktree', 'remove', '--force', worktreePath]);
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

logHeartbeat(`Creating worktree for ${baseRef}`);
run('git', ['worktree', 'add', worktreePath, baseRef]);

logHeartbeat('PNPM Install (Base Worktree)');
run('pnpm', ['install', '--frozen-lockfile', '--prefer-offline'], worktreePath);

logHeartbeat('Building Base Branch');
run('pnpm', ['run', 'build'], worktreePath);

console.log(`✅ Built base branch worktree at ${worktreePath}`);
logHeartbeat('Base Build Complete');
