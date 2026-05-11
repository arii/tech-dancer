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
    const container = scrollRef.current;
    if (!container) return;

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
          if (container) {
            container.scrollTop = parseInt(savedPosition, 10);
            window.scrollTo(0, parseInt(savedPosition, 10));
          }
        });
      }
    } else if (hash) {
      // 2. Hash Navigation: Scroll to target element with ResizeObserver
      const id = hash.replace('#', '');
      let settleTimer: number;
      let lastHeight = container.scrollHeight;
      let attempts = 0;
      const MAX_ATTEMPTS = 10;
      const SETTLE_TIME = 2000;

      const performScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return true;
        }
        return false;
      };

      const observer = new ResizeObserver(() => {
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

      observer.observe(container);

      // Initial attempt
      performScroll();

      // Disconnect after settle time to prevent infinite observer
      settleTimer = window.setTimeout(() => {
        observer.disconnect();
      }, SETTLE_TIME);

      return () => {
        observer.disconnect();
        window.clearTimeout(settleTimer);
      };
    } else {
      // 3. New Navigation: Reset to top
      container.scrollTop = 0;
      window.scrollTo(0, 0);
    }

    return () => {
      window.removeEventListener('beforeunload', handleSaveScroll);
    };
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
