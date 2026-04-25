/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion } from 'motion/react';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PageSkeleton } from './components/ui/PageSkeleton';
import { routes as routeConfig } from './config/routes';
import { NewsletterBanner } from './features/email-capture/NewsletterBanner';
import { MainLayout } from './layouts/MainLayout';
import { Box } from './layouts/Primitives';
import { motionTokens } from './styles/motion';

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
            <Suspense fallback={<PageSkeleton />}>
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
    children: routeConfig.map((route) => ({
      ...route,
      // React Router children paths should be relative to parent if they don't start with /
      // or absolute if they do. Since our parent is '/', absolute paths work fine too,
      // but to be safe and follow standard patterns, we can make them relative if they are under '/'.
      path: route.path === '/' ? undefined : route.path.replace(/^\//, ''),
    })),
  },
];
