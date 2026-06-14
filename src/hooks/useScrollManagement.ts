import { useEffect, MutableRefObject, useRef } from 'react';
import { useLocation, useNavigationType, useNavigate } from 'react-router-dom';

const SWIPE_THRESHOLD = 50;
const MAIN_ROUTES = ['/', '/blog', '/gear', '/research', '/merch'];

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
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetY = rect.top + scrollTop - 128; // scroll-mt-32

          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });
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

        // Respect touch-action: pan-y or none which explicitly disable horizontal panning for the browser
        const touchAction = style.getPropertyValue('touch-action');
        if (touchAction.includes('pan-y') || touchAction.includes('none')) return true;

        // Respect explicit data attribute opt-outs for global swipe navigation
        if (el.dataset.gestureHandled === 'true') return true;

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
