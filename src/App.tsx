/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { MainLayout } from './layouts/MainLayout';
import { motionTokens } from './styles/motion';

import Home from './pages/Home';
import GearReviews from './pages/Gear';
import Research from './pages/Research';
import Resources from './pages/Resources';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import ResearchDetail from './pages/ResearchDetail';

import { Box } from './layouts/Primitives';

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
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Box>
      </AnimatePresence>
    </MainLayout>
  );
}
