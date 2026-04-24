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

interface GearItem {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  affiliateId: string;
  imageUrl: string;
  tags: string[];
}

interface TechSpec {
  label: string;
  value: string;
  description: string;
}
