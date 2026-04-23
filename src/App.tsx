/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { MainLayout } from './layouts/MainLayout';
import { motionTokens } from './styles/motion';
import { PageSkeleton } from './components/ui/PageSkeleton';
import { EmailCaptureProvider } from './features/email-capture/EmailCaptureContext';
import { NewsletterBanner } from './features/email-capture/NewsletterBanner';
import { useEmailCaptureLogic } from './hooks/useEmailCaptureLogic';
import { routes as routeConfig } from './config/routes';

import { Box } from './layouts/Primitives';

export function RootLayout() {
  const location = useLocation();
  const emailLogic = useEmailCaptureLogic();

  return (
    <EmailCaptureProvider {...emailLogic}>
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
        {emailLogic.showEmailBar && <NewsletterBanner />}
      </AnimatePresence>
    </EmailCaptureProvider>
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
