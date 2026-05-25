/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MERCH_PRODUCTS, COLLECTIONS } from '@/data/products/merch';
import { affiliateManager } from '@/lib/affiliateManager';
import {
  ProductCatalogItem,
  affiliateToCatalogItem,
} from '@/data/products/catalog';
import { Event } from '@/lib/content';

export function getAllMerchProducts(): ProductCatalogItem[] {
  return MERCH_PRODUCTS;
}

export { COLLECTIONS };

export function getFeaturedMerch(limit = 3): ProductCatalogItem[] {
  return MERCH_PRODUCTS.slice(0, limit);
}

export function getMerchByCollection(collectionId: string): ProductCatalogItem[] {
  if (collectionId === 'all') return MERCH_PRODUCTS;
  return MERCH_PRODUCTS.filter((item) => item.collections.includes(collectionId));
}


function resolveAffiliateProducts(ids: string[] = []): ProductCatalogItem[] {
  return ids
    .map((id) => affiliateManager.getLink(id))
    .filter((link) => !!link)
    .map((link) => affiliateToCatalogItem(link!));
}

function resolveMerchProducts(ids: string[] = []): ProductCatalogItem[] {
  return MERCH_PRODUCTS.filter((item) => ids.includes(item.id));
}

export function getProductsForEvent(event: Event): ProductCatalogItem[] {
  const outfitIds = event.gear?.outfitIds || [];
  const accessoryIds = event.gear?.accessoryIds || [];
  const shoeIds = event.gear?.shoeIds || [];
  const essentialIds = event.gear?.essentialIds || [];
  const travelIds = event.gear?.travelIds || [];

  const allIds = [
    ...outfitIds,
    ...accessoryIds,
    ...shoeIds,
    ...essentialIds,
    ...travelIds,
  ];

  // In this system, we check both sources for the IDs.
  // This allows the event guide to simply list IDs without caring if they are affiliate or merch.
  const affiliateItems = resolveAffiliateProducts(allIds);
  const merchItems = resolveMerchProducts(allIds);

  // Combine and deduplicate by ID if necessary, though IDs should be unique across catalogs
  const combined = [...affiliateItems, ...merchItems];
  const unique = Array.from(new Map(combined.map((item) => [item.id, item])).values());

  return unique;
}
