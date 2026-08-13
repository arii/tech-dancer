// src/components/ProductJsonLd.tsx
import React from 'react';
import { buildProductJsonLd, ProductItem } from '@/lib/schemaGenerator';

export interface ProductJsonLdProps {
  item: ProductItem;
}

const ProductJsonLd: React.FC<ProductJsonLdProps> = ({ item }) => {
  const schemaData = buildProductJsonLd(item);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default ProductJsonLd;
