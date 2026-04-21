import { useState, useMemo } from 'react';
import { getPosts, getResources, getStudies, ContentItem } from '@/lib/content';
import { safeSearch } from '@/lib/utils';

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
    const searchTerm = query.toLowerCase();
    return allContent.filter(item => {
      const title = String(item.title || "").toLowerCase();
      const excerpt = String(item.excerpt || "").toLowerCase();
      const content = String(item.content || "").toLowerCase();
      
      return (
        title.includes(searchTerm) ||
        excerpt.includes(searchTerm) ||
        content.includes(searchTerm) ||
        (item.tags?.some((t: any) => String(t || "").toLowerCase().includes(searchTerm)))
      );
    });
  }, [allContent, query]);

  return {
    query,
    setQuery,
    results
  };
}
