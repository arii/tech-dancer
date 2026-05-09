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
