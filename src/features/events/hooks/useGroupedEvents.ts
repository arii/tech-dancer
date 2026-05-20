import { useMemo } from 'react';
import { Event } from '@/lib/types/content';

export function useGroupedEvents(events: Event[]) {
  const groupedEvents = useMemo(() => {
    const groups: Record<string, Event[]> = {};
    events.forEach(event => {
      const region = event.region || 'Other Regions';
      if (!groups[region]) groups[region] = [];
      groups[region].push(event);
    });
    return groups;
  }, [events]);

  const regions = useMemo(() => Object.keys(groupedEvents).sort(), [groupedEvents]);

  return {
    groupedEvents,
    regions
  };
}
