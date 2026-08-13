// src/components/ProductJsonLd.tsx
import { buildProductJsonLd, ProductItem } from '@/lib/schemaGenerator';

export interface ProductJsonLdProps {
  item: ProductItem;
}

const ProductJsonLd = ({ item }: ProductJsonLdProps) => {
  const schemaData = buildProductJsonLd(item);

  return (
    <script type="application/ld+json">
      {JSON.stringify(schemaData)}
    </script>
  );
};

export default ProductJsonLd;
