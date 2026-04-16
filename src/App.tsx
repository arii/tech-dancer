/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Lab from './pages/Lab';
import Engine from './pages/Engine';
import Feed from './pages/Feed';
import About from './pages/About';
import Blog from './pages/Blog';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderPage = () => {
    switch (activeTab) {
      case 'home': return <Home />;
      case 'lab': return <Lab />;
      case 'engine': return <Engine />;
      case 'blog': return <Blog />;
      case 'feed': return <Feed />;
      case 'about': return <About />;
      default: return <Home />;
    }
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col">
        <div className="flex-1 bg-line grid grid-cols-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-bg h-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="border-t border-line py-6 px-8 bg-bg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div className="text-xs font-bold text-accent tracking-wider uppercase">
                ARIEL ANDERS // TECH-DANCER
              </div>
              <p className="text-[10px] text-text-dim font-mono">
                © 2026 // MIT CSAIL // ROBUST.AI // WAYMO
              </p>
            </div>
            
            <div className="flex gap-6 text-[10px] font-mono uppercase tracking-widest text-text-dim">
              <a href="#" className="hover:text-accent transition-colors">GitHub</a>
              <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-accent transition-colors">WCS Scores</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
