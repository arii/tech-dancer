/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { AppShell } from './components/layout/AppShell';
import { motionTokens } from './styles/motion';

import Home from './features/dashboard/Dashboard';
import Lab from './features/lab/Toolbox';
import Engine from './features/engine/TelemetryDashboard';
import Feed from './features/resources/ResourceGallery';
import About from './features/profile/ArielProfile';
import Blog from './features/journal/BlogFeed';
import Contact from './features/profile/ContactConsole';
import Drafter from './features/admin/ContentEngine';

import { Box } from './components/layout/Primitives';

export default function App() {
  const location = useLocation();

  return (
    <AppShell>
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
            <Route path="/lab" element={<Lab />} />
            <Route path="/engine" element={<Engine />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/systems" element={<Drafter />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Box>
      </AnimatePresence>
    </AppShell>
  );
}
