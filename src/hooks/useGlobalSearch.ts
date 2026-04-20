import { useState, useMemo } from 'react';
import { getPosts, getResources, getStudies, ContentItem } from '@/lib/content';

export function useGlobalSearch() {
  const [query, setQuery] = useState('');
  
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
      item.content.toLowerCase().includes(term) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(term)))
    );
  }, [allContent, query]);

  return {
    query,
    setQuery,
    results
  };
}
