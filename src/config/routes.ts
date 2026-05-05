import { Home, BookOpen, ShoppingBag, Database, User, Send } from 'lucide-react';
import { RouteConfig } from '@/lib/types/routes';


export const routes: RouteConfig[] = [
  {
    path: '/',
    index: true,
    lazy: () => import('@/pages/Home').then(m => ({ Component: m.default })),
    label: 'Home',
    icon: Home,
    skeleton: 'grid'
  },
  {
    path: '/blog',
    lazy: () => import('@/pages/Blog').then(m => ({ Component: m.default })),
    label: 'Blog Posts',
    icon: BookOpen,
    skeleton: 'grid'
  },
  {
    path: '/blog/:slug',
    lazy: () => import('@/pages/BlogPost').then(m => ({ Component: m.default })),
    skeleton: 'post'
  },
  {
    path: '/gear',
    lazy: () => import('@/pages/Gear').then(m => ({ Component: m.default })),
    label: 'Gear Reviews',
    icon: ShoppingBag,
    skeleton: 'grid'
  },
  {
    path: '/gear/:slug',
    lazy: () => import('@/features/lab/GearPost').then(m => ({ Component: m.default })),
    skeleton: 'post'
  },
  {
    path: '/research',
    lazy: () => import('@/pages/Research').then(m => ({ Component: m.default })),
    label: 'Data & Development Lab',
    icon: Database,
    skeleton: 'grid'
  },
  {
    path: '/research/:id',
    lazy: () => import('@/pages/ResearchDetail').then(m => ({ Component: m.default })),
    skeleton: 'post'
  },
  {
    path: '/ux-auditor',
    lazy: () => import('@/pages/UXAuditor').then(m => ({ Component: m.default })),
    skeleton: 'grid'
  },
  {
    path: '/about',
    lazy: () => import('@/pages/About').then(m => ({ Component: m.default })),
    label: 'About',
    icon: User,
    skeleton: 'simple'
  },
  {
    path: '/contact',
    lazy: () => import('@/pages/Contact').then(m => ({ Component: m.default })),
    label: 'Contact',
    icon: Send,
    skeleton: 'simple'
  },
  {
    path: '*',
    lazy: () => import('@/pages/NotFound').then(m => ({ Component: m.default })),
    skeleton: 'simple'
  },
];

