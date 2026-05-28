import { useState, type ReactNode } from 'react';
import { Box, Text, Grid } from '@/layouts/Primitives';
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
  imageUrl: string;
  images?: MerchProductImage[];
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
      'block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent overflow-hidden',
      className
    )}
  >
    {children}
  </a>
);

const Label = ({ children }: { children: ReactNode }) => (
  <Box
    position="absolute"
    bottom={2}
    right={2}
    paddingX={1.5}
    paddingY={0.5}
    radius="sm"
    className="bg-surface/80 backdrop-blur-sm border border-line/20 z-10"
  >
    <Text size="micro" weight="font-bold" color="dim" uppercase tracking="wider">
      {children}
    </Text>
  </Box>
);

export function MerchImageDisplay({
  title,
  href,
  imageUrl,
  images,
  imageDisplayMode,
}: MerchImageDisplayProps) {
  const resolved = resolveMerchImages({
    title,
    imageUrl,
    images,
    imageDisplayMode,
  });

  const [activeSide, setActiveSide] = useState<'front' | 'back'>(
    resolved.mode === 'back-prominent' ? 'back' : 'front'
  );

  const hasMultipleImages = (images?.length ?? 0) > 1;

  if (resolved.mode === 'both-equal' && hasMultipleImages) {
    return (
      <Grid
        cols={2}
        gap={2}
        height={{ base: 56, md: 72 }}
      >
        {resolved.equal.map((img, idx) => (
          <ImageLink
            key={img.src + idx}
            href={href}
            title={title}
            className="relative h-full border border-line/20 bg-surface-alt/35"
          >
            <Box
              as="img"
              src={resolveImageSrc(img.src)}
              alt={img.alt}
              maxWidth="full"
              maxHeight="full"
              padding={2}
              className="h-full w-full object-contain transition-all duration-500 hover:scale-[1.02]"
            />
            <Label>{img.side}</Label>
          </ImageLink>
        ))}
      </Grid>
    );
  }

  const activeImage = images?.find(img => img.side === activeSide) || resolved.primary;
  const showToggle = hasMultipleImages && (resolved.mode === 'front-prominent' || resolved.mode === 'back-prominent');

  return (
    <Box
      position="relative"
      height={{ base: 56, md: 72 }}
      className="group/display"
    >
      <ImageLink
        href={href}
        title={title}
        className="h-full border border-line/20 bg-surface-alt/35"
      >
        {activeImage && (
          <Box
            as="img"
            src={resolveImageSrc(activeImage.src)}
            alt={activeImage.alt}
            maxWidth="full"
            maxHeight="full"
            padding={4}
            className="h-full w-full object-contain transition-all duration-500 group-hover/display:scale-[1.02]"
          />
        )}
      </ImageLink>

      {showToggle && (
        <Box
          position="absolute"
          bottom={4}
          left="50%"
          padding={0.5}
          className="-translate-x-1/2 flex items-center gap-0.5 rounded-full bg-surface/90 backdrop-blur-md border border-line/20 shadow-lg z-20"
        >
          {(['front', 'back'] as const).map((side) => {
            const exists = images?.some(img => img.side === side);
            if (!exists) return null;

            const isActive = activeSide === side;

            return (
              <button
                key={side}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveSide(side);
                }}
                className={cn(
                  "px-2 py-0.5 rounded-full transition-all duration-200 border border-transparent",
                  isActive
                    ? "bg-accent/80 text-white shadow-sm"
                    : "text-text-dim hover:text-text-main hover:bg-surface-alt"
                )}
              >
                <Text
                  size="micro"
                  weight="font-bold"
                  uppercase
                  tracking="wider"
                  className="pointer-events-none"
                  color={isActive ? "white" : "dim"}
                >
                  {side}
                </Text>
              </button>
            );
          })}
        </Box>
      )}

      {!showToggle && activeImage?.side === 'back' && (
        <Label>Back</Label>
      )}
    </Box>
  );
}
