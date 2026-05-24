/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Grid } from '@/layouts/Primitives';
import { ProductCard, ProductCardVariant } from './ProductCard';
import { ProductCatalogItem } from '@/data/products/catalog';

interface ProductRailProps {
  items: ProductCatalogItem[];
  variant?: ProductCardVariant;
  context?: string;
}

export function ProductRail({ items, variant = 'full' }: ProductRailProps) {
  return (
    <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={8}>
      {items.map((item) => (
        <ProductCard key={item.id} product={item} variant={variant} />
      ))}
    </Grid>
  );
}
