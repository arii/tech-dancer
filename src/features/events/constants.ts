import { Palette, Briefcase, Bell, Plane, FileText } from 'lucide-react';

export const EVENT_TABS = [
  { id: 'theme', label: 'Theme Ideas', icon: Palette },
  { id: 'gear', label: 'Helpful Gear', icon: Briefcase },
  { id: 'reminders', label: 'Event Reminders', icon: Bell },
  { id: 'travel', label: 'Travel', icon: Plane },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'related', label: 'More Events', icon: Briefcase },
] as const;

export const SECTION_SPACING = "section-spacing";
