/**
 * Shared URL utilities for BoomTick.
 */

/**
 * Validates a URL string to ensure it uses a safe protocol (http or https).
 * Prevents phishing and open redirect vulnerabilities.
 */
export const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};
