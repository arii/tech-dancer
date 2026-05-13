import { Info, Clock, MapPin, Palette, Briefcase, Layers } from 'lucide-react';

export const EVENT_TABS = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'schedule', label: 'Schedule', icon: Clock },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'theme', label: 'Theme', icon: Palette },
  { id: 'gear', label: 'Gear', icon: Briefcase },
  { id: 'related', label: 'Related', icon: Layers },
] as const;

export const SECTION_SPACING = "section-spacing";
