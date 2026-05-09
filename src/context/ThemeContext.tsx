import { createContext, useContext } from 'react';

export type ThemeOverrides = Record<string, string>;

interface ThemeContextType {
  overrides: ThemeOverrides;
  setOverrides: (overrides: ThemeOverrides) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
