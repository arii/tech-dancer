import { Box } from '@/layouts/Primitives';
import { ProductImageFrame } from '@/components/ui/ProductImageFrame';
import { journalVariants } from '@/lib/variants';

interface EditorialHeroProps {
  src: string;
  alt: string;
  aspectRatio?: "video" | "square" | string | { base?: string, md?: string, lg?: string };
}

/**
 * Featured hero image for blog posts with mandatory alt text for accessibility.
 */
export function EditorialHero({ src, alt, aspectRatio = { base: "square", md: "video" } }: EditorialHeroProps) {
  return (
    <Box
      width="full"
      radius="2xl"
      overflow="hidden"
      border
      className={journalVariants.card({ variant: 'hero' })}
      aspect={aspectRatio}
    >
      <ProductImageFrame
        src={src}
        alt={alt}
        objectFit="cover"
        border={false}
        radius="none"
        aspect={aspectRatio}
      />
    </Box>
  );
}
