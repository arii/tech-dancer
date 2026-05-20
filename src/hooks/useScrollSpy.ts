import { useState, useEffect, useRef } from 'react';

interface UseScrollSpyOptions {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export function useScrollSpy(
  itemIds: string[],
  options: UseScrollSpyOptions = { rootMargin: '-20% 0% -70% 0%', threshold: 0 }
) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      const winner = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (winner) {
        setActiveId(winner.target.id);
      }
    }, options);

    const elements: HTMLElement[] = [];
    itemIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current?.observe(element);
        elements.push(element);
      }
    });

    return () => {
      if (observerRef.current) {
        elements.forEach(el => observerRef.current?.unobserve(el));
        observerRef.current.disconnect();
      }
    };
  }, [itemIds, options.rootMargin, options.threshold, options.root]);

  return activeId;
}
