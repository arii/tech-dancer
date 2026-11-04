/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ASSET_PREFIX } from '@/config/constants';
import type { ContentStatus } from '../types/content';

/**
 * Validates and normalizes content status.
 */
export function normalizeStatus(val: unknown): ContentStatus | undefined {
  if (typeof val !== 'string') return undefined;
  const status = val.toLowerCase() as ContentStatus;
  return ['published', 'draft', 'planned'].includes(status) ? status : undefined;
}

/**
 * Normalizes asset URL with project ASSET_PREFIX when needed.
 */
export function normalizeAsset(val: unknown): unknown {
  if (val === "" || val === undefined || val === null) return undefined;
  if (typeof val !== "string") return val;
  if (val.startsWith("/") && !val.startsWith(ASSET_PREFIX)) {
    return `${ASSET_PREFIX}${val}`;
  }
  return val;
}
