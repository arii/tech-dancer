/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AffiliateLink {
  id: string;
  name: string;
  url: string;
  category: 'gear' | 'tech' | 'travel' | 'recovery';
  description: string;
}
