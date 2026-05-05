import { useRef, useEffect } from 'react';
import { ReactNode } from 'react';
import { useLocation, useNavigationType, useNavigate } from 'react-router-dom';
import { Box, Stack } from '@/layouts/Primitives';
import Sidebar from '@/components/Sidebar';
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

  // Unified Scroll Management: Reset on navigation, Restore on history
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
    <div
      className="relative overflow-x-hidden w-full min-h-screen touch-pan-y flex flex-col bg-background text-foreground md:flex-row"
      // @ts-ignore
      onTouchStart={handleTouchStart}
      // @ts-ignore
      onTouchEnd={handleTouchEnd}
    >
      <div
        id="route-announcer"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      <Sidebar />
      <ScrollToTopButton scrollRef={scrollRef} />

      <main
        ref={scrollRef}
        className="flex-1 relative overflow-y-auto w-full scroll-smooth pt-16 md:pt-0 md:ml-56"
      >
        <div
          className={`flex flex-col flex-1 mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-12 pt-16 md:pt-12 pb-${showEmailBar ? '64 md:pb-80' : '28 md:pb-12'}`}
        >
          <div className="flex-1 w-full">
            {children}
          </div>
          <Footer />
        </div>
      </main>

      <GlobalSearch />
    </div>
  );
}
