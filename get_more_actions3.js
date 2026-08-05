import { resolveLatest } from './api/_lib/versions.ts';

async function check(action) {
  const version = await resolveLatest('gh-action', action);
  console.log(`${action}: ${version}`);
}

check('peter-evans/create-pull-request');
check('peter-evans/create-or-update-comment');
check('googleapis/release-please-action');
check('docker/setup-buildx-action');
check('docker/metadata-action');
check('docker/login-action');
check('docker/build-push-action');
check('actions/github-script');
