/**
 * Draft Filtering Utility
 * 
 * Filters out items marked with draft: true from public-facing components.
 * Used throughout the app to hide:
 * - Affiliate items pending approval
 * - Incomplete product listings
 * - Products with missing or invalid links
 */

export interface DraftableItem {
  id: string;
  name: string;
  draft?: boolean;
  [key: string]: unknown;
}

/**
 * Filter out draft items from an array
 * @param items - Array of items (with optional draft flag)
 * @returns Array with draft items removed
 */
export function filterDrafts<T extends DraftableItem>(items: T[]): T[] {
  return items.filter((item) => item.draft !== true);
}

/**
 * Check if a single item is draft
 * @param item - Item with optional draft flag
 * @returns true if item is draft and should be hidden
 */
export function isDraft(item: DraftableItem): boolean {
  return item.draft === true;
}

/**
 * Filter products and return only published ones
 * Safe to use in rendering - will never show draft items
 */
export function getPublishedProducts<T extends DraftableItem>(items: T[]): T[] {
  return filterDrafts(items);
}

/**
 * Count how many items are draft
 * Useful for reporting/debugging
 */
export function countDraftItems(items: DraftableItem[]): number {
  return items.filter((item) => item.draft === true).length;
}
