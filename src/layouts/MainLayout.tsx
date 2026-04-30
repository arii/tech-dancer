import { useRef, useLayoutEffect } from 'react';
import { useLocation, useNavigationType, useNavigate } from 'react-router-dom';
import { Box, Stack } from '@/layouts/Primitives';
import Navigation from '@/components/Navigation';
import { Footer } from '@/layouts/Footer';
import { GlobalSearch } from '@/components/GlobalSearch';
import { useEmailStore } from '@/features/email-capture/emailStore';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';

const SWIPE_THRESHOLD = 50;
const MAIN_ROUTES = ['/', '/blog', '/gear', '/research'];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const showEmailBar = useEmailStore((state) => state.showEmailBar);
  const scrollRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const { pathname, key } = useLocation();
  const navType = useNavigationType();
  const navigate = useNavigate();

  // Unified Scroll Management: Reset on navigation, Restore on history
  useLayoutEffect(() => {
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
          if (container) container.scrollTop = parseInt(savedPosition, 10);
        });
      }
    } else {
      // 2. New Navigation (PUSH/REPLACE): Reset to top
      // We use requestAnimationFrame to ensure the scroll happens after the content renders
      requestAnimationFrame(() => {
        if (container) {
          container.scrollTop = 0;
        }
      });
      // Also ensure the window itself is at the top
      window.scrollTo(0, 0);
    }

    return () => {
      window.removeEventListener('beforeunload', handleSaveScroll);
      handleSaveScroll();
    };
  }, [pathname, key, navType]);

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
      className="min-h-screen relative overflow-x-hidden w-full touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Box
        id="route-announcer"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      <Box display="flex" className="min-h-screen w-full">
        <Navigation />
        <ScrollToTopButton scrollRef={scrollRef} />
        <Stack
          as="main"
          ref={scrollRef}
          flex={1}
          position="relative"
          overflowY="auto"
          className="pt-16 lg:pt-0"
          maxWidth="full"
          width="full"
          surface="bg"
          direction="col"
          scrollBehavior="smooth"
          scrollPaddingTop={64}
          snap="y"
          transitionProp="all"
          duration={300}
          viewTransitionName="main-content"
        >
          <Stack
            paddingX={{ base: 4, md: 6, lg: 12 }}
            paddingTop={12}
            paddingBottom={showEmailBar ? { base: 64, md: 80 } : { base: 28, md: 12 }}
            flex={1}
            direction="col"
            marginX="auto"
            maxWidth="7xl"
            width="full"
            transitionProp="all"
            duration={300}
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
