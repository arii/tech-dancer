import { useState, useEffect, useMemo } from 'react';
import { useSearchParam } from '@/hooks/useSearchParam';
import { getPosts, Post } from '@/lib/content';
import { safeSearch } from '@/lib/utils';

export function useBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useSearchParam('category', 'All');
  const [searchTerm, setSearchTerm] = useSearchParam('search');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPosts(getPosts());
    setIsLoading(false);
  }, []);

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

  return {
    posts: filteredPosts,
    categories,
    activeCategory,
    setActiveCategory,
    searchTerm,
    setSearchTerm,
    isLoading
  };
}
