/**
 * Normalizes a path to ensure it starts and ends with a single slash
 * @param {string} p
 * @returns {string}
 */
export const normalizePath = (p) => ("/" + p + "/").replace(/\/+/g, "/");

/**
 * Resolves the base path based on environment variables
 * @returns {string}
 */
export const getBasePath = () => {
  const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL;
  const isGHAction = process.env.GITHUB_ACTIONS === 'true';
  const ghBranch = process.env.GITHUB_REF_NAME;
  const isMainBranch = ghBranch === 'main' || !ghBranch;

  let base = process.env.VITE_BASE_PATH;
  if (!base) {
    if (isVercel) {
      base = '/';
    } else if (isGHAction) {
      // If we're on a branch other than main in GH Actions, include the branch name in the base path
      base = isMainBranch ? '/tech-dancer/' : `/tech-dancer/${ghBranch}/`;
    } else {
      base = '/';
    }
  }

  return normalizePath(base);
};
