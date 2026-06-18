import { useMemo } from "react";

import { useQuery } from '@tanstack/react-query';
import { useSearchParam } from '@/hooks/useSearchParam';
import { getPosts } from '@/lib/content';
import { safeSearch } from '@/lib/utils';
import { ViewMode } from '@/components/ui/ViewToggle';

export function useBlog() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialData: getPosts,
  });
  const [activeCategory] = useSearchParam('category', 'All');
  const [searchTerm, setSearchTerm] = useSearchParam('search');
  const [viewParam, setViewParam] = useSearchParam('view', 'card');

  const view = viewParam as ViewMode;
  const setView = (v: ViewMode) => setViewParam(v);
  const setCategory = (c: string) => setCategoryParam(c);

  const categories = useMemo(() => {
    return ['All', 'Guides', 'Gear', 'Events', 'Travel', 'Lifestyle', 'Dance'];
  }, []);

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (searchTerm) {
      result = result.filter(p =>
        safeSearch(p.title, searchTerm) ||
        safeSearch(p.category, searchTerm) ||
        safeSearch(p.excerpt, searchTerm)
      );
    }

    return result;
  }, [posts, activeCategory, searchTerm]);

  return {
    posts: filteredPosts,
    categories,
    activeCategory,
    view,
    setView,
    searchTerm,
    setSearchTerm,
    isLoading
  };
}
