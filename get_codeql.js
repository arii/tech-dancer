import { resolveLatest } from './api/_lib/versions.ts';
resolveLatest('gh-action', 'github/codeql-action').then(version => {
  if (version) {
    const major = version.split('.')[0];
    console.log(major);
  } else {
    console.log('not found');
  }
});
