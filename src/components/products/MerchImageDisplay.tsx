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
  isFeatured?: boolean;
}

function resolveImageSrc(src: string) {
  if (src.startsWith('http')) return src;
  if (src.startsWith('/')) return `${ASSET_PREFIX}${src}`;
  return `${ASSET_PREFIX}/${src}`;
}

function MerchImage({ image, label, loading }: { image: MerchProductImage; label?: boolean; loading?: 'eager' | 'lazy' }) {
  const imgWell = (
    <Box position="relative" display="flex" align="center" justify="center" width="full" overflow="hidden" radius="sm" aspect="square" className="bg-surface-alt/35 border border-line/20 group-hover:border-accent/40 transition-colors">
      <Box
        as="img"
        src={resolveImageSrc(image.src)}
        alt={image.alt}
        width="full"
        height="full"
        padding={{ base: 4, md: 6 }}
        loading={loading ?? 'lazy'}
        decoding="async"
        onError={(e) => {
          e.currentTarget.src = `${ASSET_PREFIX}/icon.svg`;
        }}
        className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
      />
    </Box>
  );

  if (!label) return imgWell;

  return (
    <Stack height="full" gap={1}>
      <Box flex width="full" minHeight="0">
        {imgWell}
      </Box>
      <Text variant="mono" size="micro" weight="font-bold" color="dim" uppercase tracking="wide" align="center">
        {image.side === 'front' ? 'Front' : 'Back'}
      </Text>
    </Stack>
  );
}

function SingleImage({ image }: { image: MerchProductImage }) {
  // Show labels only when two images are visible (handled in EqualImages and ProminentImages)
  return <MerchImage image={image} label={false} loading="eager" />;
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
    <Grid cols={5} gap={2} height="full">
      <Box span={3} height="full">
        <MerchImage image={primary} loading="eager" label />
      </Box>
      <Box span={2} height="full">
        <MerchImage image={secondary} label />
      </Box>
    </Grid>
  );
}

export function MerchImageDisplay({ title, href, imageUrl, images, imageDisplayMode, isFeatured }: MerchImageDisplayProps) {
  const resolved = resolveMerchImages({ title, imageUrl, images, imageDisplayMode });
  const primary = resolved.primary;
  if (!primary) return null;

  return (
    <Box
      as="a"
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      aria-label={`View ${title} on Printful`}
      display="block"
      width="full"
      height={isFeatured ? { base: 64, sm: 72, md: 96 } : { base: 48, sm: 56, md: 64 }}
      radius="sm"
      overflow="hidden"
      className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Box width="full" height="full" minHeight="0">
        {resolved.mode === 'both-equal' && resolved.equal.length > 1 ? (
          <EqualImages images={resolved.equal} />
        ) : (resolved.mode === 'front-prominent' || resolved.mode === 'back-prominent') && resolved.secondary ? (
          <ProminentImages primary={primary} secondary={resolved.secondary} />
        ) : (
          <SingleImage image={primary} />
        )}
      </Box>
    </Box>
  );
}
