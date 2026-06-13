import { Home, BookOpen, ShoppingBag, Database, User, Send, Calendar, Tag } from 'lucide-react';
import { redirect } from 'react-router-dom';
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
    isMobileVisible: true,
    isTopNav: true
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
    skeleton: 'grid',
    isMobileVisible: true,
    isTopNav: true
  },
  {
    path: '/gear/:slug',
    lazy: () => import('@/features/lab/GearPost').then(m => ({ Component: m.default })),
    skeleton: 'post'
  },
  {
    path: '/events',
    lazy: () => import('@/features/events/EventsFeed').then(m => ({ Component: m.default })),
    label: 'Event Guides',
    icon: Calendar,
    skeleton: 'grid',
    isMobileVisible: true,
    isTopNav: true
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
    isMobileVisible: true,
    isTopNav: true
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
    path: '/merch',
    lazy: () => import('@/pages/Merch').then(m => ({ Component: m.default })),
    label: 'Merch',
    icon: Tag,
    skeleton: 'grid',
    isMobileVisible: true,
    isTopNav: true
  },
  {
    path: '/about',
    lazy: () => import('@/pages/About').then(m => ({ Component: m.default })),
    label: 'About',
    icon: User,
    skeleton: 'simple',
    isTopNav: true
  },
  {
    path: '/privacy',
    lazy: () => import('@/pages/Privacy').then(m => ({ Component: m.default })),
    skeleton: 'simple'
  },
  {
    path: '/terms',
    lazy: () => import('@/pages/Terms').then(m => ({ Component: m.default })),
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
    path: '/subscribe',
    lazy: () => import('@/pages/Contact').then(m => ({ Component: m.default })),
    skeleton: 'simple'
  },
  {
    path: '/preview',
    lazy: () => import('@/pages/ComponentPreview').then(m => ({ Component: m.default })),
    skeleton: 'grid',
    sitemap: false,
    stub: true,
    loader: () => {
      // Safe environment check that works in Node and Browser
      const isProd = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.PROD : process.env.NODE_ENV === 'production';
      if (isProd) {
        throw redirect('/');
      }
      return null;
    }
  },
  {
    path: '/previews',
    Component: () => {
      const base = (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.BASE_URL : '/') || '/';
      const cleanBase = base.endsWith('/') ? base : base + '/';
      window.location.replace(cleanBase + 'previews/index.html');
      return null;
    },
    sitemap: false,
    stub: false
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

export const TOP_NAV_ROUTES = routes.filter(
  (r): r is RouteConfig & { label: string } => !!(r.label && r.isTopNav)
);
