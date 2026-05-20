import { Palette, Briefcase, Bell, Plane, FileText } from 'lucide-react';

export const EVENT_TABS = [
  { id: 'theme', label: 'Theme', icon: Palette },
  { id: 'gear', label: 'Gear', icon: Briefcase },
  { id: 'reminders', label: 'Reminders', icon: Bell },
  { id: 'travel', label: 'Travel', icon: Plane },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'related', label: 'Related', icon: Briefcase },
] as const;

export type EventSectionId = (typeof EVENT_TABS)[number]['id'];

interface EventSectionVisibility {
  hasTheme: boolean;
  hasGear: boolean;
  hasRelated: boolean;
}

export function getVisibleEventSectionIds({ hasTheme, hasGear, hasRelated }: EventSectionVisibility): EventSectionId[] {
  return [
    hasTheme ? 'theme' : null,
    hasGear ? 'gear' : null,
    'reminders',
    'travel',
    'notes',
    hasRelated ? 'related' : null,
  ].filter((value): value is EventSectionId => Boolean(value));
}

export const SECTION_SPACING = "section-spacing";
