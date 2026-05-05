import { useMemo } from 'react';
import { Home, Compass, Backpack, Beaker, Mail } from 'lucide-react';
export const primaryNavigation = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Blog', href: '/blog', icon: Compass },
  { label: 'Gear', href: '/gear', icon: Backpack },
  { label: 'Research', href: '/research', icon: Beaker },
  { label: 'Contact', href: '/contact', icon: Mail },
];

export const useSidebarData = () => useMemo(() => ({ primaryNavigation }), []);
