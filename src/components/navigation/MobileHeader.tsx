import { Menu, X } from 'lucide-react';
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
      className="md:hidden sticky top-0 left-0 right-0 h-16 flex items-center justify-between bg-surface/90 backdrop-blur-xl border-b border-line/50 z-50"
      paddingX={{ base: 2, sm: 4 }}
    >
      <Box 
        as="div"
        display="flex" 
        align="center" 
        className="h-10 cursor-pointer" 
        onClick={onClose}
      >
        <Logo className="h-6" />
      </Box>
      
      <Box
        as={motion.button}
        onClick={onToggle}
        className="h-11 w-11 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 active:scale-90 transition-all border border-line/30"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5" />}
      </Box>
    </Box>
  );
}
