import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { Box, Text } from '@/layouts/Primitives';
import { stroke } from '@/styles/design-tokens';
import { routes } from '@/config/routes';
import { useEffect, useRef } from 'react';
import { NavItem } from './NavItem';

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchClick: () => void;
}

export function MobileMenuOverlay({ isOpen, onClose, onSearchClick }: MobileMenuOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    const originalActiveElement = document.activeElement as HTMLElement;
    firstElement?.focus();

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      originalActiveElement?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Box
      as={motion.div}
      ref={containerRef}
      data-testid="mobile-menu"
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      position="fixed"
      className="top-16 left-0 right-0 bottom-0 z-[100] bg-bg lg:hidden w-full"
      padding={8}
      overflow="y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <Box as="ul" className="space-y-6">
        <Box as="li" position="relative" className="group">
          <Box
            as="button"
            type="button"
            data-testid="search-trigger-mobile"
            cursor="pointer"
            onClick={onSearchClick}
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
            onClick={onClose}
            isMobile
          />
        ))}
      </Box>
    </Box>
  );
}
