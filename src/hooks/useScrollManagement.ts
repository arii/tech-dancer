import { useEffect, MutableRefObject, useRef } from 'react';
import { useLocation, useNavigationType, useNavigate } from 'react-router-dom';

const SWIPE_THRESHOLD = 50;
const MAIN_ROUTES = ['/', '/blog', '/gear', '/research'];

export function useScrollManagement(
  scrollRef: MutableRefObject<HTMLElement | null>,
  touchStartRef: MutableRefObject<{ x: number; y: number } | null>
) {
  const { pathname, key, hash } = useLocation();
  const navType = useNavigationType();
  const navigate = useNavigate();
  const isNavigating = useRef(false);

  // Reset navigation throttle on route change
  useEffect(() => {
    isNavigating.current = false;
  }, [pathname]);

  // Unified Scroll Management: Reset on navigation, Restore on history, Handle anchors
  useEffect(() => {
    // Force a small delay to ensure refs are attached
    const tid_init = window.setTimeout(() => {
    const container = scrollRef.current;
    if (!container) return;
    const timeouts: number[] = [];

    // Save scroll position for the CURRENT page before we navigate away
    const handleSaveScroll = () => {
      if (container) {
        sessionStorage.setItem(`scroll-${key}`, container.scrollTop.toString());
      }
    };

    window.addEventListener('beforeunload', handleSaveScroll);

    if (navType === 'POP') {
      // 1. History Navigation: Restore position
      const savedPosition = sessionStorage.getItem(`scroll-${key}`);
      if (savedPosition) {
        requestAnimationFrame(() => {
          if (container) container.scrollTop = parseInt(savedPosition, 10);
        });
      }
    } else {
      // 2. New Navigation (PUSH/REPLACE): Reset to top OR scroll to hash
      const handleScroll = () => {
        if (!container) return;

        if (hash) {
          const id = hash.replace('#', '');
          const performScroll = (attempt = 0) => {
            const el = document.getElementById(id);
            if (el && container) {
              const elementRect = el.getBoundingClientRect();
              const containerRect = container.getBoundingClientRect();
              const relativeTop = elementRect.top - containerRect.top;
              const scrollTarget = Math.round(container.scrollTop + relativeTop - 64); // 64 for scroll-padding-top

              if (attempt === 0) {
                container.scrollTop = scrollTarget;
              } else {
                container.scrollTo({
                  top: scrollTarget,
                  behavior: 'smooth'
                });
              }
            }

            // Always schedule next retry until we reach the max attempts,
            // as layout may shift even after the element is found.
            const delays = [100, 500, 1000, 2000];
            if (attempt < delays.length) {
              const tid = window.setTimeout(() => performScroll(attempt + 1), delays[attempt]);
              timeouts.push(tid);
            }
          };

          performScroll();
        } else {
          container.scrollTop = 0;
          window.scrollTo(0, 0);
        }
      };

      const rafId = requestAnimationFrame(handleScroll);
      return () => {
        window.removeEventListener('beforeunload', handleSaveScroll);
        handleSaveScroll();
        cancelAnimationFrame(rafId);
        timeouts.forEach(t => window.clearTimeout(t));
      };
    }

    return () => {
      window.removeEventListener('beforeunload', handleSaveScroll);
      handleSaveScroll();
    };
    }, 10);
    return () => window.clearTimeout(tid_init);
  }, [pathname, key, hash, navType, scrollRef]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const deltaX = touchEnd.x - touchStartRef.current.x;
    const deltaY = touchEnd.y - touchStartRef.current.y;

    // Horizontal swipe check
    if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
      // Ignore swipe if it originates from a horizontally scrollable element
      const target = e.target as HTMLElement;

      const isScrollable = (el: HTMLElement | null): boolean => {
        if (!el || el === e.currentTarget) return false;

        const style = window.getComputedStyle(el);
        const overflowX = style.getPropertyValue('overflow-x');
        const isScrollableX = (overflowX === 'auto' || overflowX === 'scroll' || overflowX === 'overlay') && el.scrollWidth > el.clientWidth;

        if (isScrollableX) {
          // Check if we are at a boundary to allow swiping to the next page
          // If swiping right (deltaX > 0), only block if we can scroll left (scrollLeft > 0)
          // If swiping left (deltaX < 0), only block if we can scroll right (scrollLeft < scrollWidth - clientWidth)
          if (deltaX > 0 && el.scrollLeft > 0) return true;
          // Use Math.ceil for scrollWidth/clientWidth to handle fractional pixels on high-DPI screens without magic numbers
          if (deltaX < 0 && Math.ceil(el.scrollLeft) < el.scrollWidth - el.clientWidth) return true;
        }

        return isScrollable(el.parentElement);
      };

      if (isScrollable(target)) return;

      const currentIndex = MAIN_ROUTES.indexOf(pathname);
      if (currentIndex !== -1) {
        let targetRoute = '';
        if (deltaX > 0 && currentIndex > 0) {
          // Swipe right -> Previous page
          targetRoute = MAIN_ROUTES[currentIndex - 1];
        } else if (deltaX < 0 && currentIndex < MAIN_ROUTES.length - 1) {
          // Swipe left -> Next page
          targetRoute = MAIN_ROUTES[currentIndex + 1];
        }

        if (targetRoute && !isNavigating.current) {
          isNavigating.current = true;
          navigate(targetRoute);
          // Optional: announce to screen readers
          const msg = `Navigating to ${targetRoute === '/' ? 'Home' : targetRoute.slice(1).charAt(0).toUpperCase() + targetRoute.slice(2)}`;
          const announcer = document.getElementById('route-announcer');
          if (announcer) announcer.textContent = msg;
        }
      }
    }

    touchStartRef.current = null;
  };

  return { handleTouchStart, handleTouchEnd };
}
