/**
 * Common environment variable utilities for audit and capture scripts.
 */

/**
 * Resolves the target URL for auditing or capturing.
 * Prioritizes process.env.AUDIT_URL, then process.env.CAPTURE_URL, then process.env.BASE_URL,
 * and finally defaults to the provided defaultUrl.
 */
export function getTargetUrl(defaultUrl = 'http://localhost:3000/') {
  return process.env.AUDIT_URL || process.env.CAPTURE_URL || process.env.BASE_URL || defaultUrl;
}
