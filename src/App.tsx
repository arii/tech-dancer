/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { MainLayout } from './components/layout/MainLayout';
import { motionTokens } from './styles/motion';

import Home from './features/dashboard/Dashboard';
import GearReviews from './features/lab/Toolbox';
import Research from './features/research/ResearchAnalytics';
import Resources from './features/resources/ResourceGallery';
import About from './features/profile/ArielProfile';
import Blog from './features/journal/BlogFeed';
import BlogPost from './features/journal/BlogPost';
import Contact from './features/profile/ContactConsole';
import ResearchDetail from './features/research/ResearchDetail';

import { Box } from './components/layout/Primitives';

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
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/gear" element={<GearReviews />} />
            <Route path="/research" element={<Research />} />
            <Route path="/research/:id" element={<ResearchDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Box>
      </AnimatePresence>
    </MainLayout>
  );
}
