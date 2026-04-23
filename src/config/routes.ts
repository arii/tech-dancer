import { LucideIcon, Home, BookOpen, ShoppingBag, Database, User, Send } from 'lucide-react';

/**
 * Centralized Route Configuration.
 * Single source of truth for routing, navigation labels, and sitemap structure.
 */
export interface RouteConfig {
  path: string;
  label: string;
  icon?: LucideIcon;
  description?: string;
}

export const routes: RouteConfig[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/blog', label: 'Blog Posts', icon: BookOpen },
  { path: '/gear', label: 'Gear Reviews', icon: ShoppingBag },
  { path: '/research', label: 'Data & Development Lab', icon: Database },
  { path: '/resources', label: 'Resources', icon: BookOpen },
  { path: '/about', label: 'About', icon: User },
  { path: '/contact', label: 'Contact', icon: Send },
];
