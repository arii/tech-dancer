import { Stack, Text, Grid, Box } from '@/layouts/Primitives';
import { ProductCard } from '@/components/products/ProductCard';
import type { ProductCatalogItem } from '@/data/products/catalog';

interface CollectionSectionProps {
  id: string;
  title: string;
  description?: string;
  products: ProductCatalogItem[];
  isFeatured?: boolean;
}

export function CollectionSection({ id, title, description, products, isFeatured }: CollectionSectionProps) {
  if (products.length === 0) return null;

  return (
    <Stack as="section" id={id} gap={5} width="full">
      <Stack gap={1}>
        <Box display="flex" justify="between" align="baseline" wrap="wrap" gap={2}>
          <Text as="h2" variant="headline" size="2xl" weight="font-bold" tracking="tight">
            {title}
          </Text>
          <Text
            as="a"
            href={`#${id}`}
            variant="mono"
            size="xs"
            color="accent"
            weight="font-bold"
            uppercase
            tracking="widest"
            className="hover:underline"
          >
            View collection →
          </Text>
        </Box>
        {description && (
          <Text variant="body" color="dim">
            {description}
          </Text>
        )}
      </Stack>

      {isFeatured ? (
        <Grid cols={{ base: 1, sm: 2, md: 4 }} gap={{ base: 8, md: 10 }} minWidth="0" width="full">
          <Box span={{ base: 1, sm: 2, md: 2 }} width="full">
            <ProductCard item={products[0]} isFeatured />
          </Box>
          {products.slice(1, 3).map((product) => (
            <Box key={`${id}-${product.id}`} span={{ base: 1, sm: 1, md: 1 }} width="full">
              <ProductCard item={product} />
            </Box>
          ))}
        </Grid>
      ) : (
        <Grid cols={{ base: 1, sm: 2, md: 3 }} gap={{ base: 8, md: 10 }} width="full" minWidth="0">
          {products.map((product) => (
            <ProductCard key={`${id}-${product.id}`} item={product} />
          ))}
        </Grid>
      )}
    </Stack>
  );
}
