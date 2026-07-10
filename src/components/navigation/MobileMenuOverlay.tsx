
import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { Box, Text, Stack } from '@/layouts/Primitives';
import { stroke } from '@/styles/design-tokens';
import { transitions } from '@/styles/utilities';
import { TOP_NAV_ROUTES } from '@/config/routes';
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
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      position="fixed"
      inset="bottom"
      top={16}
      width="full"
      zIndex="mobileMenu"
      surface="bg"
      display={{ base: 'block', lg: 'none' }}
      padding={8}
      overflow="y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <Stack as="ul" gap={6}>
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
            radius="sm"
            className={`${transitions.default} hover:translate-x-1 text-text-dim hover:text-accent hover:bg-surface-alt/50 border-line/50 tap-target`}
          >
            <Box shrink={false}>
              <Search className={`w-6 h-6 ${stroke.thick}`} />
            </Box>
            <Text variant="sans" size="xl" weight="font-bold" className="leading-none">
              Search
            </Text>
          </Box>
        </Box>
        {TOP_NAV_ROUTES.map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
            label={item.label}
            icon={item.icon}
            onClick={onClose}
            isMobile
          />
        ))}
      </Stack>
    </Box>
  );
}
