import { Box } from '@/layouts/Primitives';
import { ProductImageFrame } from '@/components/ui/ProductImageFrame';
import { journalVariants } from '@/lib/variants';

interface EditorialHeroProps {
  src: string;
  alt: string;
  aspectRatio?: "video" | "square" | string | { base?: string, md?: string, lg?: string };
  objectFit?: 'cover' | 'contain';
  objectPosition?: 'top' | 'center' | 'bottom';
}

/**
 * Featured hero image for blog posts with mandatory alt text for accessibility.
 *
 * `aspectRatio` is still accepted from existing callers but is inert since the
 * OD-21 hero fix: the ProductImageFrame owns the box (natural ratio on mobile,
 * video crop on md), so a reserved outer aspect no longer applies.
 */
export function EditorialHero({
  src,
  alt,
  objectFit = 'cover',
  objectPosition = 'top'
}: EditorialHeroProps) {
  return (
    <Box
      width="full"
      radius="md"
      overflow="hidden"
      border
      className={journalVariants.card({ variant: 'hero' })}
    >
      {/* The frame owns the box: a reserved outer aspect (square capped at
          40vh) next to an auto-height frame letterboxed ~200px of dead band.
          Mobile shows the image's natural ratio; md keeps the video crop. */}
      <ProductImageFrame
        src={src}
        alt={alt}
        objectFit={objectFit}
        objectPosition={objectPosition}
        border={false}
        radius="none"
        aspect={{ base: 'auto', md: 'video' }}
        className={`w-full h-auto object-${objectFit}`}
      />
    </Box>
  );
}
