import { useEffect, MutableRefObject } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export function useScrollManagement(
  scrollRef: MutableRefObject<HTMLElement | null>
) {
  const { pathname, key, hash } = useLocation();
  const navType = useNavigationType();
  // Unified Scroll Management: Reset on navigation, Restore on history, Handle anchors
  useEffect(() => {
    const container = scrollRef.current;

    // Save scroll position for the CURRENT page before we navigate away
    const handleSaveScroll = () => {
      const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
      sessionStorage.setItem(`scroll-${key}`, scrollPos.toString());
    };

    window.addEventListener('beforeunload', handleSaveScroll);

    if (navType === 'POP' && !hash) {
      // 1. History Navigation: Restore position
      const savedPosition = sessionStorage.getItem(`scroll-${key}`);
      if (savedPosition) {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: parseInt(savedPosition, 10),
            behavior: 'auto'
          });
        });
      }
    } else if (hash) {
      // 2. Hash Navigation: Scroll to target element with ResizeObserver
      const id = hash.replace('#', '');
      let lastHeight = container.scrollHeight;
      let attempts = 0;
      const MAX_ATTEMPTS = 10;
      const SETTLE_TIME = 2000;

      const performScroll = () => {
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetY = rect.top + scrollTop - 128; // scroll-mt-32

            window.scrollTo({
              top: targetY,
              behavior: 'smooth'
            });
          }
        });
        return Boolean(document.getElementById(id));
      };

      const observer = new ResizeObserver(() => {
        requestAnimationFrame(() => {
          if (!container) return;
          const currentHeight = container.scrollHeight;
          if (currentHeight !== lastHeight) {
            lastHeight = currentHeight;
            performScroll();
            attempts++;

            if (attempts >= MAX_ATTEMPTS) {
              observer.disconnect();
            }
          }
        });
      });

      // Also observe document body as images might be outside the container but affect layout
      // though in our case they are likely inside.
      observer.observe(container);

      // Initial attempt with a small delay to ensure React has rendered
      const initialTid = window.setTimeout(performScroll, 100);

      // Disconnect after settle time to prevent infinite observer
      const settleTimer = window.setTimeout(() => {
        observer.disconnect();
      }, SETTLE_TIME);

      return () => {
        observer.disconnect();
        window.clearTimeout(settleTimer);
        window.clearTimeout(initialTid);
      };
    } else {
      // 3. New Navigation: Reset to top
      window.scrollTo(0, 0);
    }

    return () => {
      window.removeEventListener('beforeunload', handleSaveScroll);
    };
  }, [pathname, key, hash, navType, scrollRef]);

}
