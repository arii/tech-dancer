import { useState, useCallback } from 'react';

export function useImage(src?: string) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const onError = useCallback(() => {
    setError(true);
    setLoading(false);
  }, []);

  const onLoad = useCallback(() => {
    setError(false);
    setLoading(false);
  }, []);

  return {
    error,
    loading,
    onError,
    onLoad,
    // Return a fallback image if there's an error
    displaySrc: error || !src ? 'https://placehold.co/600x400/0f172a/94a3b8?text=Image+Unavailable' : src
  };
}
