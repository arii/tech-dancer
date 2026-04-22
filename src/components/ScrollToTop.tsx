import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that ensures the main scrollable container resets to the top
 * when the route changes. This is necessary because MainLayout uses a
 * scrollable main element instead of standard window scrolling.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Find the main scrollable element
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTo(0, 0);
    }
    // Also scroll window just in case
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
