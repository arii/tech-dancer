/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Normalizes reading time to a numeric value.
 */
export function normalizeReadTime(val: unknown): number | undefined {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const parsed = parseInt(val.replace(/[^\d]/g, ''), 10);
    return isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
}

/**
 * Calculates estimated reading time in minutes.
 * Uses a standard 200 words per minute for full content,
 * or a simplified proxy for excerpts.
 */
export function readingTime(content?: string, excerpt?: string): number {
  if (content && content.trim().length > 0) {
    return Math.max(1, Math.round(content.split(/\s+/).length / 200));
  }
  // Fallback for list views where only excerpt might be available
  const words = excerpt?.split(/\s+/).length ?? 0;
  return Math.max(1, Math.round(words / 20)); // sensible proxy for short text
}
