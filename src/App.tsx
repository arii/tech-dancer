/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AnimatePresence, motion } from 'motion/react';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PageSkeleton } from './components/ui/PageSkeleton';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary';
import { GA_MEASUREMENT_ID } from './config/constants';
import { routes as routeConfig } from './config/routes';
import { MainLayout } from './layouts/MainLayout';
import { Box } from './layouts/Primitives';
import { motionTokens } from './styles/motion';
import { getSkeletonVariant } from './lib/utils';

export function HydrateFallback() {
  return (
    <Box id="loading-spinner" width="full" minHeight="screen" surface="bg" display="flex" align="center" justify="center">
      <Box
        width={8}
        height={8}
        radius="full"
        className="border-4 border-accent-teal border-t-accent-amber animate-spin"
      />
    </Box>
  );
}

export function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    if (!import.meta.env.PROD || window.location.hostname === 'localhost') return;

    // Inject Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    window.gtag?.('js', new Date());

    // Configure GA4 with automatic page_view tracking disabled
    // We'll track page views manually on location change to handle SPA routing correctly
    window.gtag?.('config', GA_MEASUREMENT_ID, {
      send_page_view: false
    });

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!import.meta.env.PROD || window.location.hostname === 'localhost') return;

    // Track page view on route change
    window.gtag?.('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title
    });
  }, [location]);

  const skeletonVariant = getSkeletonVariant(location.pathname, routeConfig);

  return (
    <Box height="full">
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
      {import.meta.env.VITE_IS_VERCEL === 'true' && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </Box>
  );
}

/**
 * Maps centralized absolute route paths to relative paths for children.
 */
export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    HydrateFallback: HydrateFallback,
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
