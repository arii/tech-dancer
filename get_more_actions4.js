import { resolveLatest } from './api/_lib/versions.ts';

async function check(action) {
  const version = await resolveLatest('gh-action', action);
  console.log(`${action}: ${version}`);
}

check('github/codeql-action');
