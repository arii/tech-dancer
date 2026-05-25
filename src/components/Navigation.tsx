import { Search } from 'lucide-react';
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Box } from '@/layouts/Primitives';
import { ActionButton } from '@/components/ui/ActionButton';
import { Logo } from '@/components/ui/Logo';

import { routes } from '@/config/routes';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileHeader } from './navigation/MobileHeader';
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
      <MobileHeader isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} onClose={() => setIsOpen(false)} />
      <AnimatePresence>
        {isOpen && <MobileMenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} onSearchClick={handleSearchClick} />}
      </AnimatePresence>

      <Box
        as="nav"
        aria-label="Main Navigation"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex="sticky"
        border="b"
        display={{ base: 'none', lg: 'flex' }}
        className="w-full border-line bg-surface/90 backdrop-blur-xl"
      >
        <Box display="flex" align="center" justify="between" paddingX={8} paddingY={3}>
          <Box as={NavLink} to="/" className="group">
            <Logo className="h-8 w-auto text-white transition-opacity group-hover:opacity-80" />
          </Box>

          <Box as="ul" display="flex" align="center" gap={6}>
            {topRoutes.map((item) => (
              <Box as="li" key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn('text-sm transition-colors hover:text-accent', isActive ? 'text-accent' : 'text-text-dim')}
                >
                  {item.path === '/blog' ? 'Training Notes' : item.path === '/research' ? 'Dev Lab' : item.label.replace('Blog Posts', 'Training Notes').replace('Event Resource Guides', 'Event Guides')}
                </NavLink>
              </Box>
            ))}
            <Box as="button" type="button" onClick={handleSearchClick} padding={2} className="text-text-dim transition-colors hover:text-accent" aria-label="Open search">
              <Search className="h-4 w-4" aria-hidden="true" />
            </Box>
          </Box>

          <ActionButton as={NavLink} to="/contact" variant="primary" paddingX={4} paddingY={2} className="text-xs uppercase tracking-widest">
            Contact
          </ActionButton>
        </Box>
      </Box>
    </>
  );
}
