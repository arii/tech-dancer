import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPosts, Post } from '@/lib/content';

export function useBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate a brief loading state to show the skeleton and avoid jump
    const timer = setTimeout(() => {
      setPosts(getPosts());
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const setActiveCategory = (category: string) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

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
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.excerpt.toLowerCase().includes(term)
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
