import { useMemo } from "react";
import { getResources } from '@/lib/content';

import { useQuery } from '@tanstack/react-query';
import { useSearchParam } from '@/hooks/useSearchParam';
import { safeSearch } from '@/lib/utils';
import { ViewMode } from '@/components/ui/ViewToggle';

export function useToolbox() {
  const { data: resources = [] } = useQuery({
    queryKey: ['resources'],
    queryFn: getResources,
    initialData: getResources,
  });
  const [searchTerm, setSearchTerm] = useSearchParam('search');
  const [viewParam, setViewParam] = useSearchParam('view', 'card');
  const [selectedPill, setSelectedPill] = useSearchParam('pill', 'all');

  const view = viewParam as ViewMode;
  const setView = (v: ViewMode) => setViewParam(v);

  const categories = [
    { id: 'dance', label: 'Row 1: Dance Equipment', description: 'Technical reviews of competitive social dance footwear and accessories.' },
    { id: 'fashion', label: 'Row 2: Fashion', description: 'Bright, fun outfits selected for movement, comfort, and style on the dance floor.' },
    { id: 'travel', label: 'Row 3: Travel Related', description: 'Helpful travel gear for the convention circuit and bougie-on-a-budget travel.' }
  ];

  const groupedResources = useMemo(() => {
    let filteredResources = resources;

    // Exclude merch items from gear page - they should only be on dedicated shop page
    filteredResources = filteredResources.filter(r => !r.shopUrl);

    if (selectedPill && selectedPill !== 'all') {
      filteredResources = filteredResources.filter(resource => {
        switch (selectedPill) {
          case 'Best for travel':
            return safeSearch(resource.category, 'travel') || resource.tags?.includes('travel');
          case 'Highly recommended':
            return resource.tags?.includes('highly recommended');
          case 'Competition ready':
            return resource.tags?.includes('competition ready');
          default:
            return true;
        }
      });
    }

    return categories.map(cat => ({
      ...cat,
      items: filteredResources.filter(r => safeSearch(r.category, cat.id))
    }));
  }, [resources, selectedPill]);

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
    filteredCategories,
    view,
    setView,
    selectedPill,
    setSelectedPill
  };
}
