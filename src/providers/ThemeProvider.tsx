import { useState, ReactNode, useMemo } from 'react';
import { ThemeContext, ThemeOverrides } from '@/context/ThemeContext';
import { Box } from '@/layouts/Primitives';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [overrides, setOverrides] = useState<ThemeOverrides>({});

  const value = useMemo(() => ({
    overrides,
    setOverrides,
  }), [overrides]);

  return (
    <ThemeContext.Provider value={value}>
      <Box style={overrides as React.CSSProperties}>
        {children}
      </Box>
    </ThemeContext.Provider>
  );
}
