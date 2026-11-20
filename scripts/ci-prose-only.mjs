// Only these root prose files are known to be unrelated to application code.
import { execFileSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const PROSE = new Set(['README.md', 'CONTRIBUTING.md', 'CHANGELOG.md']);
export function proseOnly(paths) {
  return paths.length > 0 && paths.every((path) => PROSE.has(path));
}
export function changedPaths(base, head) {
  if (![base, head].every((sha) => /^[a-f0-9]{40}$/i.test(sha ?? ''))) {
    throw new Error('Expected full commit SHAs');
  }
  return execFileSync('git', [
    'diff', '--no-ext-diff', '--no-textconv', '--no-renames',
    '--name-only', '-z', `${base}...${head}`, '--',
  ]).toString('utf8').split('\0').filter(Boolean);
}
export function classify(env) {
  if (env.EVENT_NAME !== 'pull_request') return false;
  try {
    return proseOnly(changedPaths(env.BASE_SHA, env.HEAD_SHA));
  } catch {
    console.warn('Could not establish a prose-only diff; full code checks will run.');
    return false;
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  appendFileSync(process.env.GITHUB_OUTPUT, `has_code_changes=${!classify(process.env)}\n`);
}
