import { useMemo } from "react";
import { getResources } from '@/lib/content';

import { useQuery } from '@tanstack/react-query';
import { useSearchParam } from '@/hooks/useSearchParam';
import { safeSearch } from '@/lib/utils';
import { ViewMode } from '@/components/ui/ViewToggle';
import type { Resource } from '@/lib/content';

type ResourceCategory = {
  id: string;
  label: string;
  description: string;
};

export function useToolbox() {
  const { data: resources = [] } = useQuery({
    queryKey: ['resources'],
    queryFn: getResources,
  });
  const [searchTerm, setSearchTerm] = useSearchParam('search');
  const [viewParam, setViewParam] = useSearchParam('view', 'card');

  const view = viewParam as ViewMode;
  const setView = (v: ViewMode) => setViewParam(v);

  const categories: ResourceCategory[] = [
    { id: 'dance', label: 'Row 1: Dance Equipment', description: 'Technical reviews of competitive social dance footwear and accessories.' },
    { id: 'fashion', label: 'Row 2: Fashion', description: 'Bright, fun outfits curated for movement, comfort, and style on the dance floor.' },
    { id: 'travel', label: 'Row 3: Travel Related', description: 'Optimized logistics gear for the convention circuit and bougie-on-a-budget travel.' }
  ];

  const groupedResources = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      items: resources.filter((r: Resource) => safeSearch(r.category, cat.id))
    }));
  }, [resources]);

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return groupedResources;
    return groupedResources.map(cat => ({
      ...cat,
      items: cat.items.filter((item: Resource) =>
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
    setView
  };
}
