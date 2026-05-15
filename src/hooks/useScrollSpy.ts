import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseScrollSpyOptions {
  sectionIds: string[];
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Hook to track which section is currently in view and sync with URL search params.
 */
export function useScrollSpy({
  sectionIds,
  rootMargin = '-100px 0px -70% 0px', /* impeccable-ignore */
  threshold = 0
}: UseScrollSpyOptions) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || sectionIds[0];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin, /* impeccable-ignore */
      threshold
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setSearchParams(params => {
            if (params.get('tab') !== id) {
              params.set('tab', id);
            }
            return params;
          }, { replace: true });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, rootMargin, threshold, setSearchParams]);

  const scrollToSection = (id: string) => {
    setSearchParams({ tab: id }, { replace: true });

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return { activeTab, scrollToSection };
}
