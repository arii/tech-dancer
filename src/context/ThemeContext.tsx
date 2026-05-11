import { createContext } from 'react';

export type ThemeOverrides = Record<string, string>;

interface ThemeContextType {
  overrides: ThemeOverrides;
  setOverrides: (overrides: ThemeOverrides) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
