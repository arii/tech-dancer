import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPosts, Post } from '@/lib/content';
import { safeSearch } from '@/lib/utils';

export function useBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      const data = getPosts();
      if (!data) throw new Error('FAILED_TO_FETCH_JOURNAL_DATA');
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      // Small tick to ensure UI doesn't flicker too fast if data is local
      // but removed the 500ms artificial delay
      setIsLoading(false);
    }
  }, []);

  const setActiveCategory = (category: string) => {
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
    isLoading,
    error
  };
}
