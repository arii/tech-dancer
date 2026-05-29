import { type ReactNode } from 'react';
import { Box, Grid } from '@/layouts/Primitives';
import { ASSET_PREFIX } from '@/config/constants';
import type {
  MerchImageDisplayMode,
  MerchProductImage,
} from '@/data/products/catalog';
import { resolveMerchImages } from '@/lib/merch/imageDisplay';
import { cn } from '@/lib/utils';

interface MerchImageDisplayProps {
  title: string;
  href: string;
  images: MerchProductImage[];
  imageDisplayMode?: MerchImageDisplayMode;
}

function resolveImageSrc(src: string) {
  if (src.startsWith('http')) return src;
  return `${ASSET_PREFIX}${src}`;
}

interface ImageLinkProps {
  href: string;
  title: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

const ImageLink = ({
  href,
  title,
  children,
  className,
  ariaLabel,
}: ImageLinkProps) => (
  <a
    href={href}
    rel="sponsored noopener noreferrer"
    target="_blank"
    aria-label={ariaLabel || `View ${title} on Printful`}
    className={cn(
      'block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent overflow-hidden',
      className
    )}
  >
    {children}
  </a>
);

export function MerchImageDisplay({
  title,
  href,
  images,
  imageDisplayMode,
}: MerchImageDisplayProps) {
  const resolved = resolveMerchImages({
    title,
    images,
    imageDisplayMode,
  });

  const hasMultipleImages = images.length > 1;

  // Single mode or fallback
  if (resolved.mode === 'single' || !hasMultipleImages) {
    return (
      <Box
        position="relative"
        height={{ base: 56, md: 72 }}
        className="group/display rounded-lg border border-line/20 bg-surface-alt/35 overflow-hidden"
      >
        <ImageLink href={href} title={title} className="h-full">
          {resolved.primary && (
            <Box
              as="img"
              src={resolveImageSrc(resolved.primary.src)}
              alt={resolved.primary.alt}
              maxWidth="full"
              maxHeight="full"
              padding={4}
              className="h-full w-full object-contain transition-all duration-500 group-hover/display:scale-105"
            />
          )}
        </ImageLink>
      </Box>
    );
  }

  // Both equal mode - side by side
  if (resolved.mode === 'both-equal') {
    // Ensure there are at least two images for this mode, otherwise fallback to single
    if (resolved.equal.length < 2) {
      const fallbackImg = resolved.equal[0];
      return (
        <Box
          position="relative"
          height={{ base: 56, md: 72 }}
          className="group/display rounded-lg border border-line/20 bg-surface-alt/35 overflow-hidden"
        >
          <ImageLink href={href} title={title} className="h-full">
            {fallbackImg && (
              <Box
                as="img"
                src={resolveImageSrc(fallbackImg.src)}
                alt={fallbackImg.alt}
                maxWidth="full"
                maxHeight="full"
                padding={4}
                className="h-full w-full object-contain transition-all duration-500 group-hover/display:scale-105"
              />
            )}
          </ImageLink>
        </Box>
      );
    }

    return (
      <Grid
        cols={2}
        gap={2}
        height={{ base: 56, md: 72 }}
        className="group/display"
      >
        {resolved.equal.map((img, idx) => (
          <ImageLink
            key={img.src + idx}
            href={href}
            title={title}
            className="relative h-full rounded-lg border border-line/20 bg-surface-alt/35"
          >
            <Box
              as="img"
              src={resolveImageSrc(img.src)}
              alt={img.alt}
              maxWidth="full"
              maxHeight="full"
              padding={2}
              className="h-full w-full object-contain transition-all duration-500 hover:scale-105"
            />
          </ImageLink>
        ))}
      </Grid>
    );
  }

  // Prominent modes (front-prominent or back-prominent)
  const primaryImage = resolved.primary;
  const secondaryImage = resolved.secondary;

  return (
    <Box
      position="relative"
      height={{ base: 56, md: 72 }}
      className="group/display rounded-lg border border-line/20 bg-surface-alt/35 overflow-hidden"
    >
      {/* Primary Image */}
      <ImageLink href={href} title={title} className="h-full">
        {primaryImage && (
          <Box
            as="img"
            src={resolveImageSrc(primaryImage.src)}
            alt={primaryImage.alt}
            maxWidth="full"
            maxHeight="full"
            padding={4}
            className="h-full w-full object-contain transition-all duration-500 group-hover/display:scale-105"
          />
        )}
      </ImageLink>

      {/* Secondary Image Inset */}
      {secondaryImage && (
        <Box
          position="absolute"
          bottom={2}
          left={2}
          width="30%"
          height="30%"
          radius="md"
          className="z-10 bg-surface border border-line/40 shadow-xl overflow-hidden hover:scale-110 transition-transform duration-300"
        >
          <ImageLink
            href={href}
            title={title}
            className="h-full w-full"
            ariaLabel={`View ${secondaryImage.side} of ${title} on Printful`}
          >
            <Box
              as="img"
              src={resolveImageSrc(secondaryImage.src)}
              alt={secondaryImage.alt}
              maxWidth="full"
              maxHeight="full"
              padding={1}
              className="h-full w-full object-contain"
            />
          </ImageLink>
        </Box>
      )}
    </Box>
  );
}
