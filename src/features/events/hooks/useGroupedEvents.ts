import { useMemo } from 'react';
import { Event } from '@/lib/types/content';
import { groupEventsByRegion } from '../utils/events';

export function useGroupedEvents(events: Event[]) {
  return useMemo(() => groupEventsByRegion(events), [events]);
}
