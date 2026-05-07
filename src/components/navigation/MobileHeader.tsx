import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { Box, Text } from '@/layouts/Primitives';
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
      border="b"
      className="transition-[backdrop-filter] duration-300 bg-surface border-line"
    >
      {/* Logo: B● mark + wordmark — matches sidebar and hero styling */}
      <Box as={NavLink} to="/" onClick={onClose} display="flex" align="center" gap={2}>
        <Logo showText={false} className="h-9 w-auto text-white flex-shrink-0" />
        <Text
          variant="sans"
          size="sm"
          weight="font-extrabold"
          className="leading-none text-white tracking-wide"
        >
          boom
          <span className="text-accent">tick</span>
          <span className="text-white/70 font-light">.blog</span>
        </Text>
      </Box>

      <Box
        as={motion.create("button")}
        onClick={onToggle}
        padding={4}
        display="flex"
        align="center"
        justify="center"
        radius="full"
        className="min-h-12 min-w-12 hover:bg-bg/50 active:bg-accent/10 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Box>
    </Box>
  );
}
