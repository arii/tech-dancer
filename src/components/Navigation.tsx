import { Menu, X, Terminal, Search, LucideIcon } from 'lucide-react';
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { stroke } from '@/styles/design-tokens';
import { cn } from '@/lib/utils';
import { throttle } from 'throttle-debounce';
import { routes } from '@/config/routes';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { MobileBottomNav } from './MobileBottomNav';

function NavItem({ to, label, icon, onClick, isMobile }: { to: string, label: string, icon?: LucideIcon, onClick?: () => void, isMobile?: boolean }) {
  if (!icon) {
    console.warn(`Navigation icon missing for route: ${label}. Falling back to Terminal icon.`);
  }
  const Icon = icon || Terminal;
  return (
    <Box as="li" position="relative" className="group">
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) => cn(
          "transition-all relative z-10 rounded-md block",
          isActive
            ? "text-accent bg-accent/10 border-l-4 border-accent"
            : "text-text-dim hover:text-accent hover:bg-bg/50 border-l-4 border-transparent"
        )}
      >
        <Box
          display="flex"
          align="center"
          gap={4}
          paddingY={6}
          paddingX={isMobile ? undefined : 4}
          border={isMobile ? "b" : undefined}
          className={cn(
            isMobile ? "border-line/50" : undefined,
            "min-h-[44px]"
          )}
        >
          <Icon className={cn(`w-5 h-5 ${stroke.thick} flex-shrink-0`, isMobile ? "w-6 h-6" : "")} />
          <Text variant="sans" size={isMobile ? "lg" : "base"} weight="font-bold" className="leading-none">
            {label}
          </Text>
        </Box>
      </NavLink>
    </Box>
  );
}

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
      <Box
        as="nav"
        aria-label="Mobile Navigation"
        layout="mobileHeader"
        className="transition-[backdrop-filter] duration-300 bg-surface border-b border-line"
      >
        <Box as={NavLink} to="/" onClick={() => setIsOpen(false)}>
          <Text variant="mono" size="sm" weight="font-bold" className="text-accent-navy tracking-wider uppercase">TECH-DANCER</Text>
        </Box>
        <Box
          as="button"
          onClick={() => setIsOpen(!isOpen)}
          padding={2}
          display="flex"
          align="center"
          justify="center"
          className="min-h-11 min-w-11"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Box>
      </Box>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <Box
            as={motion.div}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            position="fixed"
            className="top-16 left-0 right-0 bottom-0 z-[100] bg-bg lg:hidden w-full"
            padding={8}
            overflow="y-auto"
          >
            <Box as="ul" className="space-y-6">
              <Box as="li" position="relative" className="group">
                <Box
                  as="button"
                  type="button"
                  cursor="pointer"
                  onClick={() => {
                    setIsOpen(false);
                    handleSearchClick();
                  }}
                  display="flex"
                  align="center"
                  gap={4}
                  paddingY={6}
                  border="b"
                  width="full"
                  className="transition-all relative z-10 rounded-md text-text-dim hover:text-accent hover:bg-bg/50 border-line/50 min-h-[44px]"
                >
                  <Search className={`w-6 h-6 ${stroke.thick} flex-shrink-0`} />
                  <Text variant="sans" size="xl" weight="font-bold" className="leading-none">
                    Search
                  </Text>
                </Box>
              </Box>
              {routes.filter((r): r is typeof r & { label: string } => !!(r.path !== '/' && r.label)).map((item) => (
                <NavItem
                  key={item.path}
                  to={item.path}
                  label={item.label}
                  icon={item.icon}
                  onClick={() => setIsOpen(false)}
                  isMobile
                />
              ))}
            </Box>
          </Box>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <Box 
        as="nav"
        aria-label="Main Navigation"
        layout="navRail" 
        className={cn(
          "w-[280px] bg-surface border-r border-line hidden lg:flex flex-col min-h-screen sticky top-0 transition-[background-color,backdrop-filter] duration-300",
          scrolled ? "backdrop-blur-xl bg-surface/90" : ""
        )}
      >
        <Stack
          padding={8}
          gap={10}
          flex={1}
        >
          <Box as={NavLink} to="/" className="group block mb-4">
            <Text 
              variant="mono" 
              size="lg" 
              weight="font-bold" 
              className="text-accent-navy group-hover:text-accent transition-colors tracking-wider leading-none uppercase"
            >
              TECH-DANCER
            </Text>
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
