import { Link } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { affiliateManager } from '@/lib/affiliateManager';
import { detectContentType, getCtaLabel } from '@/lib/contentTypeDetector';
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
  const ctaProps = isExternal ? { href, rel: 'noopener noreferrer sponsored', target: '_blank' } : { to: href };
  const ctaLabel = getCtaLabel(detectContentType(product), isExternal);

  return (
    <Box as="article" border radius="xl" surface="surface" padding={3} height="full" className="overflow-hidden transition-colors hover:border-line-hover">
      <Stack direction="col" gap={3} height="full">
        <Box className={cn('w-full rounded-lg bg-white overflow-hidden shrink-0', variant === 'featured' ? 'h-28' : 'h-24')}>
          {product.image ? (
            <Box as={isExternal ? 'a' : Link} href={isExternal ? href : undefined} to={!isExternal ? href : undefined} rel={isExternal ? 'noopener noreferrer sponsored' : undefined} target={isExternal ? '_blank' : undefined} display="flex" height="full" width="full" className="hover:opacity-90 transition-opacity">
              <Box padding={2} width="full" height="full">
                <img src={product.image} alt={product.name} className="h-full w-full object-contain" loading="lazy" />
              </Box>
            </Box>
          ) : (
            <Box display="flex" align="center" justify="center" height="full" padding={3}>
              <Text variant="mono" size="xs" color="dim" uppercase>{product.category}</Text>
            </Box>
          )}
        </Box>

        <Stack gap={2} height="full" flex={1} justify="between" minWidth="0">
          <Stack gap={1} minWidth="0">
            <Text as="h3" size={variant === 'featured' ? 'base' : 'sm'} weight="font-bold" color="white" clamp={2} className="leading-snug">
              {product.name}
            </Text>
            <Text size="xs" color="dim" clamp={2} className="leading-relaxed">
              {product.description}
            </Text>
          </Stack>

          <Text as={CtaTag} variant="mono" size="xs" weight="font-bold" color="accent" className={cn(!isExternal && 'hover:underline')} {...ctaProps}>
            {ctaLabel}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
