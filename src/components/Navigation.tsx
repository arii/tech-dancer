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
        layout="navRail" 
        className={cn(
          "transition-[background-color,backdrop-filter] duration-300",
          scrolled ? "backdrop-blur-xl bg-surface/90" : ""
        )}
      >
        <Stack
          padding={8}
          gap={10}
          flex={1}
        >
          <Box as={NavLink} to="/" display="block" marginBottom={4} className="group">
            <Logo className="h-10 transition-colors group-hover:opacity-80" />
          </Box>

          <Stack as="ul" gap={2}>
            <Box as="li">
              <Box
                as="button"
                type="button"
                cursor="pointer"
                onClick={handleSearchClick}
                display="flex"
                align="center"
                gap={4}
                width="full"
                paddingY={6}
                paddingX={4}
                radius="md"
                className="group text-text-dim hover:bg-bg hover:text-accent transition-all text-left"
              >
                <Search className="w-5 h-5 opacity-70 group-hover:opacity-100 flex-shrink-0" />
                <Text variant="sans" size="base" weight="font-bold" className="leading-none">Search</Text>
              </Box>
            </Box>

            {routes.filter((r): r is typeof r & { label: string } => !!(r.path !== '/' && r.label)).map((item) => (
              <NavItem key={item.path} to={item.path} label={item.label} icon={item.icon} />
            ))}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
