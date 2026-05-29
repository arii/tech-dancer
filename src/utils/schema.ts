import type { ProductCatalogItem } from '@/data/products/catalog';
import type { Resource } from '@/lib/types/content';
import { ASSET_PREFIX, BASE_URL } from '@/config/constants';

/**
 * SCHEMA POLICY: Conservative Product JSON-LD
 * 1. Merch: Only include ratings or reviews when site has real source data.
 * 2. Gear: Only include price, stock, rating, review, or shipping when from a verified source.
 * 3. Merchant Listing: Added only when exact policy, price, and shipping data is confirmed.
 * 4. Stable fields (name, description, image, URL, brand, SKU) are always included when known.
 */

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

export interface SchemaReturnPolicy {
  "@type": "MerchantReturnPolicy";
  "applicableCountry": string;
  "returnPolicyCategory": string;
  "description": string;
}

export interface SchemaAggregateRating {
  "@type": "AggregateRating";
  "ratingValue": number;
  "reviewCount"?: number;
  "bestRating"?: number;
  "worstRating"?: number;
}

export interface SchemaReview {
  "@type": "Review";
  "reviewRating": {
    "@type": "Rating";
    "ratingValue": number;
  };
  "author": {
    "@type": "Person";
    "name": string;
  };
}

export interface SchemaOffer {
  "@type": "Offer";
  "url": string;
  "price"?: string;
  "priceCurrency"?: string;
  "availability"?: string;
  "shippingDetails"?: SchemaShippingDetails;
  "hasMerchantReturnPolicy"?: SchemaReturnPolicy;
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
  "aggregateRating"?: SchemaAggregateRating;
  "review"?: SchemaReview[];
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

export const POD_SHIPPING_POLICY: SchemaShippingDetails = {
  "@type": "OfferShippingDetails",
  "description": "Made to order. Production and shipping times vary by product and destination. Final delivery estimates are shown at checkout.",
  "shippingDestination": {
    "@type": "DefinedRegion",
    "addressCountry": "US"
  }
} as const;

export const POD_RETURN_POLICY: SchemaReturnPolicy = {
  "@type": "MerchantReturnPolicy",
  "applicableCountry": "US",
  "returnPolicyCategory": "https://schema.org/UnsupportedReturnPolicy",
  "description": "Each item is made to order. We cannot accept returns or exchanges for size, color, or change of mind. If your item arrives misprinted, damaged, defective, or incorrect, contact us promptly so we can help resolve it."
} as const;

export const AMAZON_AFFILIATE_DISCLOSURE = "As an Amazon Associate, BoomTick may earn from qualifying purchases.";

function getImageUrl(url?: string, defaultUrl?: string): string {
  if (!url) return defaultUrl || "";
  return url.startsWith('http') ? url : `${BASE_URL}${ASSET_PREFIX}${url}`;
}

export function generateMerchSchema(products: ProductCatalogItem[]): SchemaItemList {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => {
      const offer: SchemaOffer = {
        "@type": "Offer",
        "url": product.href,
      };

      // Only add policies if it's owned merch (Printful)
      if (product.disclosure === 'owned-printful') {
        offer.shippingDetails = POD_SHIPPING_POLICY;
        offer.hasMerchantReturnPolicy = POD_RETURN_POLICY;
        offer.availability = "https://schema.org/InStock";
      }

      if (product.price) {
        offer.price = product.price.replace(/[^0-9.]/g, '');
        offer.priceCurrency = "USD";
      }

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
        "offers": offer
      };

      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": item
      };
    })
  };
}

export function generateGearCatalogSchema(resources: Resource[]): SchemaItemList {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": resources.map((resource, index) => {
      const isMerch = !!resource.shopUrl && resource.provider === 'printful';
      const isAmazon = resource.affiliateProvider === 'amazon';

      const offer: SchemaOffer = {
        "@type": "Offer",
        "url": resource.shopUrl || `${BASE_URL}/gear/${resource.slug}`,
      };

      if (isMerch) {
        offer.shippingDetails = POD_SHIPPING_POLICY;
        offer.hasMerchantReturnPolicy = POD_RETURN_POLICY;
        offer.availability = "https://schema.org/InStock";
      }

      const productSchema: SchemaProduct = {
        "@type": "Product",
        "name": resource.title,
        "description": isAmazon ? `${resource.excerpt} ${AMAZON_AFFILIATE_DISCLOSURE}` : resource.excerpt,
        "image": getImageUrl(resource.image, `${BASE_URL}/assets/comp_analysis_hero.webp`),
        "brand": {
          "@type": "Brand",
          "name": "BoomTick"
        },
        "sku": resource.internalSku || resource.slug,
        "offers": offer
      };

      // Only add rating if verified in resource data
      if (typeof resource.rating === 'number') {
        productSchema.aggregateRating = {
          "@type": "AggregateRating",
          "ratingValue": resource.rating,
          "bestRating": 5,
          "worstRating": 1
        };
      }

      // Only add verdict as a review if both a verdict AND rating are present
      // Avoid guesstimating ratings for verdicts without numeric scores.
      if (resource.verdict && typeof resource.rating === 'number') {
        productSchema.review = [{
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": resource.rating,
          },
          "author": {
            "@type": "Person",
            "name": resource.author || "Ariel Anders, PhD"
          }
        }];
      }

      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": productSchema
      };
    })
  };
}
