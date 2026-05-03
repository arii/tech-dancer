import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
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
      className="h-14 transition-[backdrop-filter] duration-300 bg-surface/90 backdrop-blur-xl border-b border-line px-4 sm:px-6"
    >
      <Box as={NavLink} to="/" onClick={onClose} className="flex items-center gap-2">
        <Text variant="mono" size="sm" weight="font-bold" className="text-white tracking-[0.22em] uppercase">BOOMTICK.BLOG</Text>
      </Box>
      <Box
        as={motion.create("button")}
        onClick={onToggle}
        padding={3}
        display="flex"
        align="center"
        justify="center"
        className="min-h-11 min-w-11 rounded-full hover:bg-bg/50 active:bg-accent/10 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Box>
    </Box>
  );
}
