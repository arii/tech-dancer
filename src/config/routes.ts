<<<<<<< HEAD
=======
import { LucideIcon, Home, BookOpen, ShoppingBag, Database, User, Send } from 'lucide-react';
import { RouteObject } from 'react-router-dom';

>>>>>>> main
/**
 * Centralized Route Configuration.
 * Single source of truth for routing, navigation labels, and sitemap structure.
 * Extends React Router's RouteObject to include navigation metadata.
 */
export interface RouteConfig extends Omit<RouteObject, 'children'> {
  path: string;
<<<<<<< HEAD
  label: string;
  icon?: string; // We'll map these to Lucide icons
=======
  label?: string;
  icon?: LucideIcon;
>>>>>>> main
  description?: string;
  children?: RouteConfig[];
}

export const routes: RouteConfig[] = [
<<<<<<< HEAD
  { path: '/', label: 'Home' },
  { path: '/blog', label: 'Blog Posts' },
  { path: '/gear', label: 'Gear Reviews' },
  { path: '/research', label: 'Data & Development Lab' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
=======
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
>>>>>>> main
];
