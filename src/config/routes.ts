import { LucideIcon, Home, BookOpen, ShoppingBag, Database, User, Send } from 'lucide-react';
import { RouteObject } from 'react-router-dom';

/**
 * Centralized Route Configuration.
 * Single source of truth for routing, navigation labels, and sitemap structure.
 * Extends React Router's RouteObject to include navigation metadata.
 */
export interface RouteConfig extends Omit<RouteObject, 'children'> {
  path: string;
  label?: string;
  icon?: LucideIcon;
  description?: string;
  children?: RouteConfig[];
}

export const routes: RouteConfig[] = [
<<<<<<< HEAD
  {
    path: '/',
    index: true,
    lazy: () => import('@/pages/Home').then(m => ({ Component: m.default })),
    label: 'Home',
    icon: Home
  },
  {
    path: '/blog',
    lazy: () => import('@/pages/Blog').then(m => ({ Component: m.default })),
    label: 'Blog Posts',
    icon: BookOpen
  },
  {
    path: '/blog/:slug',
    lazy: () => import('@/pages/BlogPost').then(m => ({ Component: m.default }))
  },
  {
    path: '/gear',
    lazy: () => import('@/pages/Gear').then(m => ({ Component: m.default })),
    label: 'Gear Reviews',
    icon: ShoppingBag
  },
  {
    path: '/gear/:slug',
    lazy: () => import('@/features/lab/GearPost').then(m => ({ Component: m.default }))
  },
  {
    path: '/research',
    lazy: () => import('@/pages/Research').then(m => ({ Component: m.default })),
    label: 'Data & Development Lab',
    icon: Database
  },
  {
    path: '/research/:id',
    lazy: () => import('@/pages/ResearchDetail').then(m => ({ Component: m.default }))
  },
  {
    path: '/ux-auditor',
    lazy: () => import('@/pages/UXAuditor').then(m => ({ Component: m.default }))
  },
  {
    path: '/about',
    lazy: () => import('@/pages/About').then(m => ({ Component: m.default })),
    label: 'About',
    icon: User
  },
  {
    path: '/contact',
    lazy: () => import('@/pages/Contact').then(m => ({ Component: m.default })),
    label: 'Contact',
    icon: Send
  },
  {
    path: '*',
    lazy: () => import('@/pages/Home').then(m => ({ Component: m.default }))
  },
=======
  { path: '/', label: 'Home', icon: Home },
  { path: '/blog', label: 'Blog Posts', icon: BookOpen },
  { path: '/gear', label: 'Gear Reviews', icon: ShoppingBag },
  { path: '/research', label: 'Data & Development Lab', icon: Database },
  { path: '/ux-auditor', label: 'Visual UX Auditor', icon: Database },
  { path: '/about', label: 'About', icon: User },
  { path: '/contact', label: 'Contact', icon: Send },
>>>>>>> 851d022 (chore: automate dynamic routes and optimize PR review manager)
];
