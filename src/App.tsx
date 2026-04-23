/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { MainLayout } from './layouts/MainLayout';
import { motionTokens } from './styles/motion';
import { PageSkeleton } from './components/ui/PageSkeleton';
import { NewsletterBanner } from './features/email-capture/NewsletterBanner';
import { useEmailStore, STORAGE_KEY } from './features/email-capture/emailStore';

import { Box } from './layouts/Primitives';

const Home = lazy(() => import('./pages/Home'));
const GearReviews = lazy(() => import('./pages/Gear'));
const GearPost = lazy(() => import('./features/lab/GearPost'));
const Research = lazy(() => import('./pages/Research'));
const ResearchDetail = lazy(() => import('./pages/ResearchDetail'));
const UXAuditor = lazy(() => import('./pages/UXAuditor'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

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

export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'gear', element: <GearReviews /> },
      { path: 'gear/:slug', element: <GearPost /> },
      { path: 'research', element: <Research /> },
      { path: 'research/:id', element: <ResearchDetail /> },
      { path: 'ux-auditor', element: <UXAuditor /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <Home /> },
    ],
  },
];
