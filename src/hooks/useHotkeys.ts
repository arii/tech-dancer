import { DependencyList, useEffect } from "react";

type HotkeyHandler = (event: KeyboardEvent) => void;

export function useHotkeys(key: string, handler: HotkeyHandler, deps: DependencyList = []) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        handler(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, ...deps]);
}

export function useCommandKey(key: string, handler: HotkeyHandler, deps: DependencyList = []) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === key.toLowerCase()) {
        handler(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, ...deps]);
}
