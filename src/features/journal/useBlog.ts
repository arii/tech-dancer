import { useState, useEffect, useMemo } from 'react';
import { useSearchParam } from '@/hooks/useSearchParam';
import { getPosts, Post } from '@/lib/content';
import { safeSearch } from '@/lib/utils';

export function useBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCategory] = useSearchParam('category', 'All');
  const [searchTerm, setSearchTerm] = useSearchParam('search');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPosts(getPosts());
    setIsLoading(false);
  }, []);

  const setActiveCategory = (category: string) => {
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
  // Effect to handle loading state during filtering
  useEffect(() => {
    if (posts.length > 0) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [activeCategory, searchTerm, posts.length]);

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
    searchTerm,
    setSearchTerm,
    isLoading
  };
}
