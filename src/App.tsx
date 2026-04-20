/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { MainLayout } from './layouts/MainLayout';
import { motionTokens } from './styles/motion';
import { PageSkeleton } from './components/ui/PageSkeleton';
import { Box } from './layouts/Primitives';

const Home = lazy(() => import('./pages/Home'));
const GearReviews = lazy(() => import('./pages/Gear'));
const Research = lazy(() => import('./pages/Research'));
const ResearchDetail = lazy(() => import('./pages/ResearchDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Resources = lazy(() => import('./pages/Resources'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

export default function App() {
  const location = useLocation();

  return (
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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gear" element={<GearReviews />} />
              <Route path="/research" element={<Research />} />
              <Route path="/research/:id" element={<ResearchDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </Box>
      </AnimatePresence>
    </MainLayout>
  );
}
