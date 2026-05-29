import { Box, Grid, Stack, Text } from '@/layouts/Primitives';
import type { MerchImageDisplayMode, MerchProductImage } from '@/data/products/catalog';
import { ASSET_PREFIX } from '@/config/constants';
import { resolveMerchImages } from '@/lib/merch/imageDisplay';

interface MerchImageDisplayProps {
  title: string;
  href: string;
  imageUrl: string;
  images?: MerchProductImage[];
  imageDisplayMode?: MerchImageDisplayMode;
}

function resolveImageSrc(src: string) {
  if (src.startsWith('http')) return src;
  if (src.startsWith('/')) return `${ASSET_PREFIX}${src}`;
  return `${ASSET_PREFIX}/${src}`;
}

function sideLabel(side: MerchProductImage['side']) {
  return side === 'front' ? 'Front' : 'Back';
}

function ImageLabel({ side }: { side: MerchProductImage['side'] }) {
  return (
    <Text variant="mono" size="micro" weight="font-bold" color="dim" uppercase tracking="wide" align="center">
      {sideLabel(side)}
    </Text>
  );
}

function ImageWell({ image, loading }: { image: MerchProductImage; loading?: 'eager' | 'lazy' }) {
  return (
    <Box display="flex" align="center" justify="center" height="full" overflow="hidden" radius="lg" className="bg-surface-alt/35 border border-line/20 group-hover:border-accent/40 transition-colors">
      <Box
        as="img"
        src={resolveImageSrc(image.src)}
        alt={image.alt}
        width="full"
        height="full"
        padding={3}
        loading={loading ?? 'lazy'}
        onError={(event) => {
          event.currentTarget.src = `${ASSET_PREFIX}/icon.svg`;
        }}
        className="object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </Box>
  );
}

function MerchImage({ image, label, loading }: { image: MerchProductImage; label?: boolean; loading?: 'eager' | 'lazy' }) {
  if (!label) return <ImageWell image={image} loading={loading} />;

  return (
    <Stack height="full" gap={1}>
      <Box flex height="full" minHeight="0">
        <ImageWell image={image} loading={loading} />
      </Box>
      <ImageLabel side={image.side} />
    </Stack>
  );
}

function SingleImage({ image }: { image: MerchProductImage }) {
  return <MerchImage image={image} label={image.side === 'back'} loading="eager" />;
}

function EqualImages({ images }: { images: MerchProductImage[] }) {
  return (
    <Grid cols={2} gap={2} height="full">
      {images.map((image, index) => (
        <MerchImage key={`${image.side}-${image.src}`} image={image} label loading={index === 0 ? 'eager' : 'lazy'} />
      ))}
    </Grid>
  );
}

function ProminentImages({ primary, secondary }: { primary: MerchProductImage; secondary?: MerchProductImage }) {
  if (!secondary) return <MerchImage image={primary} loading="eager" />;

  return (
    <Box position="relative" height="full">
      <MerchImage image={primary} loading="eager" label />
      <Box position="absolute" inset height="full" className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100">
        <MerchImage image={secondary} label />
      </Box>
    </Box>
  );
}

function MobileImageScroller({ images }: { images: MerchProductImage[] }) {
  return (
    <Stack direction="row" gap={2} height="full" overflow="x-auto" className="snap-x snap-mandatory overscroll-x-contain">
      {images.map((image, index) => (
        <Box key={`${image.side}-${image.src}`} width="full" shrink={false} height="full" className="snap-center">
          <MerchImage image={image} label={images.length > 1} loading={index === 0 ? 'eager' : 'lazy'} />
        </Box>
      ))}
    </Stack>
  );
}

export function MerchImageDisplay({ title, href, imageUrl, images, imageDisplayMode }: MerchImageDisplayProps) {
  const resolved = resolveMerchImages({ title, imageUrl, images, imageDisplayMode });
  const primary = resolved.primary;
  const mobileImages = [primary, resolved.secondary].filter((image): image is MerchProductImage => Boolean(image));

  if (!primary) return null;

  return (
    <Box
      as="a"
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      aria-label={`View ${title} on Printful`}
      display="block"
      height={{ base: 64, md: 80 }}
      radius="lg"
      overflow="hidden"
      className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Box display={{ base: 'none', md: 'block' }} height="full">
        {resolved.mode === 'both-equal' && resolved.equal.length > 1 ? (
          <EqualImages images={resolved.equal} />
        ) : resolved.mode === 'front-prominent' || resolved.mode === 'back-prominent' ? (
          <ProminentImages primary={primary} secondary={resolved.secondary} />
        ) : (
          <SingleImage image={primary} />
        )}
      </Box>
      <Box display={{ base: 'block', md: 'none' }} height="full">
        <MobileImageScroller images={mobileImages} />
      </Box>
    </Box>
  );
}
