import React, { useState, useEffect } from 'react';
import { Box } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspect?: "square" | "video" | "auto" | string;
  containerClassName?: string;
}

export function ProgressiveImage({
  src,
  alt,
  aspect = "video",
  containerClassName,
  className,
  ...props
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [prevSrc, setPrevSrc] = useState(src);

  // Reset state when src changes - Pattern for adjusting state when prop changes
  if (src !== prevSrc) {
    setPrevSrc(src);
    setIsLoaded(false);
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
      {/* Placeholder / Blur effect */}
      <Box
        className={cn(
          "absolute inset-0 transition-opacity duration-500 bg-line/10",
          isLoaded ? "opacity-0" : "opacity-100"
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
            "w-full h-full object-cover transition-all duration-700",
            isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-lg",
            className
          )}
          loading="lazy"
          {...props}
        />
      )}
    </Box>
  );
}
