import { Link } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { affiliateManager } from '@/lib/affiliateManager';
import type { AffiliateLink } from '@/types';
import { cn } from '@/lib/utils';

export type Product = AffiliateLink;

interface EventProductCardProps {
  product: Product;
  variant?: 'compact' | 'featured';
}

export function EventProductCard({ product, variant = 'compact' }: EventProductCardProps) {
  const href = affiliateManager.resolveResourceHref({ id: product.id, gearSlug: product.gearSlug });
  const isExternal = /^https?:\/\//.test(href);
  const CtaTag = isExternal ? 'a' : Link;
  const ctaProps = isExternal
    ? { href, rel: 'noopener noreferrer sponsored', target: '_blank' }
    : { to: href };

  return (
    <Box
      as="article"
      border
      radius="xl"
      surface="surface"
      padding={4}
      height="full"
      maxHeight={64}
      className="overflow-hidden transition-colors hover:border-line-hover"
    >
      <Stack direction={{ base: 'row', md: 'col' }} gap={4} height="full">
        <Box
          width={{ base: 24, md: 'full' }}
          height={{ base: 24, md: 28 }}
          radius="lg"
          overflow="hidden"
          shrink={false}
          surface="muted"
        >
          {product.image ? (
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <Box display="flex" align="center" justify="center" height="full" padding={3}>
              <Text variant="mono" size="xs" color="dim" uppercase className="tracking-wide text-center">
                {product.category}
              </Text>
            </Box>
          )}
        </Box>

        <Stack gap={3} height="full" flex={1} justify="between" minWidth="0">
          <Stack gap={2} minWidth="0">
            <Text
              as="h3"
              size={variant === 'featured' ? { base: 'base', md: 'lg' } : { base: 'sm', md: 'base' }}
              weight="font-bold"
              color="white"
              clamp={2}
              className="leading-snug"
            >
              {product.name}
            </Text>
            <Text size={variant === 'featured' ? 'sm' : 'xs'} color="dim" clamp={2} className="leading-relaxed">
              {product.description}
            </Text>
          </Stack>

          <Text
            as={CtaTag}
            variant="mono"
            size="xs"
            weight="font-bold"
            color="accent"
            className={cn(!isExternal && 'hover:underline')}
            {...ctaProps}
          >
            View pick
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
