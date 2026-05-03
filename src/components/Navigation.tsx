import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Box, Text } from '@/layouts/Primitives';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileHeader } from './navigation/MobileHeader';
import { MobileMenuOverlay } from './navigation/MobileMenuOverlay';
import { cn } from '@/lib/utils';

const TOP_NAV_ROUTES = [
  { path: '/blog', label: 'BLOG' },
  { path: '/gear', label: 'GEAR' },
  { path: '/research', label: 'DATA LAB' },
  { path: '/about', label: 'TRAVEL' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { open: openSearch, close: closeSearch, isOpen: isSearchOpen } = useGlobalSearch();

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
      <MobileBottomNav />
      <MobileHeader
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        onClose={() => setIsOpen(false)}
      />
      <AnimatePresence>
        {isOpen && (
          <MobileMenuOverlay
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSearchClick={handleSearchClick}
          />
        )}
      </AnimatePresence>
      <Box
        as="nav"
        aria-label="Main Navigation"
        layout="navRail"
        className="gap-0"
      >
        <Box as={NavLink} to="/" display="flex" align="center" gap={2} className="flex-shrink-0 group">
          <Box
            className="w-8 h-8 border border-accent/60 flex items-center justify-center rounded-sm flex-shrink-0 group-hover:border-accent transition-colors"
            display="flex"
            align="center"
            justify="center"
          >
            <span className="font-bold text-white text-xs leading-none">B<span className="neon-text-cyan">\</span></span>
          </Box>
          <Text variant="mono" size="sm" weight="font-bold" className="text-white leading-none tracking-tight hidden sm:block">
            <span className="font-bold">boom</span><span className="text-text-dim font-normal">tick</span>
          </Text>
        </Box>

        <Box as="ul" display="flex" align="center" gap={6} className="absolute left-1/2 -translate-x-1/2">
          {TOP_NAV_ROUTES.map((item) => (
            <Box as="li" key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "font-mono text-[11px] font-bold tracking-[0.28em] transition-colors py-1 leading-none",
                  isActive ? "text-accent" : "text-text-dim hover:text-white"
                )}
              >
                {item.label}
              </NavLink>
            </Box>
          ))}
        </Box>

        <Box display="flex" align="center" gap={3}>
          <button
            onClick={handleSearchClick}
            className="font-mono text-[11px] font-bold tracking-[0.28em] text-text-dim hover:text-accent transition-colors leading-none"
          >
            SEARCH
          </button>
          <NavLink
            to="/contact"
            className="neon-border border rounded-full px-4 py-1.5 font-mono text-[11px] font-bold tracking-[0.28em] text-white hover:text-accent transition-colors flex-shrink-0 leading-none"
          >
            SUBSCRIBE
          </NavLink>
        </Box>
      </Box>
    </>
  );
}
