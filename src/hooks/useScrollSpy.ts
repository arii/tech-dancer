import { useState, useEffect, useRef } from 'react';

/**
 * Hook to track which section is currently active in the viewport.
 * Uses IntersectionObserver for performance and accuracy.
 */
export function useScrollSpy(ids: string[], options: IntersectionObserverInit = {}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const intersectionRatios = useRef(new Map<string, number>());

  // Use a ref to keep track of the current activeId without triggering effect re-runs
  const activeIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Clean up previous observer
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        intersectionRatios.current.set(entry.target.id, entry.intersectionRatio);
      });

      // Find the element with the highest intersection ratio
      let maxRatio = 0;
      let winner: string | null = activeIdRef.current;

      intersectionRatios.current.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          winner = id;
        }
      });

      // Threshold to avoid flickering when multiple elements are visible
      if (winner && winner !== activeIdRef.current) {
        activeIdRef.current = winner;
        setActiveId(winner);
      }
    }, {
      // Default to 10% visible to trigger, with a small rootMargin to handle headers
      rootMargin: '-10% 0% -40% 0%',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      ...options,
    });

    // Observe all targeted IDs
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element && observer.current) {
        observer.current.observe(element);
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
    // ids and options are expected to be stable or handled by the caller (e.g., via useMemo)
    // We intentionally exclude activeId/activeIdRef from dependencies to avoid observer re-registration
  }, [ids, options]);

  return activeId;
}
