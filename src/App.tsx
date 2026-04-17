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
import Contact from './pages/Contact';
import Drafter from './pages/Drafter';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showEmailBar, setShowEmailBar] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  const renderPage = () => {
    switch (activeTab) {
      case 'home': return <Home setActiveTab={setActiveTab} />;
      case 'lab': return <Lab />;
      case 'engine': return <Engine />;
      case 'blog': return <Blog />;
      case 'feed': return <Feed />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      case 'systems': return <Drafter />;
      default: return <Home setActiveTab={setActiveTab} />;
    }
  };

  const pageTransition = {
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { 
      duration: 0.3, 
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number] 
    }
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col relative pt-16 md:pt-0">
        <div className="flex-1 bg-line grid grid-cols-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              {...pageTransition}
              className="bg-bg h-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sticky Email Capture Bar */}
        <AnimatePresence>
          {showEmailBar && (
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="sticky bottom-0 z-50 bg-accent text-white py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-accent-orange/30"
            >
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="w-10 h-10 border border-white/30 bg-white/5 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 stroke-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-[3px] text-white/70 leading-none">// SYSTEM_UPDATE: NEWSLETTER_FETCH</div>
                  <p className="text-[11px] md:text-xs font-display font-bold uppercase tracking-widest leading-tight">
                    Get the <span className="underline underline-offset-4 decoration-white/30">WCS_PACKING_LIST</span> + Weekly Intel.
                  </p>
                </div>
              </div>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const emailInput = (e.target as HTMLFormElement).querySelector('input');
                  if (emailInput && emailInput.value && /\S+@\S+\.\S+/.test(emailInput.value)) {
                    setShowEmailBar(false);
                    console.log('Joined:', emailInput.value);
                  } else {
                    emailInput?.focus();
                  }
                }}
                className="flex items-center gap-3 w-full md:w-auto"
              >
                <div className="relative w-full md:w-80">
                  <input 
                    type="email" 
                    name="email"
                    aria-label="Email address for newsletter"
                    placeholder="ENTER_EMAIL_DESTINATION..." 
                    className="bg-white/10 border border-white/20 px-4 py-2 text-[11px] font-mono focus:outline-none focus:bg-white/20 transition-all w-full placeholder:text-white/40"
                    required
                  />
                </div>
                <button type="submit" className="bg-white text-accent px-8 py-2 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-white-pure transition-all shrink-0">
                  JOIN_NETWORK
                </button>
                <button 
                  type="button"
                  onClick={() => setShowEmailBar(false)}
                  className="p-1 hover:bg-white/20 transition-colors ml-4"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="border-t border-line py-8 px-8 bg-bg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="text-[9px] font-display font-black text-accent-brand tracking-[0.2em] uppercase">
                ARIEL ANDERS // TECH-DANCER
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <p className="text-[9px] text-text-dim font-mono uppercase tracking-widest">
                  SYSTEM_ID: 2026_AA_PORTFOLIO
                </p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
                  <span className="text-[7px] font-mono text-text-dim/50 uppercase">Sync_Ready</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-8 text-[9px] font-mono uppercase tracking-[0.1em] text-text-dim">
              <a href="https://github.com/arii" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors border-b border-transparent hover:border-accent">GITHUB</a>
              <a href="https://linkedin.com/in/arianders" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors border-b border-transparent hover:border-accent">LINKEDIN</a>
              <a href="https://www.worldsdc.com/registry/results/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors border-b border-transparent hover:border-accent">WCS_SCORES</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
