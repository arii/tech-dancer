import { useState, useEffect, RefObject } from "react";
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../../layouts/Primitives';
import { iconSizes } from '../../styles/design-tokens';

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
        <Button
          as={motion.button}
          onClick={scrollToTop}
          position="fixed"
          padding={3}
          zIndex="popover"
          variant="fab"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
          bottom={8}
          right={8}
          className="transition-all duration-300"
          data-testid="scroll-to-top-button"
        >
          <ArrowUp size={iconSizes.lg} aria-hidden="true" />
        </Button>
      )}
    </AnimatePresence>
  );
}
