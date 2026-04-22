import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollContainer } from '@/context/ScrollContext';

/**
 * Component that ensures the main scrollable container resets to the top
 * when the route changes. This is necessary because MainLayout uses a
 * scrollable main element instead of standard window scrolling.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const { scrollRef } = useScrollContainer();

  useEffect(() => {
    // Reset internal container scroll
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [pathname, scrollRef]);

  return null;
}
