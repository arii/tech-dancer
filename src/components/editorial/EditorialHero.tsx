import { Box } from '@/layouts/Primitives';
import { ProductImageFrame } from '@/components/ui/ProductImageFrame';
import { journalVariants } from '@/lib/variants';

interface EditorialHeroProps {
  src: string;
  alt: string;
  aspectRatio?: "video" | "square" | string | { base?: string, md?: string, lg?: string };
  objectFit?: 'cover' | 'contain';
}

/**
 * Featured hero image for blog posts with mandatory alt text for accessibility.
 */
export function EditorialHero({ src, alt, aspectRatio = { base: "square", md: "video" }, objectFit = 'cover' }: EditorialHeroProps) {
  return (
    <Box
      width="full"
      radius="md"
      overflow="hidden"
      border
      className={journalVariants.card({ variant: 'hero' })}
      aspect={aspectRatio}
      maxHeight={{ base: 64, md: 80, lg: 96 }}
    >
      <ProductImageFrame
        src={src}
        alt={alt}
        objectFit={objectFit}
        border={false}
        radius="none"
        aspect="auto"
        className="w-full h-full max-h-64 md:max-h-80 lg:max-h-96"
      />
    </Box>
  );
}
