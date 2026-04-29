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
      const currentIndex = MAIN_ROUTES.indexOf(pathname);
      if (currentIndex !== -1) {
        if (deltaX > 0 && currentIndex > 0) {
          // Swipe right -> Previous page
          navigate(MAIN_ROUTES[currentIndex - 1]);
        } else if (deltaX < 0 && currentIndex < MAIN_ROUTES.length - 1) {
          // Swipe left -> Next page
          navigate(MAIN_ROUTES[currentIndex + 1]);
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
      <Box display="flex" className="min-h-screen w-full">
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
