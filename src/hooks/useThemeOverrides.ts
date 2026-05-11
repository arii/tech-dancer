import { useCallback } from 'react';
import { useThemeContext, ThemeOverrides } from '@/context/ThemeContext';

export function useThemeOverrides() {
  const { overrides, setOverrides } = useThemeContext();

  const applyOverrides = useCallback((newOverrides: ThemeOverrides) => {
    setOverrides(newOverrides);
  }, [setOverrides]);

  const clearOverrides = useCallback(() => {
    setOverrides({});
  }, [setOverrides]);

  return {
    overrides,
    applyOverrides,
    clearOverrides,
  };
}
