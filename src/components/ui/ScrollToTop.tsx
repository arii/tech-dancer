import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

interface ScrollToTopProps {
  containerRef?: React.RefObject<HTMLElement | null>;
}

/**
 * ScrollToTop component ensures that every time the route changes (pathname),
 * the relevant scroll containers are reset to the top.
 */
export function ScrollToTop({ containerRef }: ScrollToTopProps) {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useLayoutEffect(() => {
    // Only reset scroll for new navigations (PUSH/REPLACE)
    // History navigation (POP) should rely on restoration logic
    if (navType !== 'POP' && !window.location.hash) {
      // 1. Reset window scroll
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });

      // 2. Reset custom container scroll if provided
      if (containerRef?.current) {
        containerRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant',
        });
      }
    }
  }, [pathname, navType, containerRef]);

  return null;
}
