/**
 * Resolves the base path based on environment variables
 * @returns {string}
 */
export function getBasePath() {
  // Vercel: always root
  if (process.env.VERCEL === '1' || process.env.VERCEL) return '/';

  // Explicit base path override from environment (e.g. branch previews)
  if (process.env.VITE_BASE_PATH) {
    return ("/" + process.env.VITE_BASE_PATH + "/").replace(/\/+/g, "/");
  }

  // GitHub Actions (GitHub Pages deploy)
  if (process.env.GITHUB_ACTIONS === 'true') return '/tech-dancer/';
  // Local dev
  return '/';
}
