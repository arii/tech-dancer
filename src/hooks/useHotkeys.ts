import { useEffect, DependencyList } from 'react';

type HotkeyHandler = (event: KeyboardEvent) => void;

function useKeyboardListener(
  predicate: (event: KeyboardEvent) => boolean,
  handler: HotkeyHandler,
  deps: DependencyList = []
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (predicate(event)) {
        handler(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, deps);
}

export function useHotkeys(key: string, handler: HotkeyHandler, deps: DependencyList = []) {
  useKeyboardListener(
    (event) => event.key === key,
    handler,
    [key, ...deps]
  );
}

export function useCommandKey(key: string, handler: HotkeyHandler, deps: DependencyList = []) {
  useKeyboardListener(
    (event) => (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === key.toLowerCase(),
    handler,
    [key, ...deps]
  );
}
