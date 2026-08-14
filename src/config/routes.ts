import { Home, BookOpen, Database, User, Tag, ShieldCheck, Laugh } from 'lucide-react';
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
  ...['/gear', '/gear/:slug', '/events', '/events/:slug'].map(path => ({
    path,
    lazy: () => import('@/pages/RemovedPage').then(m => ({ Component: m.default })),
    skeleton: 'simple' as const,
    sitemap: false
  })),
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
    path: '/memes',
    lazy: () => import('@/pages/Memes').then(m => ({ Component: m.default })),
    label: 'Memes',
    icon: Laugh,
    skeleton: 'grid',
    isTopNav: true,
    isMobileVisible: true
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
    path: '/versiontruth',
    lazy: () => import('@/pages/VersionTruth').then(m => ({ Component: m.default })),
    label: 'VersionTruth',
    icon: ShieldCheck,
    skeleton: 'simple'
  },
  {
    path: '/ux-auditor',
    lazy: () => import('@/pages/UXAuditor').then(m => ({ Component: m.default })),
    skeleton: 'grid'
  },
  {
    path: '/preview',
    lazy: () => import('@/pages/ComponentPreview').then(m => ({ Component: m.default })),
    skeleton: 'grid',
    sitemap: false
  },
  {
    path: '/previews',
    Component: () => {
      const base = import.meta.env.BASE_URL || '/';
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
