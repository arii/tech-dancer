import { PenTool, Calendar, Package } from 'lucide-react';
import { ContentType } from './useBlogDrafter';

export const types = [
  { id: 'post' as ContentType, label: 'BLOG POST', icon: PenTool },
  { id: 'event' as ContentType, label: 'EVENT', icon: Calendar },
  { id: 'resource' as ContentType, label: 'RESOURCE', icon: Package },
] as const;

export const EVENT_TYPES = [
  "WSDC Registry Event",
  "Local Event",
  "Workshop"
] as const;

export const GEAR_PILLS = [
  { label: "Best for travel", value: "Best for travel", color: "text-accent border-accent/30 bg-accent/10" },
  { label: "Highly recommended", value: "Highly recommended", color: "text-accent-navy border-accent-navy/30 bg-accent-navy/10" },
  { label: "Competition ready", value: "Competition ready", color: "text-error border-error/30 bg-error/10" }
] as const;
