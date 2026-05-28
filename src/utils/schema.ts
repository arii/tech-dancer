import type { ProductCatalogItem } from '@/data/products/catalog';
import type { Resource } from '@/lib/types/content';
import { ASSET_PREFIX, BASE_URL } from '@/config/constants';

const POD_SHIPPING_POLICY = {
  "@type": "OfferShippingDetails",
  "description": "Made to order. Production and shipping times vary by product and destination. Final delivery estimates are shown at checkout.",
  "shippingDestination": {
    "@type": "DefinedRegion",
    "addressCountry": "US"
  }
};

const POD_RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  "applicableCountry": "US",
  "returnPolicyCategory": "https://schema.org/UnsupportedReturnPolicy",
  "description": "Each item is made to order. We cannot accept returns or exchanges for size, color, or change of mind. If your item arrives misprinted, damaged, defective, or incorrect, contact us promptly so we can help resolve it."
};

const AMAZON_AFFILIATE_DISCLOSURE = "As an Amazon Associate, BoomTick may earn from qualifying purchases.";

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
          "url": product.href,
          "shippingDetails": POD_SHIPPING_POLICY,
          "hasMerchantReturnPolicy": POD_RETURN_POLICY
        }
      }
    }))
  };
}

export function generateGearCatalogSchema(resources: Resource[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": resources.map((resource, index) => {
      const isMerch = !!resource.shopUrl;
      const isAmazon = resource.affiliateProvider === 'amazon' || (resource.affiliateIds && resource.affiliateIds.length > 0);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const productSchema: any = {
        "@type": "Product",
        "name": resource.title,
        "description": resource.excerpt,
        "image": resource.image ? (resource.image.startsWith('http') ? resource.image : `${BASE_URL}${resource.image}`) : `${BASE_URL}/assets/comp_analysis_hero.webp`,
        "brand": {
          "@type": "Brand",
          "name": "BoomTick"
        },
        "sku": resource.internalSku || resource.slug,
        "offers": {
          "@type": "Offer",
          "url": resource.shopUrl || `${BASE_URL}/gear/${resource.slug}`
        }
      };

      if (isMerch) {
        productSchema.offers.shippingDetails = POD_SHIPPING_POLICY;
        productSchema.offers.hasMerchantReturnPolicy = POD_RETURN_POLICY;
      } else if (isAmazon) {
        productSchema.description = `${resource.excerpt} ${AMAZON_AFFILIATE_DISCLOSURE}`;
      }

      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": productSchema
      };
    })
  };
}
