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
        const cat = (resource.category || '').toLowerCase();
        const tags = (resource.tags || []).map(t => t.toLowerCase());
        const title = (resource.title || '').toLowerCase();
        const bestFor = ((resource as { bestFor?: string[] }).bestFor || []).map(b => b.toLowerCase());

        switch (selectedPill) {
          case 'Footwear & Care':
            return (
              cat.includes('dance') ||
              tags.includes('shoes') ||
              tags.includes('footwear') ||
              tags.includes('diy') ||
              tags.includes('maintenance') ||
              title.includes('shoe') ||
              title.includes('suede')
            );
          case 'Ballroom & Social':
            return (
              cat.includes('dance') ||
              tags.includes('practice') ||
              tags.includes('visibility') ||
              tags.includes('accessory') ||
              title.includes('fan') ||
              title.includes('tripod')
            );
          case 'Travel & Packing':
            return (
              cat.includes('travel') ||
              cat.includes('self care') ||
              tags.includes('travel') ||
              tags.includes('packing') ||
              tags.includes('storage') ||
              bestFor.includes('carry-on') ||
              title.includes('bag') ||
              title.includes('bottle') ||
              title.includes('fanny')
            );
          case 'Theme & Costumes':
            return (
              cat.includes('fashion') ||
              tags.includes('fashion') ||
              tags.includes('halloween') ||
              tags.includes('diy') ||
              tags.includes('outdoor') ||
              tags.includes('summer') ||
              bestFor.includes('theming') ||
              title.includes('sticker') ||
              title.includes('visor') ||
              title.includes('crop')
            );
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
