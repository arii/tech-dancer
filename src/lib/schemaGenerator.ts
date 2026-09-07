// src/lib/schemaGenerator.ts
import {
  DEFAULT_BRAND,
  DEFAULT_PRINTFUL_SHIPPING_DETAILS,
  DEFAULT_PRINTFUL_RETURN_POLICY,
  generateBreadcrumbSchema,
  type SchemaBrand,
  type SchemaShippingDetails,
  type SchemaMerchantReturnPolicy,
} from '@/utils/schema';

export { generateBreadcrumbSchema };

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  url: string;
  price?: number;
  currency?: string;
  inStock?: boolean;
  ratingValue?: number;
  reviewCount?: number;
}

export interface SchemaOffer {
  '@type': 'Offer';
  price: string;
  priceCurrency: string;
  availability: string;
  itemCondition: string;
  url: string;
  shippingDetails?: SchemaShippingDetails;
  hasMerchantReturnPolicy?: SchemaMerchantReturnPolicy;
}

export interface SchemaAggregateRating {
  '@type': 'AggregateRating';
  ratingValue: string;
  reviewCount: string;
}

export interface ProductJsonLdData {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description: string;
  image: string[];
  category?: string;
  brand: SchemaBrand;
  sku: string;
  mpn: string;
  offers?: SchemaOffer;
  aggregateRating?: SchemaAggregateRating;
}

/**
 * Generates Schema.org Product JSON-LD structured data.
 * Guarantee: Formats accurate prices and strictly omits aggregateRating when no reviews exist.
 */
export const buildProductJsonLd = (item: ProductItem): ProductJsonLdData => {
  const schema: ProductJsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: item.name,
    description: item.description,
    image: [item.imageUrl],
    category: 'Apparel & Accessories > Clothing',
    brand: DEFAULT_BRAND,
    sku: item.id,
    mpn: item.id,
  };

  // Attach Offer node only when a valid numeric price is provided
  if (typeof item.price === 'number' && !isNaN(item.price) && item.price >= 0) {
    const formattedPrice = item.price.toFixed(2);
    const currency = item.currency ?? 'USD';
    const availability = (item.inStock ?? true)
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock';

    schema.offers = {
      '@type': 'Offer',
      price: formattedPrice,
      priceCurrency: currency,
      availability,
      itemCondition: 'https://schema.org/NewCondition',
      url: item.url,
      shippingDetails: DEFAULT_PRINTFUL_SHIPPING_DETAILS,
      hasMerchantReturnPolicy: DEFAULT_PRINTFUL_RETURN_POLICY,
    };
  }

  // Include aggregateRating ONLY if real, non-zero review metrics exist (NO hallucinated ratings)
  if (
    typeof item.ratingValue === 'number' &&
    !isNaN(item.ratingValue) &&
    typeof item.reviewCount === 'number' &&
    !isNaN(item.reviewCount) &&
    item.reviewCount > 0
  ) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: item.ratingValue.toFixed(1),
      reviewCount: item.reviewCount.toString(),
    };
  }

  return schema;
};
