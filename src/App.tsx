/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion } from 'motion/react';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PageSkeleton } from './components/ui/PageSkeleton';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary';
import { routes as routeConfig } from './config/routes';
import { NewsletterBanner } from './features/email-capture/NewsletterBanner';
import { MainLayout } from './layouts/MainLayout';
import { Box } from './layouts/Primitives';
import { motionTokens } from './styles/motion';
import { getSkeletonVariant } from './lib/utils';
import { GA_MEASUREMENT_ID } from './config/constants';

import { STORAGE_KEY, useEmailStore } from './features/email-capture/emailStore';

const BANNER_DELAY_MS = 30000; // 30s delay

export function RootLayout() {
  const location = useLocation();
  const showEmailBar = useEmailStore((state) => state.showEmailBar);
  const setShowEmailBar = useEmailStore((state) => state.setShowEmailBar);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem(STORAGE_KEY) === 'true';
    if (isDismissed) return;

    const timer = setTimeout(() => {
      setShowEmailBar(true);
    }, BANNER_DELAY_MS);

    return () => clearTimeout(timer);
  }, [setShowEmailBar]);

  // Google Analytics 4 script injection and page view tracking
  useEffect(() => {
    // 1. Inject script if not already present
    if (!window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function (command: string, ...args: unknown[]) {
        window.dataLayer.push([command, ...args]);
      };
      window.gtag('js', new Date());
      // Disable default page_view to allow manual control in SPAs
      window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
    }

    // 2. Track page view on location change
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  const skeletonVariant = getSkeletonVariant(location.pathname, routeConfig);

  return (
    <>
      <MainLayout>
        <AnimatePresence mode="wait">
          <Box
            as={motion.div}
            key={location.pathname}
            initial={motionTokens.page.initial}
            animate={motionTokens.page.animate}
            exit={motionTokens.page.exit}
            transition={motionTokens.page.transition}
            height="full"
          >
            <Suspense fallback={<PageSkeleton variant={skeletonVariant} />}>
              <Outlet />
            </Suspense>
          </Box>
        </AnimatePresence>
      </MainLayout>
      <AnimatePresence>
        {showEmailBar && <NewsletterBanner />}
      </AnimatePresence>
    </>
  );
}

/**
 * Maps centralized absolute route paths to relative paths for children.
 */
export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <GlobalErrorBoundary />,
    children: routeConfig.map((route) => ({
      ...route,
      // React Router children paths should be relative to parent if they don't start with /
      // or absolute if they do. Since our parent is '/', absolute paths work fine too,
      // but to be safe and follow standard patterns, we can make them relative if they are under '/'.
      path: route.path === '/' ? undefined : route.path.replace(/^\//, ''),
    })),
  },
];
