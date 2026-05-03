import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Box, Text } from '@/layouts/Primitives';
import { routes } from '@/config/routes';
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

      {/* Desktop Top Nav */}
      <Box
        as="nav"
        aria-label="Main Navigation"
        layout="navRail"
      >
        {/* Logo */}
        <Box as={NavLink} to="/" display="flex" align="center" gap={2} className="flex-shrink-0 group">
          <Box
            className="w-9 h-9 border border-accent/60 flex items-center justify-center rounded-sm flex-shrink-0 group-hover:border-accent transition-colors"
            display="flex"
            align="center"
            justify="center"
          >
            <span className="font-bold text-white text-sm leading-none">
              B<span className="neon-text-cyan">\</span>
            </span>
          </Box>
          <Text
            variant="mono"
            size="sm"
            weight="font-bold"
            className="text-white leading-none tracking-tight"
          >
            <span className="font-bold">boom</span>
            <span className="text-text-dim font-normal">tick</span>
          </Text>
        </Box>

        {/* Nav Links */}
        <Box as="ul" display="flex" align="center" gap={8} className="absolute left-1/2 -translate-x-1/2">
          {TOP_NAV_ROUTES.map((item) => (
            <Box as="li" key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "font-mono text-xs font-bold tracking-widest transition-colors py-1",
                  isActive
                    ? "text-accent"
                    : "text-text-dim hover:text-white"
                )}
              >
                {item.label}
              </NavLink>
            </Box>
          ))}
        </Box>

        {/* Subscribe Button */}
        <Box display="flex" align="center" gap={4}>
          <button
            onClick={handleSearchClick}
            className="font-mono text-xs font-bold tracking-widest text-text-dim hover:text-accent transition-colors"
          >
            SEARCH
          </button>
          <NavLink
            to="/contact"
            className="neon-border border rounded-full px-5 py-2 font-mono text-xs font-bold tracking-widest text-white hover:text-accent transition-colors flex-shrink-0"
          >
            SUBSCRIBE
          </NavLink>
        </Box>
      </Box>
    </>
  );
}
