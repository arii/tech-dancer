import { Info, Clock, MapPin, Palette, Briefcase } from 'lucide-react';
import { Event } from '@/lib/content';

export const EVENT_TABS = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'schedule', label: 'Schedule', icon: Clock },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'theme', label: 'Theme', icon: Palette },
  { id: 'gear', label: 'Gear', icon: Briefcase },
] as const;

export const SECTION_SPACING = "section-spacing";

export type CuratedGearCategory = {
  id: keyof NonNullable<Event['curatedGear']>;
  label: string;
};

export const GEAR_CATEGORIES: CuratedGearCategory[] = [
  { id: 'outfits', label: 'Outfits' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'shoes', label: 'Shoes' },
  { id: 'essentials', label: 'Essentials' },
  { id: 'travel', label: 'Travel' },
];
