import { useState, useCallback } from 'react';

/**
 * Hook to manage image loading states and errors.
 * Centralizes image error state logic to reduce component clutter.
 */
export function useImage(src?: string) {
  const [imgError, setImgError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  // Reset error state when src changes
  if (src !== prevSrc) {
    setPrevSrc(src);
    setImgError(false);
  }

  const handleError = useCallback(() => {
    setImgError(true);
  }, []);

  return {
    imgError,
    handleError
  };
}
