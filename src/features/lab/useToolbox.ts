import { getResources, Resource } from '@/lib/content';
import { useMemo, useState } from 'react';

export function useToolbox() {
  const resources = getResources();
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'dance', label: 'Dance Equipment', description: 'Technical reviews of competitive social dance footwear and accessories.' },
    { id: 'fashion', label: 'Fashion', description: 'Bright, fun outfits curated for movement, comfort, and style on the dance floor.' },
    { id: 'travel', label: 'Travel Related', description: 'Optimized logistics gear for the convention circuit and bougie-on-a-budget travel.' },
    { id: 'other', label: 'Other', description: 'Miscellaneous items that support the tech-dancer lifestyle.' }
  ];

  const groupedResources = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      items: resources.filter(r => r.category.toLowerCase().includes(cat.id))
    }));
  }, [resources]);

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return groupedResources;
    const term = searchTerm.toLowerCase();
    return groupedResources.map(cat => ({
      ...cat,
      items: cat.items.filter(item => 
        item.title.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.excerpt.toLowerCase().includes(term)
      )
    })).filter(cat => cat.items.length > 0);
  }, [groupedResources, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredCategories
  };
}
