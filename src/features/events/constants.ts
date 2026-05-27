import { Palette, Briefcase, Bell, Plane, FileText } from 'lucide-react';

export const EVENT_TABS = [
  { id: 'theme', label: 'Theme', icon: Palette },
  { id: 'gear', label: 'Gear', icon: Briefcase },
  { id: 'reminders', label: 'Event Reminders', icon: Bell },
  { id: 'travel', label: 'Travel', icon: Plane },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'related', label: 'More Guides', icon: Briefcase },
] as const;

export const MAIN_GAP = 'space-y-12';
export const SECTION_GAP = 'space-y-5';
export const GRID_GAP = 'gap-4';
export const SIDEBAR_WIDTH = 80;
export const SECTION_SPACING = 'section-spacing';
