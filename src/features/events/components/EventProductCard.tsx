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

  const isCompact = variant === 'compact';

  const hasBackImage = !!product.backImage;

  return (
    <Box
      as="article"
      radius="2xl"
      padding={isCompact ? 3 : 4}
      height="full"
      className="group overflow-hidden transition-all border border-white/10 bg-white/[0.035] shadow-sm hover:border-cyan-400/40 hover:bg-white/[0.055] relative"
      onMouseEnter={() => hasBackImage && setShowBack(true)}
      onMouseLeave={() => hasBackImage && setShowBack(false)}
    >
      <Stack direction="col" gap={isCompact ? 3 : 4} height="full">
        <Box
          width="full"
          radius="xl"
          overflow="hidden"
          shrink={0}
          position="relative"
          display="flex"
          align="center"
          justify="center"
          className={cn(
            "bg-slate-100 p-6 aspect-[16/9]",
            isCompact ? "h-24 md:h-28" : "h-44 md:h-52"
          )}
        >
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
              align="center"
              justify="center"
              className="hover:opacity-90 transition-opacity cursor-pointer"
              style={{ textDecoration: 'none' }} // impeccable-ignore
            >
              <Box as="img"
                src={showBack && product.backImage ? product.backImage : product.image}
                alt={product.name} 
                marginX="auto"
                className="max-h-full max-w-[82%] object-contain pointer-events-none transition-opacity duration-300"
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
          <Stack gap={1} minWidth="0">
            <Text size="micro" weight="font-semibold" color="accent" className="uppercase tracking-[0.18em] text-[11px] opacity-70">
              {sourceBadge || 'Event Pick'}
            </Text>
            <Text
              as="h3"
              size={variant === 'featured' ? { base: 'sm', md: 'base' } : 'xs'}
              weight="font-bold"
              color="white"
              clamp={2}
              className="leading-snug mt-1"
            >
              {product.name}
            </Text>
            <Text size="xs" color="dim" clamp={2} className="leading-relaxed mt-1">
              {product.description}
            </Text>
          </Stack>

          <Text
            as={CtaTag}
            variant="mono"
            size="xs"
            weight="font-bold"
            color="accent"
            className={cn(
              "transition-colors mt-4 inline-flex",
              !isExternal && 'hover:underline',
              "group-hover:text-accent-hover"
            )}
            {...ctaProps}
          >
            {ctaLabel} →
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
