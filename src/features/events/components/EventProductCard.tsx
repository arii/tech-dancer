import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { affiliateManager } from '@/lib/affiliateManager';
import { detectContentType, getCtaLabel, getSourceBadge } from '@/lib/contentTypeDetector';
import type { AffiliateLink } from '@/types';
import { cn } from '@/lib/utils';

export type Product = AffiliateLink & {
  backImage?: string;
};

interface EventProductCardProps {
  product: Product & {
    imageFit?: 'contain' | 'cover' | 'fill' | 'scale-down';
    imagePosition?: string;
    imagePadding?: boolean;
  };
  variant?: 'compact' | 'featured';
}

export function EventProductCard({ product, variant = 'compact' }: EventProductCardProps) {
  const [showBack, setShowBack] = useState(false);
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
  const imagePosition = product.imagePosition || 'center';
  const mode = product.imageMode || 'contain';

  const isCompact = variant === 'compact';

  const imageContainerClasses = cn(
    "w-full rounded-xl bg-white overflow-hidden shrink-0 relative flex items-center justify-center",
    isCompact ? "h-24 md:h-28" : "h-44 md:h-52",
    (mode === "apparel" || mode === "contain") && "p-2",
    mode === "square" && "p-3"
  );

  const hasBackImage = !!product.backImage;

  return (
    <Box
      as="article"
      border
      radius="xl"
      surface="surface"
      padding={isCompact ? 3 : 4}
      height="full"
      className="group overflow-hidden transition-colors hover:border-line-hover relative"
      onMouseEnter={() => hasBackImage && setShowBack(true)}
      onMouseLeave={() => hasBackImage && setShowBack(false)}
    >
      <Stack direction="col" gap={isCompact ? 3 : 4} height="full">
        <Box className={imageContainerClasses}>
          {product.image ? (
            <Box
              as={isExternal ? 'a' : Link}
              href={isExternal ? href : undefined}
              to={!isExternal ? href : undefined}
              rel={isExternal ? "noopener noreferrer sponsored" : undefined}
              target={isExternal ? "_blank" : undefined}
              display="flex"
              height="full"
              width="full"
              className="hover:opacity-90 transition-opacity cursor-pointer items-center justify-center"
              style={{ textDecoration: 'none' }} // impeccable-ignore
            >
              <img 
                src={showBack && product.backImage ? product.backImage : product.image}
                alt={product.name} 
                className="mx-auto max-h-full max-w-full object-contain pointer-events-none transition-opacity duration-300"
                style={{ objectPosition: imagePosition }} // impeccable-ignore
                loading="lazy" 
              />
            </Box>
          ) : (
            <Box display="flex" align="center" justify="center" height="full" padding={2}>
              <Text variant="mono" size="xs" color="dim" uppercase className="tracking-wide text-center">
                {product.category}
              </Text>
            </Box>
          )}
        </Box>

        <Stack gap={isCompact ? 2 : 3} height="full" flex={1} justify="between" minWidth="0">
          <Stack gap={1.5} minWidth="0">
            <Text
              as="h3"
              size={variant === 'featured' ? { base: 'sm', md: 'base' } : 'xs'}
              weight="font-bold"
              color="white"
              clamp={2}
              className="leading-snug"
            >
              {product.name}
            </Text>
            <Text size="xs" color="dim" clamp={2} className="leading-relaxed">
              {product.description}
            </Text>
            <Box paddingTop={0.5}>
              <Text size="micro" weight="font-medium" color="dim" className="whitespace-nowrap uppercase tracking-wider opacity-60">
                {sourceBadge}
              </Text>
            </Box>
          </Stack>

          <Text
            as={CtaTag}
            variant="mono"
            size="xs"
            weight="font-bold"
            color="accent"
            className={cn(
              "transition-colors",
              !isExternal && 'hover:underline',
              "group-hover:text-accent-hover"
            )}
            {...ctaProps}
          >
            {ctaLabel}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
