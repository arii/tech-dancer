
import { useCallback } from 'react';

interface ShareData {
  title: string;
  text?: string;
  url?: string;
}

export function useShare() {
  const share = useCallback((data: ShareData) => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: data.title,
        text: data.text,
        url: data.url || window.location.href,
      }).catch(console.error);
    } else {
      // Fallback: Copy to clipboard
      const url = data.url || (typeof window !== 'undefined' ? window.location.href : '');
      if (url && typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(url)
          .then(() => alert('Link copied to clipboard'))
          .catch(console.error);
      }
    }
  }, []);

  return { share };
}
