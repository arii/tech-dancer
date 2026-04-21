/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { MainLayout } from '@/layouts/MainLayout';
import { motionTokens } from '@/styles/motion';
import { PageSkeleton } from '@/components/ui/PageSkeleton';
import { EmailCaptureProvider } from './features/email-capture/EmailCaptureContext';
import { NewsletterBanner } from './features/email-capture/NewsletterBanner';
import { useEmailCaptureLogic } from './hooks/useEmailCaptureLogic';

import { Box } from '@/layouts/Primitives';

const Home = lazy(() => import('@/pages/Home'));
const GearReviews = lazy(() => import('@/pages/Gear'));
const GearPost = lazy(() => import('@/features/lab/GearPost'));
const Research = lazy(() => import('@/pages/Research'));
const ResearchDetail = lazy(() => import('@/pages/ResearchDetail'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Resources = lazy(() => import('@/pages/Resources'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));

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
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'resources', element: <Resources /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <Home /> },
    ],
  },
];
