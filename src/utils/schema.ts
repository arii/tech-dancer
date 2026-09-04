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
  "brand"?: SchemaBrand;
  "sku": string;
  "mpn": string;
  "offers"?: SchemaOffer;
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
  "name"?: string;
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
  "copyrightNotice"?: string;
  "license"?: string;
  "acquireLicensePage"?: string;
}

/**
 * Ensures a date string is formatted in valid ISO 8601 with a timezone (e.g. YYYY-MM-DDTHH:mm:ssZ).
 * If input is already in ISO format with timezone or offset, returns as-is or normalizes.
 */
export function formatIsoDate(dateStr?: string, defaultTime = "T08:00:00Z"): string {
  if (!dateStr) {
    return new Date().toISOString();
  }
  const trimmed = dateStr.trim();
  // If it's a simple YYYY-MM-DD date
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return `${trimmed}${defaultTime}`;
  }
  // If it has timezone offset or Z already
  if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) {
    if (trimmed.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(trimmed)) {
      return trimmed;
    }
    return `${trimmed}Z`;
  }
  try {
    const parsed = new Date(trimmed);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString();
    }
  } catch {
    // fallback
  }
  return `${trimmed}${defaultTime}`;
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

export const AUTHOR_ARIEL_ANDERS = {
  "@type": "Person" as const,
  "name": "Ariel Anders",
  "jobTitle": "Roboticist & AI Engineer",
  "url": `${BASE_URL}/about`,
  "sameAs": [
    "https://arii.github.io",
    "https://github.com/arii",
    "https://www.linkedin.com/in/ariel-anders/?skipRedirect=true",
    "https://www.instagram.com/onasafari/"
  ]
};

export const PUBLISHER_BOOMTICK = {
  "@type": "Organization" as const,
  "name": "BoomTick.blog",
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject" as const,
    "name": "BoomTick.blog Logo",
    "url": `${BASE_URL}/favicon.ico`
  }
};

export function generateCollectionPageSchema(params: {
  name: string;
  description: string;
  url: string;
  breadcrumbs?: { name: string; path: string }[];
}): Array<Record<string, unknown>> {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": params.name,
    "description": params.description,
    "url": params.url.startsWith('http') ? params.url : `${BASE_URL}${params.url.startsWith('/') ? '' : '/'}${params.url}`,
    "publisher": PUBLISHER_BOOMTICK,
  };

  if (params.breadcrumbs && params.breadcrumbs.length > 0) {
    const breadcrumbSchema = generateBreadcrumbSchema(params.breadcrumbs);
    return [collectionSchema, breadcrumbSchema as unknown as Record<string, unknown>];
  }

  return [collectionSchema];
}

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
      const itemUrl = product.gearSlug ? `${BASE_URL}/gear/${product.gearSlug}` : `${BASE_URL}/gear/${product.id}`;
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
          "url": itemUrl,
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
  copyrightNotice?: string;
  license?: string;
  acquireLicensePage?: string;
}): SchemaImageObject {
  const imageUrl = getImageUrl(params.url);
  const authorName = params.author || "Ariel Anders";
  return {
    "@type": "ImageObject",
    "name": params.caption || params.description || "Image",
    "url": imageUrl,
    "contentUrl": imageUrl,
    ...(params.caption ? { "caption": params.caption } : {}),
    ...(params.description ? { "description": params.description } : {}),
    "creditText": authorName,
    "creator": {
      "@type": "Person",
      "name": authorName
    },
    "copyrightHolder": {
      "@type": "Person",
      "name": authorName
    },
    "copyrightNotice": params.copyrightNotice || `© ${new Date().getFullYear()} ${authorName}. All rights reserved.`,
    "license": params.license || `${BASE_URL}/about#terms`,
    "acquireLicensePage": params.acquireLicensePage || `${BASE_URL}/about`
  };
}

export function generateGearCatalogSchema(resources: Resource[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "West Coast Swing Dance Gear & Reviews",
    "description": "Curated dance gear, recovery tools, and competition essentials for West Coast Swing dancers.",
    "itemListElement": resources.map((resource, index) => {
      const isMerch = resource.provider === 'printful' || !!resource.shopUrl || resource.tags?.includes('merch');
      const itemUrl = `${BASE_URL}/gear/${resource.slug}`;

      if (isMerch) {
        const sku = resource.internalSku || resource.slug;
        const productSchema: SchemaProduct = {
          "@type": "Product",
          "name": resource.title,
          "description": resource.excerpt,
          "image": getImageUrl(resource.image, `/assets/comp_analysis_hero.webp`),
          "sku": sku,
          "mpn": sku,
          "brand": DEFAULT_BRAND,
          "offers": {
            "@type": "Offer",
            "price": parsePrice((resource as unknown as { price?: string | number }).price, "25.00"),
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "url": itemUrl,
            "shippingDetails": DEFAULT_PRINTFUL_SHIPPING_DETAILS,
            "hasMerchantReturnPolicy": DEFAULT_PRINTFUL_RETURN_POLICY
          }
        };

        return {
          "@type": "ListItem",
          "position": index + 1,
          "item": productSchema
        };
      }

      // Non-merch third-party affiliate items are represented as informational Article/WebPage entities, NOT Product schema
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": resource.title,
        "url": itemUrl
      };
    })
  };
}
