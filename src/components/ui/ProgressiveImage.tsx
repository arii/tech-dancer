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
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(placeholderSrc || null);

  // Pattern for adjusting state when prop changes during render
  const [prevSrc, setPrevSrc] = useState(src);
  if (src !== prevSrc) {
    setPrevSrc(src);
    setIsLoaded(false);
    if (!placeholderSrc) {
        setCurrentSrc(null);
    }
  }

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };

    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <Box
      aspect={aspect}
      className={cn("relative overflow-hidden bg-line/5", containerClassName)}
    >
      {/* Blur Placeholder */}
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

      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-all duration-1000",
            isLoaded ? "scale-100 blur-0" : "scale-110 blur-xl",
            className
          )}
          loading="lazy"
          {...props}
        />
      )}
    </Box>
  );
}
