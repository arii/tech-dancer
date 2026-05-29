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
  "deliveryTime"?: {
    "@type": "ShippingDeliveryTime";
    "handlingTime": {
      "@type": "QuantitativeValue";
      "minValue": number;
      "maxValue": number;
      "unitCode": string;
    };
    "transitTime": {
      "@type": "QuantitativeValue";
      "minValue": number;
      "maxValue": number;
      "unitCode": string;
    };
  };
  "shippingRate"?: {
    "@type": "MonetaryAmount";
    "value": string;
    "currency": string;
  };
}

export interface SchemaReturnPolicy {
  "@type": "MerchantReturnPolicy";
  "applicableCountry": string;
  "returnPolicyCategory": string;
  "description": string;
  "merchantReturnDays"?: number;
  "returnMethod"?: string;
  "returnFees"?: string;
}

export interface SchemaReview {
  "@type": "Review";
  "reviewRating": {
    "@type": "Rating";
    "ratingValue": string;
    "bestRating": string;
  };
  "author": {
    "@type": "Person";
    "name": string;
  };
}

export interface SchemaAggregateRating {
  "@type": "AggregateRating";
  "ratingValue": string;
  "reviewCount": string;
}

export interface SchemaOffer {
  "@type": "Offer";
  "url": string;
  "price": string;
  "priceCurrency": string;
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
  "review"?: SchemaReview;
  "aggregateRating"?: SchemaAggregateRating;
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
  },
  "deliveryTime": {
    "@type": "ShippingDeliveryTime",
    "handlingTime": {
      "@type": "QuantitativeValue",
      "minValue": 2,
      "maxValue": 5,
      "unitCode": "DAY"
    },
    "transitTime": {
      "@type": "QuantitativeValue",
      "minValue": 3,
      "maxValue": 10,
      "unitCode": "DAY"
    }
  },
  "shippingRate": {
    "@type": "MonetaryAmount",
    "value": "6.50",
    "currency": "USD"
  }
} as const;

export const POD_RETURN_POLICY: SchemaReturnPolicy = {
  "@type": "MerchantReturnPolicy",
  "applicableCountry": "US",
  "returnPolicyCategory": "https://schema.org/UnsupportedReturnPolicy",
  "description": "Each item is made to order. We cannot accept returns or exchanges for size, color, or change of mind. If your item arrives misprinted, damaged, defective, or incorrect, contact us promptly so we can help resolve it.",
  "merchantReturnDays": 0,
  "returnMethod": "https://schema.org/ReturnByMail",
  "returnFees": "https://schema.org/ReturnFeesCustomerResponsibility"
} as const;

export const AMAZON_AFFILIATE_DISCLOSURE = "As an Amazon Associate, BoomTick may earn from qualifying purchases.";

export const DEFAULT_AGGREGATE_RATING: SchemaAggregateRating = {
  "@type": "AggregateRating",
  "ratingValue": "5",
  "reviewCount": "1"
} as const;

export const DEFAULT_REVIEW: SchemaReview = {
  "@type": "Review",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Ariel Anders, PhD"
  }
} as const;

export function generateMerchSchema(products: ProductCatalogItem[]): SchemaItemList {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.title,
        "description": product.description,
        "image": product.imageUrl.startsWith('http') ? product.imageUrl : `${BASE_URL}${ASSET_PREFIX}${product.imageUrl}`,
        "brand": {
          "@type": "Brand",
          "name": "BoomTick"
        },
        "sku": product.id,
        "offers": {
          "@type": "Offer",
          "url": product.href,
          "price": product.price || "0.00",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "shippingDetails": POD_SHIPPING_POLICY,
          "hasMerchantReturnPolicy": POD_RETURN_POLICY
        },
        "aggregateRating": DEFAULT_AGGREGATE_RATING,
        "review": DEFAULT_REVIEW
      }
    }))
  };
}

export function generateGearCatalogSchema(resources: Resource[]): SchemaItemList {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": resources.map((resource, index) => {
      const isMerch = !!resource.shopUrl;
      const isAmazon = resource.affiliateProvider === 'amazon' || (resource.affiliateIds && resource.affiliateIds.length > 0);

      const productSchema: SchemaProduct = {
        "@type": "Product",
        "name": resource.title,
        "description": isAmazon ? `${resource.excerpt} ${AMAZON_AFFILIATE_DISCLOSURE}` : resource.excerpt,
        "image": resource.image ? (resource.image.startsWith('http') ? resource.image : `${BASE_URL}${resource.image}`) : `${BASE_URL}/assets/comp_analysis_hero.webp`,
        "brand": {
          "@type": "Brand",
          "name": "BoomTick"
        },
        "sku": resource.internalSku || resource.slug,
        "offers": {
          "@type": "Offer",
          "url": resource.shopUrl || `${BASE_URL}/gear/${resource.slug}`,
          "price": "0.00", // Default or calculated price
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          ...(isMerch ? {
            "shippingDetails": POD_SHIPPING_POLICY,
            "hasMerchantReturnPolicy": POD_RETURN_POLICY
          } : {})
        },
        "aggregateRating": DEFAULT_AGGREGATE_RATING,
        "review": DEFAULT_REVIEW
      };

      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": productSchema
      };
    })
  };
}
