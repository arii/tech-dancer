import { useRef, useEffect } from 'react';
import { ReactNode } from 'react';
import { useLocation, useNavigationType, useNavigate } from 'react-router-dom';
import { Box, Stack } from '@/layouts/Primitives';
import Navigation from '@/components/Navigation';
import { Footer } from '@/layouts/Footer';
import { GlobalSearch } from '@/components/GlobalSearch';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';

const SWIPE_THRESHOLD = 50;
const MAIN_ROUTES = ['/', '/blog', '/gear', '/research'];

export function MainLayout({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const { pathname, key, hash } = useLocation();
  const navType = useNavigationType();
  const navigate = useNavigate();

  // Unified Scroll Management: Reset on navigation, Restore on history, Handle anchors
  useEffect(() => {
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
      const scrollWithRetry = (retryCount = 0) => {
        if (!container) return;

        if (hash) {
          const id = hash.replace('#', '');
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });

            // Retry after a short delay to account for potential layout shifts (e.g. images loading)
            if (retryCount < 3) {
              const tid = window.setTimeout(() => scrollWithRetry(retryCount + 1), 200 * (retryCount + 1));
              timeouts.push(tid);
            }
            return;
          } else if (retryCount < 5) {
             // Element might not be in DOM yet (e.g. due to Suspense)
             const tid = window.setTimeout(() => scrollWithRetry(retryCount + 1), 100);
             timeouts.push(tid);
             return;
          }
        }
        
        // Default: Reset to top
        if (!hash) {
          container.scrollTop = 0;
          window.scrollTo(0, 0);
        }
      };

      requestAnimationFrame(() => scrollWithRetry());
    }

    return () => {
      window.removeEventListener('beforeunload', handleSaveScroll);
      handleSaveScroll();
      timeouts.forEach(t => window.clearTimeout(t));
    };
  }, [pathname, key, hash, navType]);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: TouchEvent) => {
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

        if (targetRoute) {
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

  return (
    <Box
      layout="root"
      position="relative"
      overflowX="hidden"
      width="full"
      minHeight="screen"
      className="touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Box
        id="route-announcer"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      <Box display="flex" minHeight="screen" width="full">
        <Navigation />
        <ScrollToTopButton scrollRef={scrollRef} />
        <Stack
          as="main"
          ref={scrollRef}
          flex={1}
          position="relative"
          overflowY="auto"
          paddingTop={{ base: 16, lg: 0 }}
          maxWidth="full"
          width="full"
          surface="bg"
          direction="col"
          scrollBehavior="smooth"
          scrollPaddingTop={64}
        >
          <Stack
            paddingX={{ base: 4, md: 6, lg: 12, xl: 20 }}
            paddingTop={{ base: 16, md: 12 }}
            paddingBottom={{ base: 28, md: 12 }}
            flex={1}
            direction="col"
            marginX={{ base: "auto", lg: 0 }}
            maxWidth="7xl"
            width="full"
          >
            <Box flex={1} width="full">
              {children}
            </Box>
            <Footer />
          </Stack>
        </Stack>
      </Box>

      <GlobalSearch />
    </Box>
  );
}
