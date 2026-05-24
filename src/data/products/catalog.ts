/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AffiliateLink } from '../../types';

export type ProductSource = 'affiliate' | 'owned-merch';

export type ProductUseCase =
  | 'event-theme'
  | 'travel'
  | 'workshop'
  | 'social-dance'
  | 'competition'
  | 'warmup'
  | 'pride'
  | 'norcal'
  | 'role-shirt';

export interface ProductCatalogItem {
  id: string;
  source: ProductSource;

  title: string;
  description: string;
  imageUrl: string;
  href: string;

  price?: string;
  collections: string[];
  tags: string[];

  roles?: ('lead' | 'follow' | 'switch')[];
  eventTags?: string[];
  useCases?: ProductUseCase[];

  disclosure:
    | 'affiliate'
    | 'owned-printful'
    | 'none';
}

export function affiliateToCatalogItem(item: AffiliateLink): ProductCatalogItem {
  return {
    id: item.id,
    source: 'affiliate',
    title: item.name, // AffiliateLink uses 'name' instead of 'title'
    description: item.description,
    imageUrl: item.image || '',
    href: item.url,
    collections: [], // AffiliateLinks don't have these by default
    tags: [],
    useCases: [],
    disclosure: 'affiliate',
  };
}
