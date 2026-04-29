import { useState, useEffect, type ImgHTMLAttributes } from 'react';
import { Box } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  placeholderSrc?: string;
  alt: string;
  aspect?: "square" | "video" | "auto" | string;
  containerClassName?: string;
}

export function ProgressiveImage({
  src,
  placeholderSrc,
  alt,
  aspect = "video",
  containerClassName,
  className,
  ...props
}: ProgressiveImageProps) {
  // State for the source being rendered, to detect prop changes
  const [renderedSrc, setRenderedSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync state with props during render to avoid cascading renders in useEffect.
  // This ensures isLoaded is reset immediately when src changes.
  if (src !== renderedSrc) {
    setRenderedSrc(src);
    setIsLoaded(false);
  }

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };

    return () => {
      img.onload = null;
    };
  }, [src]);

  // Use the intended src, but apply blur if it's not yet recorded as loaded
  // or use the placeholderSrc if provided.
  const displaySrc = (isLoaded || !placeholderSrc) ? src : placeholderSrc;

  return (
    <Box
      aspect={aspect}
      className={cn("relative overflow-hidden bg-line/5", containerClassName)}
    >
      {/* Blur Overlay - shown when not loaded to provide smooth transition */}
      <Box
        className={cn(
          "absolute inset-0 transition-opacity duration-700 bg-line/10 z-10",
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      />

      <img
        src={displaySrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-1000",
          isLoaded ? "scale-100 blur-0" : "scale-110 blur-xl",
          className
        )}
        loading="lazy"
        {...props}
      />
    </Box>
  );
}
