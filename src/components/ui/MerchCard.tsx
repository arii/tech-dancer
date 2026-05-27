import { Box, Stack, Text, BaseProps } from '@/layouts/Primitives';
import { BaseCard } from './BaseCard';
import { SourceBadge } from './SourceBadge';
import { MerchImageSingle, MerchImagePair, MerchImageFeatured } from './merch/MerchImageDisplay';
import { pickRest } from '@/lib/utils';
import { CONTENT_METADATA_KEYS } from '@/lib/constants';
import { ExternalLink } from 'lucide-react';
import { CategoryPlaceholder } from './CategoryPlaceholder';
import { getMerchImageConfig, legacyImageToMerchImages } from '@/lib/merch/imageDisplay';
import { MerchImageView, MerchDisplayMode, MerchFeaturedSide } from '@/lib/types/content';
import styles from './merch/MerchImages.module.css';

interface MerchCardProps extends BaseProps {
  slug?: string;
  title: string;
  category: string;
  excerpt: string;
  image?: string; // Legacy support
  imageBack?: string; // Legacy support
  images?: MerchImageView[];
  displayMode?: MerchDisplayMode;
  featuredSide?: MerchFeaturedSide;
  shopUrl: string;
  [key: string]: unknown;
}

/**
 * MerchCard for BoomTick Printful items.
 * 
 * Supports flexible image display modes:
 * - "single": One image (front-only or back-only)
 * - "pair": Two equally important images side by side
 * - "featured": Primary image large with secondary as small inset
 * 
 * Distinct from affiliate gear cards:
 * - CTA is always "Shop merch"
 * - Links directly to Printful shop URL
 * - Source badge shows "BoomTick merch"
 * - Simplified layout (no rating badges)
 */
export function MerchCard(props: MerchCardProps) {
  const {
    title,
    category,
    excerpt,
    image,
    imageBack,
    images,
    displayMode,
    featuredSide,
    shopUrl,
  } = props;

  const rest = pickRest(props, [
    ...CONTENT_METADATA_KEYS,
    'shopUrl',
    'images',
    'displayMode',
    'featuredSide',
    'imageBack',
  ] as (keyof MerchCardProps)[]);

  // Normalize images: use new format if available, fall back to legacy
  const normalizedImages = images || legacyImageToMerchImages(image, imageBack);

  // Determine display configuration
  const config = getMerchImageConfig(normalizedImages, displayMode, featuredSide);

  // Render image based on display mode
  const renderImage = () => {
    if (config.displayMode === 'pair' && config.primary && config.secondary) {
      return <MerchImagePair images={[config.primary, config.secondary]} />;
    }

    if (config.displayMode === 'featured' && config.primary) {
      return <MerchImageFeatured primary={config.primary} secondary={config.secondary} />;
    }

    if (config.primary) {
      return <MerchImageSingle image={config.primary} />;
    }

    return <CategoryPlaceholder category={category} />;
  };

  return (
    <BaseCard
      {...rest}
      direction="col"
      gap={3}
      height="full"
      padding={6}
      href={shopUrl}
      target="_blank"
      rel="noopener noreferrer"
      ariaLabel={`Shop BoomTick merch: ${title}`}
    >
      {/* Image zone */}
      <Box
        position="relative"
        overflow="hidden"
        radius="lg"
      >
        {renderImage()}

        {/* Dark overlay */}
        <Box
          position="absolute"
          inset
          className="bg-black/15 pointer-events-none"
          aria-hidden="true"
        />



        {/* Source badge */}
        <SourceBadge type="merch" position="bottom-left" />
      </Box>

      {/* Content */}
      <Stack gap={2}>
        <Text
          as="h3"
          variant="body"
          size="lg"
          weight="font-bold"
          color="main"
          leading="tight"
          className="group-hover:text-accent transition-colors line-clamp-2"
        >
          {title}
        </Text>

        <Text variant="body" size="sm" color="dim" leading="relaxed" className="line-clamp-2">
          {excerpt}
        </Text>
      </Stack>

      {/* CTA */}
      <Box display="flex" align="center" justify="end" marginTop="auto" paddingTop={3} border="t" className="border-line/30">
        <Box display="flex" align="center" gap={1.5} className="group-hover:translate-x-1 transition-transform">
          <Text variant="body" size="sm" weight="font-semibold" color="accent" className="font-semibold">
            Shop merch
          </Text>
          <ExternalLink className="w-4 h-4 text-accent" aria-hidden="true" />
        </Box>
      </Box>
    </BaseCard>
  );
}
