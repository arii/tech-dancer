import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { expect, it } from 'vitest';

const script = resolve('scripts/manage-previews.sh');

it('keeps mirrored production routes while removing stale previews', () => {
  const pages = mkdtempSync(join(tmpdir(), 'pages-prune-'));
  try {
    const env = {
      ...process.env,
      GIT_AUTHOR_DATE: '2020-01-01T00:00:00Z',
      GIT_COMMITTER_DATE: '2020-01-01T00:00:00Z',
    };
    const git = (...args: string[]) => execFileSync('git', args, { cwd: pages, env });
    git('init', '--quiet');
    git('remote', 'add', 'origin', '.');

    const productionRoutes = ['blog', 'blog/article', 'about'];
    for (const route of [...productionRoutes, ...productionRoutes.map(route => `tech-dancer/${route}`), 'blog/old-preview']) {
      mkdirSync(join(pages, route), { recursive: true });
      writeFileSync(join(pages, route, 'index.html'), '<!doctype html>');
    }
    git('add', '.');
    git('-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.com', 'commit', '--quiet', '-m', 'Publish Pages fixture');

    execFileSync('bash', [script], { cwd: pages });

    for (const route of productionRoutes) {
      expect(existsSync(join(pages, route, 'index.html')), route).toBe(true);
    }
    expect(existsSync(join(pages, 'blog/old-preview'))).toBe(false);
    expect(JSON.parse(readFileSync(join(pages, 'previews/data.json'), 'utf8'))).toEqual({});
  } finally {
    rmSync(pages, { recursive: true, force: true });
  }
});
