import { Home, BookOpen, Database, User, Tag, ShieldCheck, Shirt, Laugh, Compass, Briefcase } from 'lucide-react';
import { RouteConfig } from '@/lib/types/routes';

import { LucideIcon } from 'lucide-react';
import { lazyWithRetry } from '../lib/lazyWithRetry';

export const routes: RouteConfig[] = [
  {
    path: '/',
    index: true,
    lazy: lazyWithRetry(() => import('@/pages/Home').then(m => ({ Component: m.default }))),
    label: 'Home',
    icon: Home,
    skeleton: 'grid',
    isMobileVisible: true
  },
  {
    path: '/blog',
    lazy: lazyWithRetry(() => import('@/pages/Blog').then(m => ({ Component: m.default }))),
    label: 'Blog Posts',
    icon: BookOpen,
    skeleton: 'grid',
    isMobileVisible: true,
    isTopNav: true
  },
  {
    path: '/blog/:slug',
    lazy: lazyWithRetry(() => import('@/pages/BlogPost').then(m => ({ Component: m.default }))),
    skeleton: 'post'
  },
  {
    path: '/gear',
    lazy: lazyWithRetry(() => import('@/pages/Gear').then(m => ({ Component: m.default }))),
    label: 'Gear',
    icon: Shirt,
    skeleton: 'grid',
    isMobileVisible: true,
    isTopNav: true
  },
  {
    path: '/gear/:slug',
    lazy: lazyWithRetry(() => import('@/features/lab/GearPost').then(m => ({ Component: m.default }))),
    skeleton: 'post'
  },
  ...['/events', '/events/:slug'].map(path => ({
    path,
    lazy: lazyWithRetry(() => import('@/pages/RemovedPage').then(m => ({ Component: m.default }))),
    skeleton: 'simple' as const,
    sitemap: false
  })),
  {
    path: '/merch',
    lazy: lazyWithRetry(() => import('@/pages/Merch').then(m => ({ Component: m.default }))),
    label: 'Merch',
    icon: Tag,
    skeleton: 'grid',
    isMobileVisible: true,
    isTopNav: true
  },
  {
    path: '/services',
    lazy: lazyWithRetry(() => import('@/pages/Services').then(m => ({ Component: m.default }))),
    label: 'Services',
    icon: Briefcase,
    skeleton: 'simple',
    isMobileVisible: true,
    isTopNav: true
  },
  {
    path: '/about',
    lazy: lazyWithRetry(() => import('@/pages/About').then(m => ({ Component: m.default }))),
    label: 'About',
    icon: User,
    skeleton: 'simple',
    isTopNav: true
  },
  {
    path: '/shipping',
    lazy: lazyWithRetry(() => import('@/pages/ShippingPolicy').then(m => ({ Component: m.default }))),
    label: 'Shipping Policy',
    skeleton: 'simple',
    sitemap: true
  },
  {
    path: '/return-policy',
    lazy: lazyWithRetry(() => import('@/pages/ReturnPolicy').then(m => ({ Component: m.default }))),
    label: 'Return Policy',
    skeleton: 'simple',
    sitemap: true
  },
  {
    path: '/memes',
    lazy: lazyWithRetry(() => import('@/pages/Memes').then(m => ({ Component: m.default }))),
    label: 'Memes',
    icon: Laugh,
    skeleton: 'grid',
    sitemap: false
  },
  {
    path: '/research',
    lazy: lazyWithRetry(() => import('@/pages/Research').then(m => ({ Component: m.default }))),
    label: 'Experiments',
    icon: Database,
    skeleton: 'grid',
    isMobileVisible: true,
    isTopNav: true
  },
  {
    path: '/research/wcs-navigator',
    lazy: lazyWithRetry(() => import('@/pages/WCSNavigator').then(m => ({ Component: m.default }))),
    label: 'WCS Navigator',
    icon: Compass,
    skeleton: 'grid',
    isTopNav: false,
    sitemap: true
  },
  {
    path: '/wcs-navigator',
    lazy: lazyWithRetry(() => import('@/pages/WCSNavigator').then(m => ({ Component: m.default }))),
    skeleton: 'grid',
    sitemap: false
  },
  {
    path: '/research/:id',
    lazy: lazyWithRetry(() => import('@/pages/ResearchDetail').then(m => ({ Component: m.default }))),
    skeleton: 'post'
  },
  {
    path: '/versiontruth',
    lazy: lazyWithRetry(() => import('@/pages/VersionTruth').then(m => ({ Component: m.default }))),
    label: 'VersionTruth',
    icon: ShieldCheck,
    skeleton: 'simple'
  },
  {
    path: '/ux-auditor',
    lazy: lazyWithRetry(() => import('@/pages/UXAuditor').then(m => ({ Component: m.default }))),
    skeleton: 'grid'
  },
  {
    path: '/preview',
    lazy: lazyWithRetry(() => import('@/pages/ComponentPreview').then(m => ({ Component: m.default }))),
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
    lazy: lazyWithRetry(() => import('@/pages/NotFound').then(m => ({ Component: m.default }))),
    skeleton: 'simple'
  },
];

export const MOBILE_NAV_ROUTES = routes.filter((r): r is RouteConfig & { label: string, icon: LucideIcon } =>
  !!(r.label && r.icon && r.isMobileVisible)
);

export const TOP_NAV_ROUTES = routes.filter(
  (r): r is RouteConfig & { label: string } => !!(r.label && r.isTopNav)
);
