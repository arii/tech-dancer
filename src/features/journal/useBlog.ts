import { useMemo } from "react";

import { useQuery } from '@tanstack/react-query';
import { useSearchParam } from '@/hooks/useSearchParam';
import { getPosts } from '@/lib/content';
import { safeSearch } from '@/lib/utils';
import { ViewMode } from '@/components/ui/ViewToggle';

export function useBlog() {
  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialData: getPosts,
  });
  const [activeCategory] = useSearchParam('category', 'All');
  const [searchTerm, setSearchTerm] = useSearchParam('search');
  const [viewParam, setViewParam] = useSearchParam('view', 'card');

  const view = viewParam as ViewMode;
  const setView = (v: ViewMode) => setViewParam(v);

  const categories = useMemo(() => {
    const cats = posts.map(p => p.category);
    return ['All', ...new Set(cats)];
  }, [posts]);

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

  const featuredPost = useMemo(() => {
    // Logic: First post marked as featured, or just the first post
    return posts.find(p => p.tags?.includes('featured')) || posts[0];
  }, [posts]);

  const popularPosts = useMemo(() => {
    const featuredSlug = featuredPost?.slug;
    const popular = posts.filter(p => p.tags?.includes('popular') && p.slug !== featuredSlug);
    if (popular.length > 0) return popular.slice(0, 3);
    return posts.filter(p => p.slug !== featuredSlug).slice(0, 3);
  }, [posts, featuredPost?.slug]);

  const latestPosts = useMemo(() => {
    const featuredSlug = featuredPost?.slug;
    if (activeCategory === 'All' && !searchTerm) {
      return filteredPosts.filter(p => p.slug !== featuredSlug);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost?.slug, activeCategory, searchTerm]);

  return {
    posts: filteredPosts,
    categories,
    activeCategory,
    view,
    setView,
    searchTerm,
    setSearchTerm,
    featuredPost,
    popularPosts,
    latestPosts
  };
}
