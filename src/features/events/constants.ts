import { Info, Clock, MapPin } from 'lucide-react';

export const EVENT_TABS = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'schedule', label: 'Schedule', icon: Clock },
  { id: 'location', label: 'Location', icon: MapPin },
] as const;

export const SECTION_SPACING = "section-spacing";
