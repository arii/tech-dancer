/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AffiliateLink {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string;
  draft?: boolean;
  gearSlug?: string;
  image?: string;
  imageMode?: 'wide' | 'contain' | 'apparel' | 'square' | 'frontBack' | 'cover';
  imagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right' | string;
}
