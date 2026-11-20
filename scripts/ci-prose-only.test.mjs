import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { proseOnly, changedPaths, classify } from './ci-prose-only.mjs';

test('only explicit root prose paths may skip', () => {
  assert.equal(proseOnly(['README.md', 'CONTRIBUTING.md', 'CHANGELOG.md']), true);
  for (const paths of [[], ['AGENTS.md'], ['public/robots.txt'], ['api/service.py'], ['content/post.md'],
    ['wcs_navigator_api/server.py'], ['firestore.rules'], ['requirements-dev.txt'],
    ['.env.example'], ['unknown/new-path'], ['docs/app/index.html'],
    ['docs/app/vendor/README.md'], ['docs/README.md'], ['README.MD'],
    ['README.md', 'scripts/gen-precache.mjs'], ['README.md\ncode.js'],
    ['.github/workflows/ci.yml'], ['tests/e2e/live-site.mjs']]) {
    assert.equal(proseOnly(paths), false, JSON.stringify(paths));
  }
});
test('main/non-PR and unverifiable inputs always run', () => {
  assert.equal(classify({ EVENT_NAME: 'push' }), false);
  assert.equal(classify({ EVENT_NAME: 'workflow_dispatch' }), false);
  assert.equal(classify({ EVENT_NAME: 'pull_request' }), false);
  assert.throws(() => changedPaths('--help', 'a'.repeat(40)));
});
test('real git diffs include both sides of renames, empty diff does not skip', () => {
  const root = mkdtempSync(join(tmpdir(), 'prose-gate-'));
  const cwd = process.cwd();
  const git = (...args) => execFileSync('git', args, { cwd: root }).toString().trim();
  try {
    git('init', '-q'); git('config', 'user.name', 'CI test');
    git('config', 'user.email', 'ci@example.invalid');
    writeFileSync(join(root, 'README.md'), 'one\n');
    git('add', '.'); git('commit', '-qm', 'base');
    const base = git('rev-parse', 'HEAD');
    writeFileSync(join(root, 'README.md'), 'two\n');
    git('commit', '-qam', 'prose'); const head = git('rev-parse', 'HEAD');
    process.chdir(root);
    assert.equal(proseOnly(changedPaths(base, head)), true);
    assert.equal(proseOnly(changedPaths(head, head)), false);
    git('mv', 'README.md', 'app.js'); git('commit', '-qm', 'rename to code');
    assert.equal(proseOnly(changedPaths(head, git('rev-parse', 'HEAD'))), false);
    assert.equal(classify({ EVENT_NAME: 'pull_request', BASE_SHA: 'f'.repeat(40), HEAD_SHA: head }), false);
  } finally { process.chdir(cwd); rmSync(root, { recursive: true, force: true }); }
});
