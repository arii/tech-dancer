import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPosts, getResources, getStudies } from '@/lib/content';
import { safeSearch } from '@/lib/utils';

export function useGlobalSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const setQuery = (newQuery: string) => {
    const params = new URLSearchParams(searchParams);
    if (newQuery) {
      params.set('q', newQuery);
    } else {
      params.delete('q');
    }
    setSearchParams(params, { replace: true });
  };
  
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
