import { Box } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

import { ResponsiveProp } from '@/layouts/system-utils';

interface ProductImageFrameProps {
  src: string;
  alt: string;
  objectFit?: 'cover' | 'contain';
  aspect?: ResponsiveProp<'video' | 'square' | 'auto' | string>;
  className?: string;
  border?: boolean | "t" | "b" | "l" | "r" | "x" | "y";
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
}

export function ProductImageFrame({
  src,
  alt,
  objectFit = 'cover',
  aspect = 'video',
  className,
  border = true,
  radius = 'md'
}: ProductImageFrameProps) {
  return (
    <Box
      aspect={aspect}
      overflow="hidden"
      border={border}
      radius={radius}
      className={cn("bg-surface-alt", className)}
    >
      <img
        src={src}
        alt={alt}
        width={1280}
        height={720}
        loading="lazy"
        className={cn(
          "w-full h-full transition-opacity duration-300",
          objectFit === 'contain' ? "object-contain p-4" : "object-cover"
        )}
      />
    </Box>
  );
}
