import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * A hook to manage a single URL search parameter.
 * Centralizes the logic for updating URL state with { replace: true }.
 */
export function useSearchParam<T extends string = string>(key: string, defaultValue: T = '' as T) {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = (searchParams.get(key) as T) || defaultValue;

  const setValue = useCallback((newValue: T) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (newValue && newValue !== defaultValue) {
        next.set(key, newValue);
      } else {
        next.delete(key);
      }
      return next;
    }, { replace: true });
  }, [key, defaultValue, setSearchParams]);

  return [value, setValue] as const;
}
