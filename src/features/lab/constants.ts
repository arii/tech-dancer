import { PenTool, Calendar, Package } from 'lucide-react';
import { ContentType } from './useBlogDrafter';

export const types: { id: ContentType; label: string; icon: React.ElementType }[] = [
  { id: 'post', label: 'BLOG POST', icon: PenTool },
  { id: 'event', label: 'EVENT', icon: Calendar },
  { id: 'resource', label: 'RESOURCE', icon: Package },
];

export const EVENT_TYPES = [
  "WSDC Registry Event",
  "Local Event",
  "Workshop"
] as const;
