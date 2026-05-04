import { Search } from 'lucide-react';
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Box, Text } from '@/layouts/Primitives';
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

      {/* Desktop Top Bar */}
      <Box 
        as="nav"
        aria-label="Main Navigation"
        position="fixed"
        inset="top"
        zIndex="sticky"
        className="hidden lg:flex flex-row justify-between items-center w-full bg-surface/90 backdrop-blur-xl border-b border-line px-8 py-4"
      >
        <Box as={NavLink} to="/" display="flex" align="center" className="group">
          <Logo className="h-8 transition-colors group-hover:opacity-80" />
        </Box>

        <Box as="ul" display="flex" flexDirection="row" align="center" gap={6}>
          {routes.filter((r): r is typeof r & { label: string } => !!(r.path !== '/' && r.label)).map((item) => (
            <Box as="li" key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                  isActive ? "bg-bg text-accent font-bold" : "text-text-dim hover:bg-bg hover:text-accent font-medium"
                )}
                aria-label={item.label}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <Text variant="sans" size="sm">{item.label}</Text>
              </NavLink>
            </Box>
          ))}
          <Box as="li">
            <Box
              as="button"
              type="button"
              cursor="pointer"
              onClick={handleSearchClick}
              display="flex"
              align="center"
              gap={2}
              paddingY={2}
              paddingX={3}
              radius="md"
              className="group text-text-dim hover:bg-bg hover:text-accent transition-all"
              data-testid="search-button"
            >
              <Search className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              <Text variant="sans" size="sm" weight="font-medium" className="leading-none">Search</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
