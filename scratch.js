const routes = [
  { path: '/' },
  { path: '/blog' },
  { path: '/gear' },
  { path: '/research' },
  { path: '/ux-auditor' },
  { path: '/about' },
  { path: '/contact' },
];

const VALID_TOP_LEVEL_PATHS = (() => {
  const paths = new Set();
  for (const route of routes) {
    if (route.path && route.path !== '*' && route.path !== '/') {
      paths.add(route.path.split('/')[1] || route.path.split('/')[0]);
    }
  }
  return paths;
})();

function getBasename(fullPath, buildBase) {
  const buildBaseClean = buildBase.replace(/\/$/, '');
  const segments = fullPath.split('/').filter(Boolean);
  const baseSegments = buildBaseClean.split('/').filter(Boolean);

  if (segments.length > baseSegments.length) {
    let branchSegmentsCount = 0;
    while (baseSegments.length + branchSegmentsCount < segments.length) {
      const segment = segments[baseSegments.length + branchSegmentsCount];
      if (VALID_TOP_LEVEL_PATHS.has(segment) || segment === 'index.html' || segment.includes('.')) {
        break;
      }
      branchSegmentsCount++;
    }
    if (branchSegmentsCount > 0) {
      return '/' + segments.slice(0, baseSegments.length + branchSegmentsCount).join('/') + '/';
    }
  }
  return buildBase;
}

console.log(VALID_TOP_LEVEL_PATHS);
console.log("1:", getBasename('/tech-dancer/arii/fix-preview/', '/tech-dancer/'));
console.log("2:", getBasename('/tech-dancer/arii/fix-preview/gear', '/tech-dancer/'));
