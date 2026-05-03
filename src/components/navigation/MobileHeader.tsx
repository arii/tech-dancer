import { Menu, X, Search } from 'lucide-react';
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
      className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 border-b border-line bg-surface/90 px-4 backdrop-blur-xl"
    >
      <Box as={NavLink} to="/" onClick={onClose} className="flex items-center gap-2 shrink-0">
        <Text variant="mono" size="sm" weight="font-bold" className="text-white tracking-[0.18em] uppercase">
          Boom Tick
        </Text>
      </Box>
      <Box className="flex items-center gap-2">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-text-dim transition-colors hover:text-accent"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
        <Box
          as={motion.create('button')}
          onClick={onToggle}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-bg/50 active:bg-accent/10"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Box>
      </Box>
    </Box>
  );
}
