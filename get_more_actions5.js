import { fetchLatestGhAction } from './api/_lib/versions.ts';

async function check(action) {
  const version = await fetchLatestGhAction(action);
  console.log(`${action}: ${version}`);
}

check('github/codeql-action');
