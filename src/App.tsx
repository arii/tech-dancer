/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { MainLayout } from './layouts/MainLayout';
import { motionTokens } from './styles/motion';
import { EmailCaptureProvider } from './features/email-capture/EmailCaptureContext';
import { EmailCaptureOverlay } from './features/email-capture/EmailCaptureOverlay';

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
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [showEmailBar, setShowEmailBar] = useState(true);

  const handleSubmit = (email: string) => {
    console.log(`[SYSTEM_ACTION: CAPTURING_EMAIL] ${email}`);
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setShowEmailBar(false), 2000);
    }, 800);
  };

  return (
    <EmailCaptureProvider
      status={formStatus}
      showEmailBar={showEmailBar}
      submitForm={handleSubmit}
      setShowEmailBar={setShowEmailBar}
    >
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
      <EmailCaptureOverlay />
    </EmailCaptureProvider>
  );
}
