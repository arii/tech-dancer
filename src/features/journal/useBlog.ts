import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPosts, Post } from '@/lib/content';
import { safeSearch } from '@/lib/utils';

export function useBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  const searchTerm = searchParams.get('search') || '';
  const [isLoading, setIsLoading] = useState(true);

  const setSearchTerm = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    setSearchParams(params, { replace: true });
  };

  useEffect(() => {
    setIsLoading(true);
    // Simulate a brief loading state to show the skeleton and avoid jump
    const timer = setTimeout(() => {
      setPosts(getPosts());
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
