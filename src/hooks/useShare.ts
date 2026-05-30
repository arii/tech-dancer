import { useCallback } from 'react';

interface ShareData {
  title: string;
  text?: string;
  url?: string;
}

export function useShare() {
  const share = useCallback((data: ShareData) => {
    if (navigator.share) {
      navigator.share({
        title: data.title,
        text: data.text,
        url: data.url || window.location.href,
      }).catch(console.error);
    }
  }, []);

  return { share };
}
