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
  const imagePosition = product.imagePosition || 'center';

  const mode = product.imageMode || 'contain';

  const imageSizeClasses: Record<string, string> = {
    wide: "md:h-52",
    contain: "md:h-52",
    apparel: "md:h-72",
    square: "md:h-56",
    frontBack: "md:h-72",
  };

  const mobileImageSizeClasses: Record<string, string> = {
    wide: "h-44",
    contain: "h-44",
    apparel: "h-64",
    square: "h-52",
    frontBack: "h-auto",
  };

  return (
    <Box
      as="article"
      border
      radius="xl"
      surface="surface"
      padding={4}
      height="full"
      className="overflow-hidden transition-colors hover:border-line-hover relative"
    >
      <Stack direction="col" gap={4} height="full">
        <Box
          className={cn(
            "w-full rounded-xl bg-white overflow-hidden shrink-0 relative",
            mobileImageSizeClasses[mode],
            imageSizeClasses[mode],
            mode === "apparel" && "p-4",
            mode === "square" && "p-5",
            mode === "contain" && "p-4"
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
              className="hover:opacity-90 transition-opacity cursor-pointer"
              style={{ textDecoration: 'none' }} // impeccable-ignore
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className={cn(
                  "mx-auto h-full w-full pointer-events-none transition-opacity duration-300",
                  mode === "wide" ? "object-cover" : "object-contain"
                )}
                style={{ objectPosition: imagePosition }} // impeccable-ignore
                loading="lazy" 
              />
            </Box>
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
            <Box paddingTop={1}>
              <Text size="xs" weight="font-medium" color="dim" className="whitespace-nowrap">
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
