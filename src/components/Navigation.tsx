import { Search } from 'lucide-react';
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { throttle } from 'throttle-debounce';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileHeader } from './navigation/MobileHeader';
import { MobileMenuOverlay } from './navigation/MobileMenuOverlay';
import { cn } from '@/lib/utils';
import { LogoMark } from '@/components/ui/Logo';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open: openSearch, close: closeSearch, isOpen: isSearchOpen } = useGlobalSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = throttle(100, () => {
      setScrolled(window.scrollY > 20);
    });

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchClick = () => {
    setIsOpen(false);
    if (isSearchOpen) {
      closeSearch();
    } else {
      openSearch();
    }
  };

  return (
    <>
      {/* Mobile Bottom Tabs */}
      <MobileBottomNav />

      {/* Mobile Header */}
      <MobileHeader
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        onClose={() => setIsOpen(false)}
      />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <MobileMenuOverlay
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSearchClick={handleSearchClick}
          />
        )}
      </AnimatePresence>

      {/* Desktop Navbar */}
      <header className={cn(
        "hidden md:block w-full h-[72px] border-b border-white/5 sticky top-0 z-50 transition-[background-color,backdrop-filter] duration-300",
        scrolled ? "backdrop-blur-xl bg-bg/90" : "bg-bg"
      )}>
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-8">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <LogoMark />
            <span className="text-lg font-semibold tracking-tight text-text">
              boom<span className="text-muted font-normal">tick</span>
            </span>
          </NavLink>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted">
            <NavLink to="/blog" className="nav-link-hover transition-colors">Blog</NavLink>
            <NavLink to="/gear" className="nav-link-hover transition-colors">Gear</NavLink>
            <NavLink to="/research" className="nav-link-hover transition-colors">Data</NavLink>
            {/* Travel link added as per user spec but routing might not exist, mapping to placeholder or existing */}
            <span className="nav-link-hover transition-colors cursor-pointer" onClick={() => navigate('/blog?category=travel')}>Travel</span>

            <button
              onClick={handleSearchClick}
              className="text-muted hover:text-text transition-colors flex items-center gap-2"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </nav>

          {/* CTA */}
          <button className="btn-hover text-sm px-4 py-2 rounded-full border border-white/10 text-text hover:border-cyan transition-all">
            Subscribe
          </button>
        </div>
      </header>
    </>
  );
}
