import { useEffect, useRef, useState, useCallback } from 'react';

interface ResizeEntry {
  width: number;
  height: number;
}

export function useResizeObserver<T extends HTMLElement>(debounceMs?: number) {
  const [size, setSize] = useState<ResizeEntry>({ width: 0, height: 0 });
  const elementRef = useRef<T>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const observerCallback = useCallback((entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;

      if (debounceMs) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setSize({ width, height });
        }, debounceMs);
      } else {
        setSize({ width, height });
      }
    }
  }, [debounceMs]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new ResizeObserver(observerCallback);
    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [observerCallback]);

  return { elementRef, ...size };
}
