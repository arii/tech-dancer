/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Re-export types
export type { Post, Resource, ContentItem, ContentStatus } from './types/content';

// Re-export frontmatter parsing
export { parseFrontmatter } from './content/frontmatter';

// Re-export asset normalization
export { normalizeAsset, normalizeStatus } from './content/assets';

// Re-export utilities
export { readingTime, normalizeReadTime } from './content/utils';

// Re-export posts and resources query methods
export {
  getPosts,
  getPostBySlug,
  getResources,
  getResourceBySlug,
} from './content/posts';
