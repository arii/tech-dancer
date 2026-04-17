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
  { path: '/engine', label: 'Dance Analytics' },
  { path: '/blog', label: 'Blog' },
  { path: '/feed', label: 'Resources' },
  { path: '/systems', label: 'Systems' },
  { path: '/about', label: 'About Ariel' },
  { path: '/contact', label: 'Contact' },
];
