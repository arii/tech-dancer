import type { ProductCatalogItem } from '@/data/products/catalog';
import type { Resource } from '@/lib/types/content';
import { ASSET_PREFIX, BASE_URL } from '@/config/constants';

export interface SchemaBrand {
  "@type": "Brand";
  "name": string;
}

export interface SchemaShippingDetails {
  "@type": "OfferShippingDetails";
  "description": string;
  "shippingDestination": {
    "@type": "DefinedRegion";
    "addressCountry": string;
  };
}

export interface SchemaMerchantReturnPolicy {
  "@type": "MerchantReturnPolicy";
  "applicableCountry": string;
  "returnPolicyCategory": string;
  "description": string;
}

export interface SchemaOffer {
  "@type": "Offer";
  "price": string;
  "priceCurrency": string;
  "availability": string;
  "itemCondition": string;
  "url": string;
  "shippingDetails"?: SchemaShippingDetails;
  "hasMerchantReturnPolicy"?: SchemaMerchantReturnPolicy;
}

export interface SchemaProduct {
  "@context"?: "https://schema.org";
  "@type": "Product";
  "name": string;
  "description": string;
  "image": string;
  "brand": SchemaBrand;
  "sku": string;
  "mpn": string;
  "offers": SchemaOffer;
}

export interface SchemaBreadcrumbListItem {
  "@type": "ListItem";
  "position": number;
  "name": string;
  "item": string;
}

export interface SchemaBreadcrumbList {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  "itemListElement": SchemaBreadcrumbListItem[];
}

export interface SchemaImageObject {
  "@context"?: "https://schema.org";
  "@type": "ImageObject";
  "url": string;
  "contentUrl"?: string;
  "caption"?: string;
  "description"?: string;
  "creditText"?: string;
  "creator"?: {
    "@type": "Person";
    "name": string;
  };
  "copyrightHolder"?: {
    "@type": "Person" | "Organization";
    "name": string;
  };
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

export const DEFAULT_BRAND: SchemaBrand = {
  "@type": "Brand",
  "name": "BoomTick"
};

export const DEFAULT_PRINTFUL_SHIPPING_DETAILS: SchemaShippingDetails = {
  "@type": "OfferShippingDetails",
  "description": "Made to order. Production and shipping times vary by product and destination. Final delivery estimates are shown at checkout.",
  "shippingDestination": {
    "@type": "DefinedRegion",
    "addressCountry": "US"
  }
};

export const DEFAULT_PRINTFUL_RETURN_POLICY: SchemaMerchantReturnPolicy = {
  "@type": "MerchantReturnPolicy",
  "applicableCountry": "US",
  "returnPolicyCategory": "https://schema.org/UnsupportedReturnPolicy",
  "description": "Each item is made to order. We cannot accept returns or exchanges for size, color, or change of mind. If your item arrives misprinted, damaged, defective, or incorrect, contact us promptly so we can help resolve it."
};

export function parsePrice(price?: string | number, defaultPrice = "24.00"): string {
  if (typeof price === 'number') {
    return price.toFixed(2);
  }
  if (typeof price === 'string') {
    const num = parseFloat(price.replace(/[^0-9.]/g, ''));
    if (!isNaN(num)) {
      return num.toFixed(2);
    }
  }
  return defaultPrice;
}

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

  let path = target;
  if (BASE_URL && path.startsWith(BASE_URL)) {
    path = path.replace(BASE_URL, '');
  }
  if (ASSET_PREFIX && path.startsWith(ASSET_PREFIX)) {
    path = path.replace(ASSET_PREFIX, '');
  }

  path = '/' + path.replace(/^\/+/, '');

  return `${BASE_URL}${ASSET_PREFIX}${path}`;
}

export function generateMerchSchema(products: ProductCatalogItem[]): SchemaItemList {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => {
      const price = parsePrice(product.price, "24.00");
      const item: SchemaProduct = {
        "@type": "Product",
        "name": product.title,
        "description": product.description,
        "image": getImageUrl(product.imageUrl),
        "brand": DEFAULT_BRAND,
        "sku": product.id,
        "mpn": product.id,
        "offers": {
          "@type": "Offer",
          "price": price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "url": product.href,
          "shippingDetails": DEFAULT_PRINTFUL_SHIPPING_DETAILS,
          "hasMerchantReturnPolicy": DEFAULT_PRINTFUL_RETURN_POLICY
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

export function generateBreadcrumbSchema(items: { name: string; path: string }[]): SchemaBreadcrumbList {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.path.startsWith('http') ? item.path : `${BASE_URL}${item.path.startsWith('/') ? '' : '/'}${item.path}`
    }))
  };
}

export function generateImageObjectSchema(params: {
  url: string;
  caption?: string;
  description?: string;
  author?: string;
}): SchemaImageObject {
  const imageUrl = getImageUrl(params.url);
  return {
    "@type": "ImageObject",
    "url": imageUrl,
    "contentUrl": imageUrl,
    ...(params.caption ? { "caption": params.caption } : {}),
    ...(params.description ? { "description": params.description } : {}),
    "creditText": params.author || "Ariel Anders",
    "creator": {
      "@type": "Person",
      "name": params.author || "Ariel Anders"
    },
    "copyrightHolder": {
      "@type": "Person",
      "name": params.author || "Ariel Anders"
    }
  };
}

export function generateGearCatalogSchema(resources: Resource[]): SchemaItemList {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": resources.map((resource, index) => {
      const isAmazon = resource.affiliateProvider === 'amazon';
      const sku = resource.internalSku || resource.slug;
      const rawPrice = (resource as unknown as { price?: string | number }).price;
      const price = parsePrice(rawPrice, "25.00");

      const productSchema: SchemaProduct = {
        "@type": "Product",
        "name": resource.title,
        "description": isAmazon ? `${resource.excerpt} ${AMAZON_AFFILIATE_DISCLOSURE}` : resource.excerpt,
        "image": getImageUrl(resource.image, `/assets/comp_analysis_hero.webp`),
        "brand": DEFAULT_BRAND,
        "sku": sku,
        "mpn": sku,
        "offers": {
          "@type": "Offer",
          "price": price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "url": resource.shopUrl || `${BASE_URL}/gear/${resource.slug}`,
          "shippingDetails": DEFAULT_PRINTFUL_SHIPPING_DETAILS,
          "hasMerchantReturnPolicy": DEFAULT_PRINTFUL_RETURN_POLICY
        }
      };

      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": productSchema
      };
    })
  };
}
