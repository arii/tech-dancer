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
  { path: '/lab', label: 'Gear Reviews' },
  { path: '/feed', label: 'Travel/Lifestyle' },
  { path: '/blog', label: 'WCS Content' },
  { path: '/engine', label: 'Data & Dev Lab' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];
