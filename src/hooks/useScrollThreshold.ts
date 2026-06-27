import { useState, useEffect } from 'react';

/**
 * Hook to detect if the window has been scrolled past a certain threshold.
 * Useful for "transparent until scroll" navigation patterns.
 *
 * @param threshold The number of pixels to scroll before the state changes.
 * @returns boolean true if scrolled past the threshold, false otherwise.
 */
export function useScrollThreshold(threshold: number = 20): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
