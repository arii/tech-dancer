import { LucideIcon } from 'lucide-react';
import { RouteObject } from 'react-router-dom';
import { SkeletonVariant } from '@/lib/types/skeleton';

export interface RouteConfig extends Omit<RouteObject, 'children'> {
  path: string;
  label?: string;
  icon?: LucideIcon;
  description?: string;
  children?: RouteConfig[];
  skeleton?: SkeletonVariant;
  sitemap?: boolean;
  canonicalPath?: string;
  isMobileVisible?: boolean;
  isTopNav?: boolean;
}
