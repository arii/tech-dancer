import { Home, BookOpen, ShoppingBag, Database, User, Send, Calendar } from 'lucide-react';
import { RouteConfig } from '@/lib/types/routes';

import { LucideIcon } from 'lucide-react';

export const routes: RouteConfig[] = [
  {
    path: '/',
    index: true,
    lazy: () => import('@/pages/Home').then(m => ({ Component: m.default })),
    label: 'Home',
    icon: Home,
    skeleton: 'grid',
    isMobileVisible: true
  },
  {
    path: '/blog',
    lazy: () => import('@/pages/Blog').then(m => ({ Component: m.default })),
    label: 'Blog Posts',
    icon: BookOpen,
    skeleton: 'grid',
    isMobileVisible: true
  },
  {
    path: '/blog/:slug',
    lazy: () => import('@/pages/BlogPost').then(m => ({ Component: m.default })),
    skeleton: 'post'
  },
  {
    path: '/merch',
    lazy: () => import('@/pages/Merch').then(m => ({ Component: m.default })),
    label: 'Merch',
    icon: ShoppingBag,
    skeleton: 'grid',
    isMobileVisible: true
  },
  {
    path: '/merch/:slug',
    lazy: () => import('@/features/shop/ShopPost').then(m => ({ Component: m.default })),
    skeleton: 'post'
  },
  {
    path: '/gear',
    lazy: () => import('@/pages/Gear').then(m => ({ Component: m.default })),
    label: 'Gear Reviews',
    icon: ShoppingBag,
    skeleton: 'grid',
    isMobileVisible: true
  },
  {
    path: '/gear/:slug',
    lazy: () => import('@/features/lab/GearPost').then(m => ({ Component: m.default })),
    skeleton: 'post'
  },
  {
    path: '/events',
    lazy: () => import('@/features/events/EventsFeed').then(m => ({ Component: m.default })),
    label: 'Event Resource Guides',
    icon: Calendar,
    skeleton: 'grid',
    isMobileVisible: true
  },
  {
    path: '/events/:slug',
    lazy: () => import('@/features/events/EventGuide').then(m => ({ Component: m.default })),
    skeleton: 'post'
  },
  {
    path: '/research',
    lazy: () => import('@/pages/Research').then(m => ({ Component: m.default })),
    label: 'DevAI Portfolio',
    icon: Database,
    skeleton: 'grid',
    isMobileVisible: true
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
    path: '/preview',
    lazy: () => import('@/pages/ComponentPreview').then(m => ({ Component: m.default })),
    skeleton: 'grid',
    sitemap: false
  },
  {
    path: '*',
    lazy: () => import('@/pages/NotFound').then(m => ({ Component: m.default })),
    skeleton: 'simple'
  },
];

export const MOBILE_NAV_ROUTES = routes.filter((r): r is RouteConfig & { label: string, icon: LucideIcon } =>
  !!(r.label && r.icon && r.isMobileVisible)
);
