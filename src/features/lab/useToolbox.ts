import { getResources, Resource } from '@/lib/content';
import { useMemo, useState } from 'react';
import { safeSearch } from '@/lib/utils';

export function useToolbox() {
  const resources = getResources();
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'dance', label: 'Row 1: Dance Equipment', description: 'Technical reviews of competitive social dance footwear and accessories.' },
    { id: 'fashion', label: 'Row 2: Fashion', description: 'Bright, fun outfits curated for movement, comfort, and style on the dance floor.' },
    { id: 'travel', label: 'Row 3: Travel Related', description: 'Optimized logistics gear for the convention circuit and bougie-on-a-budget travel.' }
  ];

  const groupedResources = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      items: [...resources]
        .filter(r => safeSearch(r.category, cat.id))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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

  return {
    searchTerm,
    setSearchTerm,
    filteredCategories
  };
}
