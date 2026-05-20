import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Navigates back only when provenance appears to be in-app,
 * otherwise falls back to a deterministic route.
 */
export function useSmartBackNavigation(fallbackPath: string) {
  const navigate = useNavigate();

  return useCallback(() => {
    const canUseBrowserBack = (() => {
      if (typeof window === 'undefined') return false;

      const routerIdx = window.history.state?.idx;
      if (typeof routerIdx === 'number' && routerIdx > 0) return true;

      const referrer = document.referrer;
      if (!referrer) return false;

      try {
        const refUrl = new URL(referrer);
        const sameOrigin = refUrl.origin === window.location.origin;
        return sameOrigin;
      } catch {
        return false;
      }
    })();

    if (canUseBrowserBack) {
      navigate(-1);
      return;
    }

    navigate(fallbackPath);
  }, [fallbackPath, navigate]);
}
