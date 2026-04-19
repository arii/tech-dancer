import { useState, useMemo } from 'react';
import { create } from 'zustand';
import { getPosts, getResources, getStudies } from '@/lib/content';

interface SearchState {
  isOpen: boolean;
  toggleSearch: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  toggleSearch: () => set((state) => ({ isOpen: !state.isOpen })),
  setIsOpen: (isOpen) => set({ isOpen }),
}));

export function useGlobalSearch() {
  const [query, setQuery] = useState('');
  const isOpen = useSearchStore(state => state.isOpen);
  const toggleSearch = useSearchStore(state => state.toggleSearch);
  const setIsOpen = useSearchStore(state => state.setIsOpen);
  
  const allContent = useMemo(() => {
    return [
      ...getPosts().map(p => ({ ...p, type: 'post' as const })),
      ...getResources().map(r => ({ ...r, type: 'resource' as const })),
      ...getStudies().map(s => ({ ...s, type: 'study' as const }))
    ];
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const term = query.toLowerCase();
    return allContent.filter(item => 
      item.title.toLowerCase().includes(term) ||
      item.excerpt.toLowerCase().includes(term) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(term)))
    );
  }, [allContent, query]);

  return {
    query,
    setQuery,
    results,
    isOpen,
    setIsOpen,
    toggleSearch
  };
}
