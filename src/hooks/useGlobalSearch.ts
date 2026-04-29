import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { getPosts, getResources, getStudies } from '@/lib/content';
import Fuse from 'fuse.js';

export function useGlobalSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const setQuery = useCallback((newQuery: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (newQuery) {
        next.set('q', newQuery);
      } else {
        next.delete('q');
      }
      return next;
    }, { replace: true });
  }, [setSearchParams]);
  
  const isOpen = searchParams.get('search') === 'true';

  const open = useCallback(() => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('search', 'true');
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const close = useCallback(() => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.delete('search');
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const [postsQuery, resourcesQuery, studiesQuery] = useQueries({
    queries: [
      { queryKey: ['posts'], queryFn: getPosts },
      { queryKey: ['resources'], queryFn: getResources },
      { queryKey: ['studies'], queryFn: getStudies },
    ],
  });

  const allContent = useMemo(() => {
    return [
      ...(postsQuery.data || []).map(p => ({ ...p, type: 'post' as const })),
      ...(resourcesQuery.data || []).map(r => ({ ...r, type: 'resource' as const })),
      ...(studiesQuery.data || []).map(s => ({ ...s, type: 'study' as const }))
    ];
  }, [postsQuery.data, resourcesQuery.data, studiesQuery.data]);

  const fuse = useMemo(() => {
    return new Fuse(allContent, {
      keys: ['title', 'excerpt', 'content', 'tags'],
      threshold: 0.3,
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
    close
  };
}
