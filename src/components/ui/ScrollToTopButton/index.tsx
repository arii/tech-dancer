import { useState, useEffect, useCallback, RefObject } from "react";
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Box } from '@/layouts/Primitives';
import { iconSizes } from '@/styles/design-tokens';
import { fabVariants } from './variants';

interface ScrollToTopButtonProps {
  scrollRef: RefObject<HTMLElement | null>;
}

export function ScrollToTopButton({ scrollRef }: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

    const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (container) {
      setIsVisible(container.scrollTop > 300);
    }
  }, [scrollRef]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef, handleScroll]);

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
          bottom={8} right={8} /* impeccable-ignore */
          className={fabVariants()}
          data-testid="scroll-to-top-button"
        >
          <ArrowUp size={iconSizes.lg} aria-hidden="true" />
        </Box>
      )}
    </AnimatePresence>
  );
}