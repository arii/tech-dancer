import { useMemo, useCallback } from 'react';
import { useSearchParam } from './useSearchParam';
import { useQueries } from '@tanstack/react-query';
import { getPosts, getResources, getStudies } from '@/lib/content';
import { withSimulationDelay } from '@/lib/utils';
import Fuse from 'fuse.js';

export function useGlobalSearch() {
  const [query, setQuery] = useSearchParam('q');
  const [searchState, setSearchState] = useSearchParam('modal');
  
  const isOpen = searchState === 'true';

  const open = useCallback(() => {
    setSearchState('true');
  }, [setSearchState]);

  const close = useCallback(() => {
    setSearchState('');
  }, [setSearchState]);

  const queries = useQueries({
    queries: [
      { queryKey: ['posts'], queryFn: withSimulationDelay(getPosts) },
      { queryKey: ['resources'], queryFn: withSimulationDelay(getResources) },
      { queryKey: ['studies'], queryFn: withSimulationDelay(getStudies) },
    ],
  });

  const [postsQuery, resourcesQuery, studiesQuery] = queries;

  const isLoading = queries.some(q => q.isLoading);

  const allContent = useMemo(() => {
    return [
      ...(postsQuery.data || []).map(p => ({ ...p, type: 'post' as const })),
      ...(resourcesQuery.data || []).map(r => ({ ...r, type: 'resource' as const })),
      ...(studiesQuery.data || []).map(s => ({ ...s, type: 'study' as const }))
    ];
  }, [postsQuery.data, resourcesQuery.data, studiesQuery.data]);

  const fuse = useMemo(() => {
    return new Fuse(allContent, {
      keys: [
        { name: 'title', weight: 0.7 },
        { name: 'tags', weight: 0.5 },
        { name: 'excerpt', weight: 0.3 },
        { name: 'content', weight: 0.1 }
      ],
      threshold: 0.2,
      ignoreLocation: true
    });
  }, [allContent]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).map(result => result.item);
  }, [fuse, query]);

  return {
    query,
    setQuery,
    results,
    isOpen,
    open,
    close,
    isLoading
  };
}
