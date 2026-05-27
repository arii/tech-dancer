import { Link } from 'react-router-dom';
import { Box, Text } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { GRID_GAP } from '../constants';
import { EventProductCard, type Product } from './EventProductCard';

export type EventProductGridProps = {
  products: Product[];
  variant?: 'compact' | 'featured';
  maxItems?: number;
  showMoreCta?: boolean;
  ctaTo?: string;
  ctaLabel?: string;
};

export function EventProductGrid({
  products,
  variant = 'compact',
  maxItems,
  showMoreCta = true,
  ctaTo = '/gear',
  ctaLabel = 'View more',
}: EventProductGridProps) {
  const resolvedMaxItems = maxItems ?? (variant === 'featured' ? 3 : 6);
  const visibleProducts = products.slice(0, resolvedMaxItems);

  if (visibleProducts.length === 0) {
    return null;
  }

  if (variant !== 'featured' && visibleProducts.length === 1) {
    return null;
  }

  const desktopColumns =
    variant === 'featured'
      ? 'xl:grid-cols-3 2xl:grid-cols-4'
      : 'lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4';
  const hasMore = products.length > visibleProducts.length;

  return (
    <Box>
      <Box
        display="grid"
        className={cn('grid-cols-1 sm:grid-cols-2', GRID_GAP, desktopColumns)}
      >
        {visibleProducts.map((product) => (
          <EventProductCard key={product.id} product={product} variant={variant} />
        ))}
      </Box>
      {showMoreCta && hasMore && (
        <Box marginTop={4}>
          <Text
            as={Link}
            to={ctaTo}
            variant="mono"
            size="xs"
            weight="font-bold"
            color="accent"
            className="hover:underline"
          >
            {ctaLabel}
          </Text>
        </Box>
      )}
    </Box>
  );
}
