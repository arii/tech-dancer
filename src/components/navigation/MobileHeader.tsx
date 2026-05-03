import { Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Box } from '@/layouts/Primitives';

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
      className="md:hidden sticky top-0 left-0 right-0 h-16 flex items-center justify-between px-4 bg-surface/90 backdrop-blur-xl border-b border-line/50 z-50"
    >
      <Box 
        as="div"
        display="flex" 
        align="center" 
        className="h-10 cursor-pointer" 
        onClick={onClose}
      >
        <svg
          viewBox="0 0 340 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-auto max-w-none overflow-visible"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="logo-slash-mobile" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00CFFF" />
              <stop offset="100%" stopColor="#8B2FFF" />
            </linearGradient>
          </defs>
          <rect width="340" height="110" rx="18" fill="#0D0E1C" />
          <text
            x="16"
            y="72"
            fontFamily="Arial Black, Arial, sans-serif"
            fontWeight="900"
            fontSize="60"
            fill="white"
          >
            B
          </text>
          <line
            x1="82"
            y1="20"
            x2="112"
            y2="72"
            stroke="url(#logo-slash-mobile)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <text
            x="148"
            y="69"
            fontFamily="Arial, Helvetica Neue, Arial, sans-serif"
            fontWeight="700"
            fontSize="33"
            fill="white"
            letterSpacing="-0.5"
          >
            <tspan fill="white">boom</tspan>
            <tspan fill="#00CFFF">tick</tspan>
          </text>
        </svg>
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
