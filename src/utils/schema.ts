
import { ProductCatalogItem } from '@/data/products/catalog';
import { ASSET_PREFIX, BASE_URL } from '@/config/constants';

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
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "USD",
          "url": product.href,
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };
}
