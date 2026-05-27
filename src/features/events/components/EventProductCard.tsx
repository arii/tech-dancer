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
  const imageMode = product.imageMode ?? 'contain';
  const imageHeightClass =
    imageMode === 'apparel'
      ? 'h-56 md:h-64'
      : imageMode === 'wide'
        ? 'h-40 md:h-48'
        : imageMode === 'square'
          ? 'h-48 md:h-52'
          : 'h-48 md:h-56';
  const imageFitClass = imageMode === 'wide' ? 'object-cover' : 'object-contain';
  const imagePositionClass =
    product.imagePosition === 'top'
      ? 'object-top'
      : product.imagePosition === 'bottom'
        ? 'object-bottom'
        : product.imagePosition === 'left'
          ? 'object-left'
          : product.imagePosition === 'right'
            ? 'object-right'
            : 'object-center';

  return (
    <Box as="article" border radius="xl" surface="surface" padding={4} height="full" className="overflow-hidden border-white/10 bg-white/[0.04] shadow-sm transition-all hover:-translate-y-0.5 hover:border-cyan-400/30 hover:shadow-lg">
      <Stack direction="col" gap={3} height="full">
        <Box className={cn('w-full rounded-xl bg-slate-100 ring-1 ring-white/10 overflow-hidden shrink-0', imageHeightClass, imageMode !== 'wide' && 'p-4')}>
          {product.image ? (
            <Box as={isExternal ? 'a' : Link} href={isExternal ? href : undefined} to={!isExternal ? href : undefined} rel={isExternal ? 'noopener noreferrer sponsored' : undefined} target={isExternal ? '_blank' : undefined} display="flex" height="full" width="full" className="hover:opacity-90 transition-opacity">
              <img src={product.image} alt={product.name} className={cn('h-full w-full', imageFitClass, imagePositionClass)} loading="lazy" />
            </Box>
          ) : (
            <Box display="flex" align="center" justify="center" height="full" padding={3}>
              <Text variant="mono" size="xs" color="dim" uppercase>{product.category}</Text>
            </Box>
          )}
        </Box>

        <Stack gap={2} height="full" flex={1} justify="between" minWidth="0">
          <Stack gap={1} minWidth="0">
            <Text as="h3" size={variant === 'featured' ? 'lg' : 'base'} weight="font-bold" color="white" clamp={2} className="leading-snug">
              {product.name}
            </Text>
            <Text size="sm" color="dim" clamp={2} className="leading-6">
              {product.description}
            </Text>
          </Stack>

          <Text as={CtaTag} variant="mono" size="sm" weight="font-semibold" color="accent" className={cn(!isExternal && 'hover:underline')} {...ctaProps}>
            {ctaLabel}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
