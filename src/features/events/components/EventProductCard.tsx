import { Link } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { affiliateManager } from '@/lib/affiliateManager';
import { detectContentType, getCtaLabel, getSourceBadge } from '@/lib/contentTypeDetector';
import type { AffiliateLink } from '@/types';
import { cn } from '@/lib/utils';

export type Product = AffiliateLink;

interface EventProductCardProps {
  product: Product & {
    imageFit?: 'contain' | 'cover' | 'fill' | 'scale-down';
    imagePosition?: string;
    imagePadding?: boolean;
  };
  variant?: 'compact' | 'featured';
}

export function EventProductCard({ product, variant = 'compact' }: EventProductCardProps) {
  const href = affiliateManager.resolveResourceHref({ id: product.id, gearSlug: product.gearSlug });
  const isExternal = /^https?:\/\//.test(href);
  const CtaTag = isExternal ? 'a' : Link;
  const ctaProps = isExternal
    ? { href, rel: 'noopener noreferrer sponsored', target: '_blank' }
    : { to: href };

  const contentType = detectContentType(product);
  const ctaLabel = getCtaLabel(contentType, isExternal);
  const sourceBadge = getSourceBadge(contentType);

  // Image display options
  const imageFit = product.imageFit || 'contain';
  const imagePosition = product.imagePosition || 'center';
  const shouldPadImage = product.imagePadding !== false;

  return (
    <Box
      as="article"
      border
      radius="xl"
      surface="surface"
      padding={4}
      height="full"
      maxHeight={64}
      className="overflow-hidden transition-colors hover:border-line-hover relative"
    >
      <Stack direction={{ base: 'row', md: 'col' }} gap={4} height="full">
        <Box
          width={{ base: 24, md: 'full' }}
          minHeight={{ base: 24, md: variant === 'featured' ? 56 : 40 }}
          radius="lg"
          overflow="hidden"
          shrink={false}
          padding={shouldPadImage ? 3 : 0}
          className={shouldPadImage ? "bg-surface-alt/30" : "bg-surface-alt/20"}
        >
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className={`h-full w-full ${imageFit === 'cover' ? 'object-cover' : 'object-contain'} transition-opacity duration-300`} 
              style={{ objectPosition: imagePosition }}
              loading="lazy" 
            />
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
            {/* Source badge moved from image to body metadata */}
            <Text size="xs" weight="font-medium" color="dim" className="whitespace-nowrap pt-1">
              {sourceBadge}
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
            {ctaLabel}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
