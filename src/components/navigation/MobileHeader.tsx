import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { Box } from '@/layouts/Primitives';
import { Logo } from '@/components/ui/Logo';

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
      <Box as={NavLink} to="/" onClick={onClose} display="flex" align="center">
        <Logo className="h-6" />
      </Box>
      <Box
        as={motion.create("button")}
        onClick={onToggle}
        padding={4}
        display="flex"
        align="center"
        justify="center"
        className="min-h-12 min-w-12 rounded-full hover:bg-bg/50 active:bg-accent/10 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Box>
    </Box>
  );
}
