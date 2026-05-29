import { useState, useEffect } from 'react';

const STORAGE_KEY = 'boomtick-blog-draft';
const HISTORY_KEY = 'boomtick-blog-history';

export interface BlogDraft {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  lastUpdated: number;
}

export function useBlogDrafter() {
  const [draft, setDraft] = useState<BlogDraft>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      title: '',
      excerpt: '',
      content: '',
      category: 'Lifestyle',
      tags: [],
      lastUpdated: Date.now()
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [draft]);

  const updateDraft = (updates: Partial<BlogDraft>) => {
    setDraft(prev => ({
      ...prev,
      ...updates,
      lastUpdated: Date.now()
    }));
  };

  const saveToHistory = () => {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    localStorage.setItem(HISTORY_KEY, JSON.stringify([draft, ...history].slice(0, 10)));
  };

  const clearDraft = () => {
    const fresh = {
      title: '',
      excerpt: '',
      content: '',
      category: 'Lifestyle',
      tags: [],
      lastUpdated: Date.now()
    };
    setDraft(fresh);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    draft,
    updateDraft,
    saveToHistory,
    clearDraft
  };
}
