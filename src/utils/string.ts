/**
 * Shared string utilities for BoomTick.
 */

/**
 * Escapes HTML characters in a string to prevent XSS.
 * Useful for rendering untrusted strings safely in React when dangerouslySetInnerHTML is not used but extra precaution is needed, or as a generic utility.
 */
export const escapeHtml = (unsafe: string): string => {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
