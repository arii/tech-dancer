import { FileText, Plane, Palette, Briefcase, Bell } from 'lucide-react';

export const EVENT_TABS = [
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'travel', label: 'Travel', icon: Plane },
  { id: 'theme', label: 'Theme', icon: Palette },
  { id: 'gear', label: 'Gear', icon: Briefcase },
  { id: 'reminders', label: 'Reminders', icon: Bell },
] as const;

export const SECTION_SPACING = "section-spacing";
