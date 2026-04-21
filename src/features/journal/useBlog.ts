import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPosts, Post } from '@/lib/content';
import { safeSearch } from '@/lib/utils';
import { ViewMode } from '@/components/ui/ViewToggle';

export function useBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  const view = (searchParams.get('view') as ViewMode) || 'card';
  const [searchTerm, setSearchTerm] = useState<string>('');
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
    }
    setSearchParams(searchParams);
  };

  const setView = (v: ViewMode) => {
    searchParams.set('view', v);
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
    view,
    setView,
    searchTerm,
    setSearchTerm,
    isLoading
  };
}
