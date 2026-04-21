/**
 * Centralized Route Configuration.
 * Single source of truth for routing, navigation labels, and sitemap structure.
 */
export interface RouteConfig {
  path: string;
  label: string;
  icon?: string; // We'll map these to Lucide icons
  description?: string;
}

export const routes: RouteConfig[] = [
  { path: '/', label: 'Home' },
  { path: '/blog', label: 'Blog Posts' },
  { path: '/gear', label: 'Gear Reviews' },
  { path: '/research', label: 'Data & Development Lab' },
  { path: '/ux-auditor', label: 'UX Auditor' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];
