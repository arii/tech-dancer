import { useMemo, useCallback, useEffect } from 'react';
import { useSearchParam } from './useSearchParam';
import { useQueries } from '@tanstack/react-query';
import { getPosts, getResources, getStudies } from '@/lib/content';
import { withSimulationDelay } from '@/lib/utils';
import Fuse from 'fuse.js';
import { create } from 'zustand';

interface GlobalSearchModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useGlobalSearchModalStore = create<GlobalSearchModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export function useGlobalSearch() {
  const [query, setQuery] = useSearchParam('q');
  const [modalParam, setModalParam] = useSearchParam<'true' | ''>('modal', '');
  const { isOpen, open, close } = useGlobalSearchModalStore();

  useEffect(() => {
    if (modalParam === 'true' && !isOpen) open();
    if (modalParam !== 'true' && isOpen) close();
  }, [modalParam, isOpen, open, close]);

  const [postsQuery, resourcesQuery, studiesQuery] = useQueries({
    queries: [
      { queryKey: ['posts'], queryFn: withSimulationDelay(getPosts) },
      { queryKey: ['resources'], queryFn: withSimulationDelay(getResources) },
      { queryKey: ['studies'], queryFn: withSimulationDelay(getStudies) },
    ],
  });

  const allContent = useMemo(() => [
    ...(postsQuery.data || []).map(p => ({ ...p, type: 'post' as const })),
    ...(resourcesQuery.data || []).map(r => ({ ...r, type: 'resource' as const })),
    ...(studiesQuery.data || []).map(s => ({ ...s, type: 'study' as const })),
  ], [postsQuery.data, resourcesQuery.data, studiesQuery.data]);

  const fuse = useMemo(() => new Fuse(allContent, {
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'tags', weight: 0.5 },
      { name: 'excerpt', weight: 0.3 },
      { name: 'content', weight: 0.1 },
    ],
    threshold: 0.2,
    ignoreLocation: true,
  }), [allContent]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).map(result => result.item);
  }, [fuse, query]);

  const openModal = useCallback(() => {
    setModalParam('true');
    open();
  }, [setModalParam, open]);

  const closeModal = useCallback(() => {
    setModalParam('');
    close();
  }, [setModalParam, close]);

  return {
    query,
    setQuery,
    results,
    isOpen,
    open: openModal,
    close: closeModal,
  };
}
