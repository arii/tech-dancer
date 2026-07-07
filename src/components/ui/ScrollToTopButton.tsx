import { useState, useEffect, RefObject } from "react";
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Box } from '@/layouts/Primitives';
import { iconSizes } from '@/styles/design-tokens';
import { cva } from "class-variance-authority";

const fabVariants = cva(
  "inline-flex items-center justify-center font-sans tracking-normal transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-surface-alt text-accent border border-accent/20 shadow-lg hover:bg-accent hover:text-bg rounded-none active:scale-tap",
  {
    variants: {
      size: {
        default: "h-10 px-6 text-xs",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "icon",
    },
  }
);

interface ScrollToTopButtonProps {
  scrollRef: RefObject<HTMLElement | null>;
}

export function ScrollToTopButton({ scrollRef }: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;

      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef]);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <Box
          as={motion.button}
          onClick={scrollToTop}
          position="fixed"
          zIndex="popover"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
          bottom={8}
          right={8}
          className={fabVariants()}
          data-testid="scroll-to-top-button"
        >
          <ArrowUp size={iconSizes.lg} aria-hidden="true" />
        </Box>
      )}
    </AnimatePresence>
  );
}
