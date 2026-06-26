import { Search, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Logo } from '@/components/ui/Logo';
import { TOP_NAV_ROUTES } from '@/config/routes';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileMenuOverlay } from './navigation/MobileMenuOverlay';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { open: openSearch, close: closeSearch, isOpen: isSearchOpen } = useGlobalSearch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchClick = () => {
    setIsOpen(false);
    if (isSearchOpen) closeSearch();
    else openSearch();
  };

  const topRoutes = TOP_NAV_ROUTES;

  return (
    <>
      <MobileBottomNav />
      <Box
        as="nav"
        aria-label="Main Navigation"
        zIndex="nav"
        position="fixed"
        inset="top"
        height={16}
        width="full"
        isolation="isolate"
        className={cn(
          'transition-all duration-300',
          isScrolled ? 'bg-bg/95 backdrop-blur-xl border-b border-line/30' : 'bg-transparent'
        )}
      >
        <Box display="flex" align="center" justify="between" paddingX={{ base: 4, lg: 12 }} width="full" maxWidth="full" minWidth={0} height="full">
          <Stack direction="row" align="center" gap={12}>
            <Box as={NavLink} to="/" onClick={() => setIsOpen(false)} height={{ base: 8, md: 9 }} width="auto" className="group">
              <Logo className="text-white transition-opacity group-hover:opacity-heavy" />
            </Box>
            <Box as="ul" display={{ base: 'none', lg: 'flex' }} align="center" gap={10}>
              {topRoutes.map((item) => (
                <Box as="li" key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => cn('relative text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent py-1', isActive ? 'text-accent' : 'text-text-dim')}
                  >
                    {item.label}
                  </NavLink>
                </Box>
              ))}
            </Box>
          </Stack>

          <Stack direction="row" align="center" gap={{ base: 2, lg: 6 }}>
            <Box as="button" type="button" onClick={handleSearchClick} padding={3} display={{ base: 'none', lg: 'flex' }} align="center" gap={2} className="group text-text-dim transition-colors hover:text-accent" aria-label="Open search">
              <Search className="h-4 w-4" aria-hidden="true" />
              <Text variant="mono" size="xs" color="dim" display={{ base: 'none', xl: 'block' }}>CMD+K</Text>
            </Box>


            <Box
              as="button"
              display={{ base: 'flex', lg: 'none' }}
              onClick={() => setIsOpen(!isOpen)}
              padding={3}
              align="center"
              justify="center"
              radius="full"
              className="hover:bg-bg/50 active:bg-accent/10 transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </Box>
          </Stack>
        </Box>
      </Box>

      <AnimatePresence mode="wait">
        {isOpen && <MobileMenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} onSearchClick={handleSearchClick} />}
      </AnimatePresence>
    </>
  );
}
