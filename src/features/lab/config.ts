import { PenTool, Calendar, Package } from 'lucide-react';
import { ContentType } from './useBlogDrafter';

export const types = [
  { id: 'post' as ContentType, label: 'BLOG POST', icon: PenTool },
] as const;
