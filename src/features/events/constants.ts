import { Palette, Briefcase, Bell, Plane, FileText, CalendarDays } from 'lucide-react';

export const EVENT_TABS = [
  { id: 'theme', label: 'Overview/Theme', icon: Palette },
  { id: 'gear', label: 'Gear', icon: Briefcase },
  { id: 'reminders', label: 'Reminders', icon: Bell },
  { id: 'travel', label: 'Travel', icon: Plane },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'related', label: 'Related Events', icon: CalendarDays },
] as const;

export const SECTION_SPACING = "section-spacing";
