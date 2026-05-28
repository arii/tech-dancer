
import type { ProductCatalogItem } from '@/data/products/catalog';
import type { Resource } from '@/lib/types/content';
import { ASSET_PREFIX, BASE_URL } from '@/config/constants';

const DEFAULT_SHIPPING = {
  "@type": "OfferShippingDetails",
  "shippingRate": {
    "@type": "MonetaryAmount",
    "value": "5.00",
    "currency": "USD"
  },
  "shippingDestination": {
    "@type": "DefinedRegion",
    "addressCountry": "US"
  },
  "deliveryTime": {
    "@type": "ShippingDeliveryTime",
    "handlingTime": {
      "@type": "QuantitativeValue",
      "minValue": 1,
      "maxValue": 3,
      "unitCode": "DAY"
    },
    "transitTime": {
      "@type": "QuantitativeValue",
      "minValue": 2,
      "maxValue": 5,
      "unitCode": "DAY"
    }
  }
};

const DEFAULT_RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  "applicableCountry": "US",
  "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnPeriod",
  "merchantReturnDays": 30,
  "returnMethod": "https://schema.org/ReturnByMail",
  "returnFees": "https://schema.org/FreeReturn"
};

export function generateMerchSchema(products: ProductCatalogItem[]) {
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
          "price": product.price,
          "priceCurrency": "USD",
          "url": product.href,
          "availability": "https://schema.org/InStock",
          "shippingDetails": DEFAULT_SHIPPING,
          "hasMerchantReturnPolicy": DEFAULT_RETURN_POLICY
        }
      }
    }))
  };
}

export function generateGearCatalogSchema(resources: Resource[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": resources.map((resource, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": resource.title,
        "description": resource.excerpt,
        "image": resource.image ? (resource.image.startsWith('http') ? resource.image : `${BASE_URL}${resource.image}`) : `${BASE_URL}/assets/comp_analysis_hero.webp`,
        "brand": {
          "@type": "Brand",
          "name": "BoomTick"
        },
        "sku": resource.sku || resource.slug,
        "offers": {
          "@type": "Offer",
          "price": resource.priceCategory === 'premium' ? '45.00' : '25.00',
          "priceCurrency": "USD",
          "url": resource.shopUrl || `${BASE_URL}/gear/${resource.slug}`,
          "availability": "https://schema.org/InStock",
          "shippingDetails": DEFAULT_SHIPPING,
          "hasMerchantReturnPolicy": DEFAULT_RETURN_POLICY
        }
      }
    }))
  };
}
