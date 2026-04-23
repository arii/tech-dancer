import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { useSearchParam } from './useSearchParam';
import { getPosts, getResources, getStudies } from '@/lib/content';
import { safeSearch } from '@/lib/utils';

export function useGlobalSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useSearchParam('q');

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

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return allContent.filter(item => 
      safeSearch(item.title, query) ||
      safeSearch(item.excerpt, query) ||
      safeSearch(item.content, query) ||
      safeSearch(item.tags, query)
    );
  }, [allContent, query]);

  return {
    query,
    setQuery,
    results
  };
}
