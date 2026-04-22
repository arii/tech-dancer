import { useState, useMemo, useEffect } from 'react';
import { getPosts, getResources, getStudies, ContentItem } from '@/lib/content';
import { safeSearch } from '@/lib/utils';

export function useGlobalSearch() {
  const [query, setQuery] = useState('');
  const [studies, setStudies] = useState<any[]>([]);

  useEffect(() => {
    getStudies().then(data => setStudies(data.map(s => ({ ...s, type: 'study' as const }))));
  }, []);
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
      ...studies
    ];
  }, [studies]);

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
