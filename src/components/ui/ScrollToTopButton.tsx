import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Box } from '@/layouts/Primitives';
import { useScrollContainer } from '@/context/ScrollContext';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollRef } = useScrollContainer();

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
          className="bottom-8 right-8 z-[60] bg-accent-navy text-bg p-3 shadow-lg hover:bg-accent transition-all duration-300"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
          style={{ borderRadius: '0' }}
          data-testid="scroll-to-top-button"
        >
          <ArrowUp className="w-6 h-6" />
        </Box>
      )}
    </AnimatePresence>
  );
}
