import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Box } from '@/layouts/Primitives';
import { Logo } from '@/components/ui/Logo';
import { animation } from '@/styles/design-tokens';
import { Wordmark } from '@/components/ui/Wordmark';

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
      zIndex="mobileHeader"
      border="b"
      className={cn(animation.mobileHeader, "bg-surface border-line")}
    >
      <Box as={NavLink} to="/" onClick={onClose} display="flex" align="center" gap={2} shrink={false}>
        <Logo showText={false} className="h-9 w-auto text-white" />
        <Wordmark variant="navigation" />
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
