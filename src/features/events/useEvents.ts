import { useMemo } from "react";
import { useQuery } from '@tanstack/react-query';
import { useSearchParam } from '@/hooks/useSearchParam';
import { getEvents } from '@/lib/content';
import { safeSearch } from '@/lib/utils';
import { ViewMode } from '@/components/ui/ViewToggle';

export function useEvents() {
  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
    initialData: getEvents,
    staleTime: 3600000, // 1 hour
  });
  const [activeCategory] = useSearchParam('category', 'All');
  const [searchTerm, setSearchTerm] = useSearchParam('search');
  const [viewParam, setViewParam] = useSearchParam('view', 'card');

  const view = viewParam as ViewMode;
  const setView = (v: ViewMode) => setViewParam(v);

  const categories = useMemo(() => {
    const cats = events.map(e => e.category);
    return ['All', ...new Set(cats)];
  }, [events]);

  const filteredEvents = useMemo(() => {
    let result = events;

    if (activeCategory !== 'All') {
      result = result.filter(e => e.category === activeCategory);
    }

    if (searchTerm) {
      result = result.filter(e =>
        safeSearch(e.title, searchTerm) ||
        safeSearch(e.category, searchTerm) ||
        safeSearch(e.excerpt, searchTerm) ||
        safeSearch(e.city, searchTerm) ||
        safeSearch(e.region || '', searchTerm) ||
        safeSearch(e.location, searchTerm)
      );
    }

    return result;
  }, [events, activeCategory, searchTerm]);

  return {
    events: filteredEvents,
    categories,
    activeCategory,
    view,
    setView,
    searchTerm,
    setSearchTerm
  };
}
