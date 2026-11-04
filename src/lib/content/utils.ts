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
 * accounts for image reading time (~12 seconds / 0.2 minutes per image),
 * and uses Math.ceil so short posts or image-heavy posts are not rounded down to 0 or 1 inappropriately.
 */
export function readingTime(content?: string, excerpt?: string): number {
  if (content && content.trim().length > 0) {
    const words = content.split(/\s+/).length;
    // Count Markdown images (![...](...)) and HTML img tags (<img ...)
    const mdImageMatches = content.match(/!\[.*?\]\(.*?\)/g);
    const htmlImageMatches = content.match(/<img\b[^>]*>/gi);
    const imageCount = (mdImageMatches ? mdImageMatches.length : 0) + (htmlImageMatches ? htmlImageMatches.length : 0);
    const imageTimeMinutes = imageCount * 0.2; // 12 seconds per image
    return Math.max(1, Math.ceil(words / 200 + imageTimeMinutes));
  }
  // Fallback for list views where only excerpt might be available
  const words = excerpt?.split(/\s+/).length ?? 0;
  return Math.max(1, Math.ceil(words / 20)); // sensible proxy for short text
}
