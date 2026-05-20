
import { MerchProduct } from '@/data/merch';
import { ASSET_PREFIX, BASE_URL } from '@/config/constants';

export function generateMerchSchema(products: MerchProduct[]) {
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
        "image": `${BASE_URL}${ASSET_PREFIX}${product.imageUrl}`,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "USD",
          "url": product.printfulUrl,
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };
}
