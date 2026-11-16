import { Box } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
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
 */
export function EditorialHero({
  src,
  alt,
  aspectRatio,
  objectFit = 'cover',
  objectPosition = 'top'
}: EditorialHeroProps) {
  const fitsImage = objectFit === 'contain' || !aspectRatio;

  return (
    <Box
      width="full"
      radius="md"
      overflow="hidden"
      border
      className={cn(!fitsImage && 'h-hero-mobile md:h-auto', journalVariants.card({ variant: 'hero' }))}
      aspect={fitsImage ? undefined : aspectRatio}
    >
      <ProductImageFrame
        src={src}
        alt={alt}
        objectFit={objectFit}
        objectPosition={objectPosition}
        border={false}
        radius="none"
        aspect="auto"
        className={fitsImage ? "w-full *:h-auto *:h-hero-mobile" : "w-full h-full"}
      />
    </Box>
  );
}
