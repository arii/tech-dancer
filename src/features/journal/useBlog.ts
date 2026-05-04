import { useMemo } from "react";

import { useQuery } from '@tanstack/react-query';
import { useSearchParam } from '@/hooks/useSearchParam';
import { getPosts } from '@/lib/content';
import { safeSearch } from '@/lib/utils';
import { ViewMode } from '@/components/ui/ViewToggle';

export const blogFilters = ["All Posts", "Tech", "Travel", "Dance Research", "Gear Reviews"];

export const tagColors: Record<string, string> = {
  Tech: "text-primary border-primary/40",
  Travel: "text-secondary border-secondary/40",
  "Dance Research": "text-accent border-accent/40",
  "Travel/Lifestyle": "text-secondary border-secondary/40",
  "Gear Reviews": "text-primary border-primary/40",
  "Data & Dev Lab": "text-accent border-accent/40",
  Gear: "text-primary border-primary/40",
};

export function useBlog() {
  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
  const [activeCategory, setActiveCategoryParam] = useSearchParam('category', 'All Posts');
  const [searchTerm, setSearchTerm] = useSearchParam('search');
  const [viewParam, setViewParam] = useSearchParam('view', 'card');

  const view = viewParam as ViewMode;
  const setView = (v: ViewMode) => setViewParam(v);

  const setActiveCategory = (category: string) => {
    setActiveCategoryParam(category);
  };

  const categories = blogFilters;

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (activeCategory !== 'All Posts') {
      result = result.filter(p => p.category === activeCategory || (activeCategory === "Travel" && p.category === "Travel/Lifestyle"));
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
    setActiveCategory,
    view,
    setView,
    searchTerm,
    setSearchTerm,
    tagColors
  };
}
