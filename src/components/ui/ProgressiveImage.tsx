import React, { useState, useEffect } from 'react';
import { Box } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
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
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  // Derived state: we are "loaded" if the currently loaded image matches the intended src
  const isLoaded = loadedSrc === src;

  useEffect(() => {
    // If already loaded (e.g. from cache or same src), no need to do anything
    if (loadedSrc === src) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoadedSrc(src);
    };

    return () => {
      img.onload = null;
    };
  }, [src, loadedSrc]);

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
