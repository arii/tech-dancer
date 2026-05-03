import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import { Box, Text } from '@/layouts/Primitives';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileHeader } from './navigation/MobileHeader';
import { MobileMenuOverlay } from './navigation/MobileMenuOverlay';
import { cn } from '@/lib/utils';
import logo from '@assets/targeted_element_1777795230392.png';

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
    if (isSearchOpen) closeSearch();
    else openSearch();
  };

  return (
    <>
      <Box
        as="nav"
        aria-label="Main Navigation"
        className="hidden lg:flex fixed top-0 left-0 right-0 z-50 h-16 items-center border-b border-line bg-surface/90 backdrop-blur-xl px-6 xl:px-10"
      >
        <Box as={NavLink} to="/" className="flex items-center gap-3 shrink-0 group">
          <img src={logo} alt="Boom Tick" className="h-6 w-6 object-contain" />
          <Text variant="mono" size="sm" weight="font-bold" className="text-white leading-none tracking-tight hidden xl:block">
            boomtick
          </Text>
        </Box>

        <Box as="ul" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
          {TOP_NAV_ROUTES.map((item) => (
            <Box as="li" key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  'font-mono text-[11px] font-bold tracking-[0.28em] leading-none transition-colors',
                  isActive ? 'text-accent' : 'text-text-dim hover:text-white'
                )}
              >
                {item.label}
              </NavLink>
            </Box>
          ))}
        </Box>

        <Box className="ml-auto flex items-center gap-3">
          <button
            onClick={handleSearchClick}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[11px] font-bold tracking-[0.28em] text-text-dim transition-colors hover:border-accent hover:text-accent"
          >
            <Search className="h-3.5 w-3.5" />
            SEARCH
          </button>
          <NavLink
            to="/contact"
            className="neon-border inline-flex items-center rounded-full border px-4 py-2 font-mono text-[11px] font-bold tracking-[0.28em] text-white transition-colors hover:text-accent"
          >
            SUBSCRIBE
          </NavLink>
        </Box>
      </Box>

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

      <div className="lg:hidden">
        <MobileBottomNav />
      </div>
    </>
  );
}
