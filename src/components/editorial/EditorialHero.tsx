import { Box } from '@/layouts/Primitives';
import { SafeImage } from '@/components/ui/SafeImage';
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
export function EditorialHero({ src, alt, aspectRatio = { base: "square", md: "video" }, objectFit = 'contain' }: EditorialHeroProps) {
  return (
    <Box
      width="full"
      radius="md"
      overflow="hidden"
      border
      className={journalVariants.card({ variant: 'hero' })}
      aspect={aspectRatio}
    >
      <SafeImage
        src={src}
        alt={alt}
        objectFit={objectFit}
        radius="none"
        maxWidth="full"
        maxHeight={{ base: "viewport-half", lg: 96 }}
        className="w-full h-full"
      />
    </Box>
  );
}
