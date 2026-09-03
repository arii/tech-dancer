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

  const pillKeywordsMap: Record<string, string[]> = {
    footwear: ['shoes', 'footwear', 'suede', 'maintenance', 'dance'],
    social: ['social', 'ballroom', 'safety', 'recovery', 'health', 'practice', 'music', 'outdoor', 'summer'],
    travel: ['travel', 'packing', 'storage', 'electronics'],
    theme: ['theme', 'costume', 'halloween', 'glow', 'galactic', 'nerd-night', 'fashion', 'visibility'],
  };

  const groupedResources = useMemo(() => {
    let filteredResources = resources;

    // Exclude merch items from gear page - they should only be on dedicated shop page
    filteredResources = filteredResources.filter(r => !r.shopUrl);

    if (selectedPill && selectedPill !== 'all') {
      const keywords = pillKeywordsMap[selectedPill] || [];
      filteredResources = filteredResources.filter(resource => {
        return keywords.some(kw =>
          safeSearch(resource.category, kw) ||
          safeSearch(resource.tags, kw) ||
          safeSearch(resource.title, kw) ||
          safeSearch(resource.excerpt, kw) ||
          safeSearch(resource.description, kw)
        );
      });
    }

    return [
      {
        id: 'gear',
        label: 'All Gear Reviews',
        description: 'Rigorous testing and honest takes on dance gear.',
        items: filteredResources,
      },
    ];
  }, [resources, selectedPill]);

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return groupedResources;
    return groupedResources.map(cat => ({
      ...cat,
      items: cat.items.filter(item =>
        safeSearch(item.title, searchTerm) ||
        safeSearch(item.category, searchTerm) ||
        safeSearch(item.excerpt, searchTerm) ||
        safeSearch(item.tags, searchTerm) ||
        safeSearch(item.description, searchTerm)
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
