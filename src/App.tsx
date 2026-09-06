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
        className="border-4 border-accent border-t-transparent animate-spin"
      />
    </Box>
  );
}

export function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    if (!import.meta.env.PROD || window.location.hostname === 'localhost') return;

    let initialized = false;
    let scriptElement: HTMLScriptElement | null = null;

    const initGA = () => {
      if (initialized) return;
      initialized = true;

      window.removeEventListener('pointerdown', initGA);
      window.removeEventListener('scroll', initGA);
      window.removeEventListener('keydown', initGA);
      window.removeEventListener('touchstart', initGA);

      // Inject Google Analytics script
      scriptElement = document.createElement('script');
      scriptElement.async = true;
      scriptElement.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(scriptElement);

      // Initialize dataLayer and gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer?.push(arguments);
      };
      window.gtag?.('js', new Date());

      // Configure GA4 with automatic page_view tracking disabled
      window.gtag?.('config', GA_MEASUREMENT_ID, {
        send_page_view: false
      });

      window.gtag?.('event', 'page_view', {
        page_path: window.location.pathname + window.location.search,
        page_location: window.location.href,
        page_title: document.title
      });
    };

    window.addEventListener('pointerdown', initGA, { passive: true, once: true });
    window.addEventListener('scroll', initGA, { passive: true, once: true });
    window.addEventListener('keydown', initGA, { passive: true, once: true });
    window.addEventListener('touchstart', initGA, { passive: true, once: true });

    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(() => initGA(), { timeout: 3500 });
    } else {
      timerId = setTimeout(initGA, 3000);
    }

    return () => {
      window.removeEventListener('pointerdown', initGA);
      window.removeEventListener('scroll', initGA);
      window.removeEventListener('keydown', initGA);
      window.removeEventListener('touchstart', initGA);
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      if (scriptElement && document.head.contains(scriptElement)) {
        document.head.removeChild(scriptElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!import.meta.env.PROD || window.location.hostname === 'localhost') return;

    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title
      });
    }
  }, [location]);

  const skeletonVariant = getSkeletonVariant(location.pathname, routeConfig);

  return (
    <Box height="full">
      <MainLayout>
        <AnimatePresence mode="wait" initial={false}>
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
