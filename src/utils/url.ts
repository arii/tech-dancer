/**
 * Shared URL utilities for BoomTick.
 */

/**
 * Validates a URL string to ensure it uses a safe protocol (http or https).
 * Prevents phishing and open redirect vulnerabilities.
 */
export const isValidUrl = (url: string | null | undefined): boolean => {
  if (!url || typeof url !== 'string') return false;

  try {
    const parsed = new URL(url);
    // Explicitly allow only standard web protocols to prevent javascript: or data: XSS
    if (!["http:", "https:"].includes(parsed.protocol)) return false;

    // Additional check to prevent protocol-relative URLs that might be parsed weirdly
    if (url.startsWith('//')) return false;

    return true;
  } catch {
    return false;
  }
};
