import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * A hook to manage a single URL search parameter.
 * Centralizes the logic for updating URL state with { replace: true }.
 */
export function useSearchParam(key: string, defaultValue: string = '') {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(key) || defaultValue;

  const setValue = useCallback((newValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (newValue && newValue !== defaultValue) {
      params.set(key, newValue);
    } else {
      params.delete(key);
    }
    setSearchParams(params, { replace: true });
  }, [key, defaultValue, searchParams, setSearchParams]);

  return [value, setValue] as const;
}
