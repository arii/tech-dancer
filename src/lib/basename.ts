/**
 * Function to calculate the actual basename at runtime.
 * This ensures correct routing regardless of deployment depth.
 */
export const getBasename = (): string => {
  // 0. SSR/Node safety
  if (typeof window === 'undefined') {
    return import.meta.env?.BASE_URL || '/';
  }

  // If we are in local development, always use the root or build-time base
  if (import.meta.env.DEV) {
    return import.meta.env.BASE_URL || '/';
  }

  // 1. Priority: check if we just redirected from 404.html
  const ghPagesBasename = sessionStorage.getItem('ghpages_basename');
  if (ghPagesBasename) {
    return ghPagesBasename;
  }

  // 2. Check if the URL contains the ?/ SPA redirect marker
  if (window.location.search.includes('?/')) {
    // The basename is everything before the ?
    return window.location.pathname;
  }

  // 3. Dynamic subfolder detection (e.g. GitHub Pages or Vercel previews)
  const path = window.location.pathname;

  // Example: /tech-dancer/feat/rebrand-to-versiontruth-10460572333456994726/research
  // We want to extract /tech-dancer/feat/rebrand-to-versiontruth-10460572333456994726/
  if (path.includes('/tech-dancer/')) {
    const segments = path.split('/').filter(Boolean);
    const techDancerIndex = segments.indexOf('tech-dancer');

    if (techDancerIndex !== -1) {
      // Check for /tech-dancer/feat/BRANCH_NAME or /tech-dancer/pull/PR_NUMBER structure
      const next = segments[techDancerIndex + 1];
      if ((next === 'feat' || next === 'pull') && segments[techDancerIndex + 2]) {
        return `/${segments.slice(techDancerIndex, techDancerIndex + 3).join('/')}/`;
      }

      // Default tech-dancer subfolder if it's the root of the repo deployment
      return '/tech-dancer/';
    }
  }

  // 4. Fallback to build-time BASE_URL (which might be / or /tech-dancer/)
  return import.meta.env.BASE_URL || '/';
};
