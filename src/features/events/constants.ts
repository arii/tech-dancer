import { Info, Clock, MapPin, Palette, Briefcase, Bell } from 'lucide-react';
import { Palette, Briefcase, Bell, Plane, FileText } from 'lucide-react';

export const EVENT_TABS = [
  { id: 'theme', label: 'Theme', icon: Palette },
  { id: 'gear', label: 'Gear', icon: Briefcase },
  { id: 'reminders', label: 'Reminders', icon: Bell },
  { id: 'travel', label: 'Travel', icon: Plane },
  { id: 'notes', label: 'Notes', icon: FileText },
] as const;

export const SECTION_SPACING = "section-spacing";
