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

export interface GearItem {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  affiliateId: string;
  imageUrl: string;
  tags: string[];
}

export interface TechSpec {
  label: string;
  value: string;
  description: string;
}
