// src/components/ProductJsonLd.tsx
import { buildProductJsonLd, ProductItem } from '@/lib/schemaGenerator';

export interface ProductJsonLdProps {
  item: ProductItem;
}

const ProductJsonLd = ({ item }: ProductJsonLdProps) => {
  const schemaData = buildProductJsonLd(item);
  const jsonString = JSON.stringify(schemaData).replace(/</g, '\\u003c');

  return (
    <script type="application/ld+json">
      {jsonString}
    </script>
  );
};

export default ProductJsonLd;
