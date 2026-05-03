import { useRef, useEffect } from 'react';
import { ReactNode } from 'react';
import { useLocation, useNavigationType, useNavigate } from 'react-router-dom';
import { Box, Stack } from '@/layouts/Primitives';
import Navigation from '@/components/Navigation';
import { Footer } from '@/layouts/Footer';
import { GlobalSearch } from '@/components/GlobalSearch';
import { useEmailStore } from '@/features/email-capture/emailStore';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';

const SWIPE_THRESHOLD = 50;
const MAIN_ROUTES = ['/', '/blog', '/gear', '/research'];

export function MainLayout({ children }: { children: ReactNode }) {
  const showEmailBar = useEmailStore((state) => state.showEmailBar);
  const scrollRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const { pathname, key } = useLocation();
  const navType = useNavigationType();
  const navigate = useNavigate();

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleSaveScroll = () => {
      if (container) {
        sessionStorage.setItem(`scroll-${key}`, container.scrollTop.toString());
      }
    };

    window.addEventListener('beforeunload', handleSaveScroll);

    if (navType === 'POP') {
      const savedPosition = sessionStorage.getItem(`scroll-${key}`);
      if (savedPosition) {
        requestAnimationFrame(() => {
          if (container) container.scrollTop = parseInt(savedPosition, 10);
        });
      }
    } else {
      requestAnimationFrame(() => {
        if (container) {
          container.scrollTop = 0;
        }
      });
      window.scrollTo(0, 0);
    }

    return () => {
      window.removeEventListener('beforeunload', handleSaveScroll);
      handleSaveScroll();
    };
  }, [pathname, key, navType]);

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

    if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
      const target = e.target as HTMLElement;

      const isScrollable = (el: HTMLElement | null): boolean => {
        if (!el || el === e.currentTarget) return false;
        const style = window.getComputedStyle(el);
        const overflowX = style.getPropertyValue('overflow-x');
        const isScrollableX = (overflowX === 'auto' || overflowX === 'scroll' || overflowX === 'overlay') && el.scrollWidth > el.clientWidth;
        if (isScrollableX) {
          if (deltaX > 0 && el.scrollLeft > 0) return true;
          if (deltaX < 0 && Math.ceil(el.scrollLeft) < el.scrollWidth - el.clientWidth) return true;
        }
        return isScrollable(el.parentElement);
      };

      if (isScrollable(target)) return;

      const currentIndex = MAIN_ROUTES.indexOf(pathname);
      if (currentIndex !== -1) {
        let targetRoute = '';
        if (deltaX > 0 && currentIndex > 0) targetRoute = MAIN_ROUTES[currentIndex - 1];
        else if (deltaX < 0 && currentIndex < MAIN_ROUTES.length - 1) targetRoute = MAIN_ROUTES[currentIndex + 1];

        if (targetRoute) {
          navigate(targetRoute);
          const announcer = document.getElementById('route-announcer');
          if (announcer) announcer.textContent = `Navigating to ${targetRoute}`;
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
      <Box display="flex" minHeight="screen" width="full" position="relative">
        <Navigation />
        
        <Box
          as="main"
          ref={scrollRef}
          flex={1}
          position="relative"
          overflowY="auto"
          paddingTop={{ base: 16, md: 0 }}
          marginLeft={{ md: 56 }}
          surface="bg"
          scrollBehavior="smooth"
          scrollPaddingTop={64}
        >
          <ScrollToTopButton scrollRef={scrollRef} />
          <Stack
            paddingX={{ base: 4, md: 8, lg: 12 }}
            paddingTop={{ base: 8, md: 12 }}
            paddingBottom={showEmailBar ? { base: 64, md: 80 } : { base: 28, md: 12 }}
            flex={1}
            direction="col"
            maxWidth="7xl"
            width="full"
          >
            <Box flex={1} width="full">
              {children}
            </Box>
            <Footer />
          </Stack>
        </Box>
      </Box>

      <GlobalSearch />
    </Box>
  );
}
