import { useState } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ASSET_PREFIX } from '@/config/constants';
import { ZoomIn, Eye } from 'lucide-react';

export interface MerchGalleryImage {
  src: string;
  side: 'front' | 'back' | 'detail' | string;
  alt: string;
}

interface MerchImageGalleryProps {
  title: string;
  images?: MerchGalleryImage[];
  fallbackImage?: string;
  fallbackImageBack?: string;
  badges?: string[];
  roles?: ('lead' | 'follow' | 'switch')[];
}

function resolveImageSrc(src: string) {
  if (!src) return `${ASSET_PREFIX}/icon.svg`;
  if (src.startsWith('http')) return src;
  if (src.startsWith('/')) return `${ASSET_PREFIX}${src}`;
  return `${ASSET_PREFIX}/${src}`;
}

export function MerchImageGallery({
  title,
  images = [],
  fallbackImage,
  fallbackImageBack,
  badges = [],
  roles = [],
}: MerchImageGalleryProps) {
  const normalizedImages: MerchGalleryImage[] = (() => {
    if (images && images.length > 0) return images;
    const list: MerchGalleryImage[] = [];
    if (fallbackImage) {
      list.push({ src: fallbackImage, side: 'front', alt: `${title} - Front View` });
    }
    if (fallbackImageBack) {
      list.push({ src: fallbackImageBack, side: 'back', alt: `${title} - Back View` });
    }
    return list;
  })();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const activeImage = normalizedImages[activeIndex] || {
    src: fallbackImage || `${ASSET_PREFIX}/icon.svg`,
    side: 'front',
    alt: title,
  };

  const getSideLabel = (side: string) => {
    switch (side.toLowerCase()) {
      case 'front':
        return 'Front View';
      case 'back':
        return 'Back View';
      case 'detail':
        return 'Detail View';
      default:
        return side.charAt(0).toUpperCase() + side.slice(1);
    }
  };

  return (
    <Stack gap={4} width="full">
      {/* Primary Display View */}
      <Box
        position="relative"
        display="flex"
        align="center"
        justify="center"
        width="full"
        aspect="square"
        radius="lg"
        overflow="hidden"
        className="bg-surface-alt/40 border border-line/30 group shadow-md"
      >
        {/* Active Product Image */}
        <Box
          as="img"
          src={resolveImageSrc(activeImage.src)}
          alt={activeImage.alt}
          width="full"
          height="full"
          padding={{ base: 4, sm: 6, md: 8 }}
          loading="eager"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = `${ASSET_PREFIX}/icon.svg`;
          }}
          className={`object-contain object-center transition-transform duration-300 ${
            isZoomed ? 'scale-125 cursor-zoom-out' : 'group-hover:scale-105 cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed((prev) => !prev)}
        />

        {/* Badge Overlays */}
        <Box position="absolute" className="top-3 left-3 z-10 pointer-events-none">
          <Stack direction="row" wrap gap={1.5}>
            <Box
              paddingX={2.5}
              paddingY={1}
              radius="full"
              className="bg-bg/80 backdrop-blur-md border border-line/30 shadow-xs"
            >
              <Text variant="mono" size="micro" weight="font-bold" color="main">
                {getSideLabel(activeImage.side)}
              </Text>
            </Box>
            {roles.map((r) => (
              <Box
                key={r}
                paddingX={2.5}
                paddingY={1}
                radius="full"
                className="bg-accent/15 backdrop-blur-md border border-accent/40 shadow-xs"
              >
                <Text variant="mono" size="micro" weight="font-bold" color="accent" uppercase>
                  {r}
                </Text>
              </Box>
            ))}
            {badges.map((b) => (
              <Box
                key={b}
                paddingX={2.5}
                paddingY={1}
                radius="full"
                className="bg-surface/80 backdrop-blur-md border border-line/20 shadow-xs"
              >
                <Text variant="mono" size="micro" weight="font-bold" color="dim">
                  {b}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Quick Zoom Indicator */}
        <Box
          position="absolute"
          paddingX={2.5}
          paddingY={1.5}
          radius="md"
          display="flex"
          align="center"
          gap={1.5}
          className="bottom-3 right-3 bg-bg/80 backdrop-blur-md border border-line/30 shadow-xs opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => setIsZoomed((prev) => !prev)}
        >
          <ZoomIn className="w-3.5 h-3.5 text-text-dim" />
          <Text variant="mono" size="micro" color="dim" weight="font-medium">
            {isZoomed ? 'Reset Zoom' : 'Click to Zoom'}
          </Text>
        </Box>
      </Box>

      {/* View Switchers (Thumbnails & Pill Buttons) */}
      {normalizedImages.length > 1 && (
        <Stack gap={2.5}>
          {/* Pill Toggles for Quick Touch / Screen Readers */}
          <Stack direction="row" gap={2} wrap>
            {normalizedImages.map((img, idx) => {
              const isActive = idx === activeIndex;
              const label = getSideLabel(img.side);
              return (
                <Box
                  key={`pill-${img.side}-${idx}`}
                  as="button"
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  paddingX={4}
                  paddingY={2.5}
                  radius="full"
                  display="inline-flex"
                  align="center"
                  gap={2}
                  className={`min-h-12 border transition-all cursor-pointer font-mono text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive
                      ? 'bg-accent text-bg border-accent shadow-sm'
                      : 'bg-surface-alt/50 text-text-dim border-line/30 hover:border-accent/50 hover:text-text-main'
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Show ${label}`}
                >
                  <Eye className={`w-3.5 h-3.5 ${isActive ? 'text-bg' : 'text-text-dim'}`} />
                  <span>{label}</span>
                </Box>
              );
            })}
          </Stack>

          {/* Thumbnail Strip */}
          <Stack direction="row" gap={3}>
            {normalizedImages.map((img, idx) => {
              const isActive = idx === activeIndex;
              return (
                <Box
                  key={`thumb-${img.side}-${idx}`}
                  as="button"
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  width={16}
                  height={16}
                  padding={1}
                  radius="md"
                  overflow="hidden"
                  position="relative"
                  className={`border-2 transition-all bg-surface-alt/30 cursor-pointer min-h-12 min-w-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive ? 'border-accent ring-1 ring-accent scale-105' : 'border-line/20 opacity-70 hover:opacity-100 hover:border-line/50'
                  }`}
                  aria-label={`Select ${getSideLabel(img.side)}`}
                >
                  <Box
                    as="img"
                    src={resolveImageSrc(img.src)}
                    alt={img.alt}
                    width="full"
                    height="full"
                    className="object-contain object-center"
                  />
                </Box>
              );
            })}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
