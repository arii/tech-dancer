import { useMemo } from 'react';
import { useSearchParam } from './useSearchParam';
import { getPosts, getResources, getStudies } from '@/lib/content';
import { safeSearch } from '@/lib/utils';

export function useGlobalSearch() {
  const [query, setQuery] = useSearchParam('q');
  
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
    results
  };
}
