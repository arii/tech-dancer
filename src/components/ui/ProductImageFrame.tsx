import { Box, BoxProps } from '@/layouts/Box';
import { cn } from '@/lib/utils';
import { ResponsiveProp } from '@/layouts/system-utils';

interface ProductImageFrameProps extends BoxProps {
  src: string;
  alt: string;
  objectFit?: 'cover' | 'contain';
  aspect?: ResponsiveProp<'video' | 'square' | 'auto' | string>;
  border?: boolean | "t" | "b" | "l" | "r" | "x" | "y";
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
}

export function ProductImageFrame({
  src,
  alt,
  objectFit = 'cover',
  aspect = 'video',
  border = true,
  radius = 'md',
  ...props
}: ProductImageFrameProps) {
  return (
    <Box
      aspect={aspect}
      overflow="hidden"
      border={border}
      radius={radius}
      className="bg-surface-alt"
      {...props}
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
