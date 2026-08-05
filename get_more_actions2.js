import { resolveLatest } from './api/_lib/versions.ts';

async function check(action) {
  const version = await resolveLatest('gh-action', action);
  console.log(`${action}: ${version}`);
}

check('actions/upload-artifact');
check('actions/download-artifact');
check('gitleaks/gitleaks-action');
check('actions/create-github-app-token');
check('VeyronSakai/conflict-resolver');
