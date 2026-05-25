import { Palette, Briefcase, Bell, Plane, FileText } from 'lucide-react';

export const EVENT_TABS = [
  { id: 'theme', label: 'Overview/Theme', icon: Palette },
  { id: 'gear', label: 'Recommended Gear', icon: Briefcase },
  { id: 'reminders', label: 'Journey Utility', icon: Bell },
  { id: 'travel', label: 'Travel & Venue', icon: Plane },
  { id: 'notes', label: 'Pro Tips', icon: FileText },
  { id: 'related', label: 'Related Events', icon: Briefcase },
] as const;

export const SECTION_SPACING = "section-spacing";
