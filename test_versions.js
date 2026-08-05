
import { resolveLatest } from './api/_lib/versions.ts';
const action = process.argv[2];
resolveLatest('gh-action', action).then(version => {
  if (version) {
    const major = version.split('.')[0];
    console.log(major);
  } else {
    console.log('not found');
  }
});
