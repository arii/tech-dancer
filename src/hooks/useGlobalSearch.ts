import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPosts, getResources, getStudies } from '@/lib/content';
import { safeSearch } from '@/lib/utils';

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

  const allContent = useMemo(() => {
    return [
      ...getPosts().map(p => ({ ...p, type: 'post' as const })),
      ...getResources().map(r => ({ ...r, type: 'resource' as const })),
      ...getStudies().map(s => ({ ...s, type: 'study' as const }))
    ];
  }, []);

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
    results,
    isOpen,
    open,
    close
  };
}
