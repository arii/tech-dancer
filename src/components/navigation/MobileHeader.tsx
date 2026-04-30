import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Text } from '@/layouts/Primitives';

interface MobileHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function MobileHeader({ isOpen, onToggle, onClose }: MobileHeaderProps) {
  return (
    <Box
      as="nav"
      aria-label="Mobile Navigation"
      layout="mobileHeader"
      className="transition-[backdrop-filter] duration-300 bg-surface border-b border-line"
    >
      <Box as={NavLink} to="/" onClick={onClose}>
        <Text variant="mono" size="sm" weight="font-bold" className="text-accent-navy tracking-wider uppercase">TECH-DANCER</Text>
      </Box>
      <Box
        as="button"
        onClick={onToggle}
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
  );
}
