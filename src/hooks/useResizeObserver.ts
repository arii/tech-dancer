import { useEffect, useRef, useState, useCallback } from 'react';

interface ResizeEntry {
  width: number;
  height: number;
}

export function useResizeObserver<T extends HTMLElement>() {
  const [size, setSize] = useState<ResizeEntry>({ width: 0, height: 0 });
  const elementRef = useRef<T>(null);

  const observerCallback = useCallback((entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    }
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new ResizeObserver(observerCallback);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [observerCallback]);

  return { elementRef, ...size };
}
