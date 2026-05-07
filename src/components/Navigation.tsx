import { Search } from 'lucide-react';
import { useState, useEffect, useRef } from "react";
import { NavLink } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Logo } from '@/components/ui/Logo';

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

  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timer.current) return;
      timer.current = setTimeout(() => {
        setScrolled(window.scrollY > 20);
        timer.current = null;
      }, 100);
    };

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
          "transition-[background-color,backdrop-filter] duration-300 border-r border-line bg-surface",
          scrolled ? "backdrop-blur-xl bg-surface/90" : ""
        )}
      >
        <Stack
          padding={0}
          gap={0}
          flex={1}
        >
          <Box
            as={NavLink}
            to="/"
            display="block"
            paddingX={5}
            paddingY={3}
            className="group border-b border-line"
          >
            {/* B● mark — explicit white so currentColor renders on dark surface */}
            <Logo
              showText={false}
              className="h-8 w-auto text-white transition-opacity group-hover:opacity-80"
            />
            {/* Wordmark */}
            <Box paddingY={0} className="mt-0.5 leading-none">
              <Text
                variant="sans"
                size="sm"
                weight="font-extrabold"
                className="tracking-tight leading-none text-white"
              >
                boom
                <span className="text-accent">tick</span>
                <span className="text-white/40">.blog</span>
              </Text>
            </Box>
          </Box>

          <Stack as="ul" gap={0} flex={1} paddingY={4}>
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
                className="group text-text-dim hover:text-accent transition-all text-left hover:bg-surface-alt"
              >
                <Search className="w-5 h-5 opacity-70 group-hover:opacity-100 flex-shrink-0" />
                <Text variant="sans" size="sm" weight="font-bold" className="leading-none">Search</Text>
              </Box>
            </Box>

            {routes.filter((r): r is typeof r & { label: string } => !!(r.path !== '/' && r.label)).map((item) => (
              <NavItem key={item.path} to={item.path} label={item.label} icon={item.icon} />
            ))}
          </Stack>

          <Box paddingX={6} paddingY={5} className="border-t border-line bg-surface">
            <Text variant="sans" size="xs" color="dim" className="mb-1 leading-normal">
              Written by <strong className="text-accent">Tech Dancer</strong>
            </Text>
            <Text variant="mono" size="tiny" color="dim" uppercase className="tracking-widest opacity-60 leading-none">
              2026 boomtick.blog
            </Text>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
