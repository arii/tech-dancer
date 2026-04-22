import React, { createContext, useContext, useRef, ReactNode } from 'react';

interface ScrollContextType {
  scrollRef: React.RefObject<HTMLElement | null>;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLElement | null>(null);

  return (
    <ScrollContext.Provider value={{ scrollRef }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollContainer() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScrollContainer must be used within a ScrollProvider');
  }
  return context;
}
