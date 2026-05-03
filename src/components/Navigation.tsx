import { Search } from 'lucide-react';
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Logo } from '@/components/ui/Logo';
import { throttle } from 'throttle-debounce';
import { routes } from '@/config/routes';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileHeader } from './navigation/MobileHeader';
import { MobileMenuOverlay } from './navigation/MobileMenuOverlay';
import { NavItem } from './navigation/NavItem';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open: openSearch, close: closeSearch, isOpen: isSearchOpen } = useGlobalSearch();

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

      {/* Desktop Sidebar */}
      <Box 
        as="nav"
        aria-label="Main Navigation"
        className={cn(
          "fixed top-0 left-0 hidden h-full w-56 flex-col border-r border-line bg-surface md:flex z-40 transition-[background-color,backdrop-filter] duration-300",
          scrolled ? "backdrop-blur-xl bg-surface/90" : ""
        )}
      >
        <Box className="border-b border-line px-4 py-4">
          <Logo />
        </Box>
        
        <Stack as="ul" gap={1} flex={1} paddingY={4} className="overflow-y-auto">
          <Box as="li">
            <Box
              as="button"
              type="button"
              cursor="pointer"
              onClick={handleSearchClick}
              display="flex"
              align="center"
              gap={3}
              width="full"
              paddingY={3}
              paddingX={6}
              className="group text-sm text-text-dim hover:bg-bg hover:text-accent transition-colors text-left min-h-11"
            >
              <Search className="w-4 h-4 opacity-70 group-hover:opacity-100 flex-shrink-0" />
              <Text variant="sans" size="base" className="leading-none">Search</Text>
            </Box>
          </Box>

          {routes.filter((r): r is typeof r & { label: string } => !!(r.path !== '/' && r.label)).map((item) => (
            <NavItem key={item.path} to={item.path} label={item.label} icon={item.icon} />
          ))}
        </Stack>

        <Box className="space-y-1 border-t border-line px-6 py-5">
          <Text size="xs" className="text-text-dim/75">Written by Ariel Anders</Text>
          <Text size="xs" className="text-text-dim/65">&copy; {new Date().getFullYear()} boomtick.blog</Text>
        </Box>
      </Box>
    </>
  );
}
