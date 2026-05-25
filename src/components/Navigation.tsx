import { Search, Menu, X } from 'lucide-react';
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Box } from '@/layouts/Primitives';
import { ActionButton } from '@/components/ui/ActionButton';
import { Logo } from '@/components/ui/Logo';

import { routes } from '@/config/routes';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileMenuOverlay } from './navigation/MobileMenuOverlay';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { open: openSearch, close: closeSearch, isOpen: isSearchOpen } = useGlobalSearch();

  const handleSearchClick = () => {
    setIsOpen(false);
    if (isSearchOpen) closeSearch();
    else openSearch();
  };

  const topRoutes = routes.filter((r): r is typeof r & { label: string } =>
    !!(r.path !== '/' && r.label && ['/events', '/gear', '/blog', '/research', '/about', '/contact'].includes(r.path))
  );

  return (
    <>
      <MobileBottomNav />
      
      <Box
        as="nav"
        aria-label="Main Navigation"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex="sticky"
        border="b"
        className="bg-surface/98 backdrop-blur-xl border-line h-16 flex items-center"
      >
        <Box display="flex" align="center" justify="between" paddingX={{ base: 4, lg: 8 }} width="full">
          {/* Logo Section */}
          <Box display="flex" align="center" gap={12}>
            <Box as={NavLink} to="/" onClick={() => setIsOpen(false)} className="group">
              <Logo className="h-8 md:h-9 w-auto text-white transition-opacity group-hover:opacity-80" />
            </Box>

            {/* Desktop Links */}
            <Box as="ul" display={{ base: 'none', lg: 'flex' }} align="center" gap={8}>
              {topRoutes.map((item) => (
                <Box as="li" key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => cn(
                      'relative text-sm transition-colors hover:text-accent py-1',
                      'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full',
                      isActive ? 'text-accent after:w-full' : 'text-text-dim'
                    )}
                  >
                    {item.path === '/blog' ? 'Training Notes' : item.path === '/research' ? 'DevAI' : item.label.replace('Blog Posts', 'Training Notes').replace('Event Resource Guides', 'Event Guides')}
                  </NavLink>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Actions & Mobile Toggle */}
          <Box display="flex" align="center" gap={{ base: 2, lg: 6 }}>
            {/* Search (Desktop) */}
            <Box 
              as="button" 
              type="button" 
              onClick={handleSearchClick} 
              padding={2} 
              display={{ base: 'none', lg: 'flex' }}
              align="center"
              gap={2}
              className="group text-text-dim transition-colors hover:text-accent" 
              aria-label="Open search"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              <span className="hidden xl:inline-block text-[10px] font-mono tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity">
                CMD+K
              </span>
            </Box>

            <Box display={{ base: 'none', lg: 'flex' }}>
              <ActionButton as={NavLink} to="/subscribe" variant="primary" paddingX={4} paddingY={2} className="text-xs uppercase tracking-widest">
                Subscribe
              </ActionButton>
            </Box>

            {/* Mobile Menu Toggle */}
            <Box
              as={motion.create("button")}
              display={{ base: 'flex', lg: 'none' }}
              onClick={() => setIsOpen(!isOpen)}
              padding={2}
              align="center"
              justify="center"
              radius="full"
              className="hover:bg-bg/50 active:bg-accent/10 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </Box>
          </Box>
        </Box>
      </Box>

      <AnimatePresence mode="wait">
        {isOpen && <MobileMenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} onSearchClick={handleSearchClick} />}
      </AnimatePresence>
    </>
  );
}
