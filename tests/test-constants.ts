/**
 * Patterns for console and page errors that should be ignored during smoke tests.
 * These are typically environment-specific noise or known external script issues.
 */
export const IGNORED_ERROR_PATTERNS = [
  /Vercel Web Analytics/,
  /gtag is not defined/,
  /chrome-extension/,
  /Failed to load resource: net::ERR_BLOCKED_BY_CLIENT/, // Common adblocker/extension interference
  /Failed to load resource: net::ERR_BLOCKED_BY_RESPONSE.NotSameOrigin/, // External media with restrictive CORP/COEP headers
  /Failed to load WCS data: Error: Invalid Parquet signature/, // Ignore Parquet errors in CI/E2E if LFS is not initialized
];
