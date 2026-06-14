import type { ProductCatalogItem } from '@/data/products/catalog';
import { ASSET_PREFIX, BASE_URL } from '@/config/constants';

/**
 * SCHEMA POLICY: Conservative Product JSON-LD
 *
 * Only publish stable, site-controlled facts in Product structured data.
 *
 * Allowed now:
 * - name
 * - description
 * - image
 * - URL
 * - brand
 * - internal SKU/id
 *
 * Do NOT publish at this time:
 * - price
 * - currency
 * - availability / stock status
 * - shipping details
 * - return policy
 * - ratings
 * - reviews
 * - review counts
 * - delivery dates
 *
 * Rationale:
 * Printful/Amazon/product availability, pricing, shipping, returns, and ratings can change
 * outside the site. Publishing guessed or stale values in JSON-LD creates SEO and trust risk.
 */

export interface SchemaBrand {
  "@type": "Brand";
  "name": string;
}

export interface SchemaOffer {
  "@type": "Offer";
  "url": string;
}

export interface SchemaProduct {
  "@context"?: "https://schema.org";
  "@type": "Product";
  "name": string;
  "description": string;
  "image": string;
  "brand": SchemaBrand;
  "sku": string;
  "offers": SchemaOffer;
}

export interface SchemaListItem {
  "@type": "ListItem";
  "position": number;
  "item": SchemaProduct;
}

export interface SchemaItemList {
  "@context": "https://schema.org";
  "@type": "ItemList";
  "itemListElement": SchemaListItem[];
}

export const AMAZON_AFFILIATE_DISCLOSURE = "As an Amazon Associate, BoomTick may earn from qualifying purchases.";

/**
 * Ensures a valid image URL without duplicate prefixes.
 * Handles:
 * - /assets/foo.webp -> BASE_URL + ASSET_PREFIX + /assets/foo.webp (avoiding duplication)
 * - https://example.com/foo.webp -> unchanged
 */
export function getImageUrl(url?: string, defaultUrl?: string): string {
  const target = url || defaultUrl || "";
  if (!target) return "";
  if (target.startsWith('http')) return target;

  // Normalize path by removing duplicate base/asset prefixes if they already exist in the string
  let path = target;
  if (BASE_URL && path.startsWith(BASE_URL)) {
    path = path.replace(BASE_URL, '');
  }
  if (ASSET_PREFIX && path.startsWith(ASSET_PREFIX)) {
    path = path.replace(ASSET_PREFIX, '');
  }

  // Ensure path starts with a single slash
  path = '/' + path.replace(/^\/+/, '');

  return `${BASE_URL}${ASSET_PREFIX}${path}`;
}

export function generateMerchSchema(products: ProductCatalogItem[]): SchemaItemList {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => {
      const item: SchemaProduct = {
        "@type": "Product",
        "name": product.title,
        "description": product.description,
        "image": getImageUrl(product.imageUrl),
        "brand": {
          "@type": "Brand",
          "name": "BoomTick"
        },
        "sku": product.id,
        "offers": {
          "@type": "Offer",
          "url": product.href,
        }
      };

      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": item
      };
    })
  };
}

