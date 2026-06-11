import { Box } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { ResponsiveProp } from '@/layouts/system-utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  aspect?: ResponsiveProp<"square" | "video" | "auto" | string>;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  className?: string;
  containerClassName?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  position?: 'absolute' | 'relative' | 'fixed' | 'sticky';
  inset?: boolean;
}

/**
 * Standardized component for optimized image delivery.
 * Encapsulates responsive sizing, lazy loading, and CLS prevention.
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  sizes,
  aspect,
  loading = 'lazy',
  fetchPriority = 'auto',
  className,
  containerClassName,
  objectFit = 'cover',
  position,
  inset,
}: OptimizedImageProps) {
  return (
    <Box
      position={position}
      inset={inset}
      aspect={aspect}
      overflow="hidden"
      className={containerClassName}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className={cn(
          "w-full h-full transition-opacity duration-500",
          objectFit === 'cover' && "object-cover",
          objectFit === 'contain' && "object-contain",
          className
        )}
      />
    </Box>
  );
}
