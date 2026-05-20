import { Event } from '@/lib/types/content';

/**
 * Groups events by their region metadata.
 */
export function groupEventsByRegion(events: Event[]) {
  const groups: Record<string, Event[]> = {};

  events.forEach(event => {
    const region = event.region || 'Other Regions';
    if (!groups[region]) {
      groups[region] = [];
    }
    groups[region].push(event);
  });

  const regions = Object.keys(groups).sort();

  return {
    groupedEvents: groups,
    regions
  };
}
