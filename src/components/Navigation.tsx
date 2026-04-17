/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag, BarChart2, BookOpen, User, Home as HomeIcon, PenTool, Menu, X, Mail, FileText, Cpu, Terminal } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'lab', label: 'Gear Reviews', icon: ShoppingBag },
    { id: 'engine', label: 'Dance Analytics', icon: BarChart2 },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'feed', label: 'Resources', icon: BookOpen },
    { id: 'systems', label: 'Systems', icon: Terminal },
    { id: 'about', label: 'About Ariel', icon: User },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  const containerVariants = {
    closed: { opacity: 0, x: -20 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-line z-[110] flex items-center justify-between px-6">
        <div className="flex flex-col">
          <span className="text-xs font-display font-bold tracking-[1px] uppercase text-text-main">Ariel Anders</span>
          <span className="text-[8px] text-accent-brand uppercase tracking-widest font-bold">MIT Roboticist // WCS</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-text-main hover:text-accent-brand transition-colors relative z-[120]"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? 'close' : 'menu'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 bg-bg z-[100] pt-24 px-8 overflow-y-auto"
          >
            <motion.ul 
              variants={containerVariants}
              initial="closed"
              animate="open"
              className="space-y-6"
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={itemVariants}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-4 py-3 border-b border-line/50 transition-colors ${
                    activeTab === item.id ? 'text-accent-brand' : 'text-text-main'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-lg font-display font-bold uppercase tracking-tight">{item.label}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 p-6 bg-accent/5 border border-accent/20"
            >
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent mb-2">Find Me</div>
              <div className="text-sm font-display font-bold text-text-main uppercase">Wednesdays @ Mission City Swing</div>
              <div className="text-[10px] text-text-dim mt-1 font-mono uppercase tracking-widest">San Francisco, CA</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <nav className="nav-rail flex-col justify-between">
        <div className="space-y-12">
          <div className="logo-area">
            <div className="text-sm font-display font-black tracking-[1px] uppercase text-text-main">
              ARIEL ANDERS
            </div>
            <div className="text-[9px] text-accent mt-1 uppercase tracking-[0.2em] font-bold">
              MIT ROBOTICIST // WCS
            </div>
          </div>

          <ul className="space-y-2">
            {navItems.map((item) => (
              <li
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group flex items-center gap-3 cursor-pointer py-2 px-1 relative`}
              >
                {activeTab === item.id && (
                  <motion.div 
                    layoutId="nav-indicator"
                    className="absolute left-[-20px] w-1 h-4 bg-accent-brand"
                    transition={{ type: 'spring', damping: 20, stiffness: 250 }}
                  />
                )}
                <item.icon className={`w-4 h-4 stroke-1 transition-colors ${activeTab === item.id ? 'text-accent-brand' : 'text-text-dim group-hover:text-accent-brand'}`} />
                <span className={`text-[11px] font-mono font-bold uppercase tracking-widest transition-colors ${activeTab === item.id ? 'text-accent-brand' : 'text-text-dim group-hover:text-accent-brand'}`}>
                  {item.label}
                </span>
                
                {/* Micro-interaction highlight */}
                <motion.div 
                  className="absolute inset-x-0 inset-y-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                />
              </li>
            ))}
          </ul>

          <div className="pt-8 space-y-4">
            <div className="p-4 bg-accent/5 border border-accent/20">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent mb-2 underline underline-offset-4">Location_Log</div>
              <div className="text-[11px] font-display font-bold text-text-main uppercase leading-tight">Wednesdays @ Mission City Swing</div>
              <div className="text-[9px] font-mono text-text-dim mt-1 uppercase tracking-widest">SF // CA</div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-line">
          <div className="text-[9px] font-mono text-text-dim uppercase tracking-widest leading-relaxed">
            SYSTEM_PROTOCOL: 2026_V1.0
            <br />
            STATUS: ACTIVE_OPTIMIZATION
          </div>
        </div>
      </nav>
    </>
  );
}
