import { getResources, Resource } from '@/lib/content';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { safeSearch } from '@/lib/utils';
import { ViewMode } from '@/components/ui/ViewToggle';

export function useToolbox() {
  const resources = getResources();
  const [searchParams, setSearchParams] = useSearchParams();
  const view = (searchParams.get('view') as ViewMode) || 'card';
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'dance', label: 'Row 1: Dance Equipment', description: 'Technical reviews of competitive social dance footwear and accessories.' },
    { id: 'fashion', label: 'Row 2: Fashion', description: 'Bright, fun outfits curated for movement, comfort, and style on the dance floor.' },
    { id: 'travel', label: 'Row 3: Travel Related', description: 'Optimized logistics gear for the convention circuit and bougie-on-a-budget travel.' }
  ];

  const groupedResources = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      items: resources.filter(r => safeSearch(r.category, cat.id))
    }));
  }, [resources]);

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return groupedResources;
    return groupedResources.map(cat => ({
      ...cat,
      items: cat.items.filter(item => 
        safeSearch(item.title, searchTerm) ||
        safeSearch(item.category, searchTerm) ||
        safeSearch(item.excerpt, searchTerm) ||
        safeSearch(item.tags, searchTerm)
      )
    })).filter(cat => cat.items.length > 0);
  }, [groupedResources, searchTerm]);

  const setView = (v: ViewMode) => {
    searchParams.set('view', v);
    setSearchParams(searchParams);
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredCategories,
    view,
    setView
  };
}
