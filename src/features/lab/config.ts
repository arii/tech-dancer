import { PenTool, Calendar, Package } from 'lucide-react';
import { ContentType } from './useBlogDrafter';

export const types = [
  { id: 'post' as ContentType, label: 'BLOG POST', icon: PenTool },
  { id: 'event' as ContentType, label: 'EVENT CARD', icon: Calendar },
  { id: 'resource' as ContentType, label: 'RESOURCE CARD', icon: Package },
] as const;

export const EVENT_TYPES = [
  "WSDC Registry Event",
  "Local Event",
  "Workshop"
] as const;

export const GEAR_PILLS = [
  { label: "Travel picks", value: "Best for travel" },
  { label: "Recommended", value: "Highly recommended" },
  { label: "Competition ready", value: "Competition ready" }
] as const;

export const ALL_GEAR_FILTER = { label: "All gear", value: "all" } as const;
