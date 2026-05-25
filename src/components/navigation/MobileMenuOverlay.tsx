
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

const MOBILE_MENU_COPY: Record<string, { label?: string; subtitle: string }> = {
  '/': { label: 'Start Here', subtitle: 'Quick orientation for new visitors' },
  '/blog': { label: 'Guides', subtitle: 'Training, travel, and WCS prep' },
  '/gear': { subtitle: 'Useful products for dance weekends' },
  '/events': { label: 'Events', subtitle: 'What to expect and what to pack' },
  '/merch': { subtitle: 'BoomTick shirts, hats, and designs' },
  '/about': { subtitle: 'Who writes BoomTick and why' },
};

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
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      position="fixed"
      width="full"
      className="top-16 left-0 right-0 bottom-0 z-top bg-bg lg:hidden"
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
            cursor="pointer"
            onClick={onSearchClick}
            display="flex"
            align="center"
            gap={4}
            paddingY={6}
            border="b"
            width="full"
            position="relative"
            radius="md"
            className="transition-all duration-200 hover:translate-x-1 z-10 text-text-dim hover:text-accent hover:bg-surface-alt/50 border-line/50 tap-target"
          >
            <Box shrink={false}>
              <Search className={`w-6 h-6 ${stroke.thick}`} />
            </Box>
            <Text variant="sans" size="xl" weight="font-bold" className="leading-none">
              Search
            </Text>
          </Box>
        </Box>
        {routes.filter((r): r is typeof r & { label: string } => !!r.label).map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
            label={MOBILE_MENU_COPY[item.path]?.label ?? item.label}
            subtitle={MOBILE_MENU_COPY[item.path]?.subtitle}
            icon={item.icon}
            onClick={onClose}
            isMobile
          />
        ))}
      </Box>
    </Box>
  );
}
