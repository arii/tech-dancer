import {
  Cpu,
  Globe,
  Camera,
  Heart,
  HelpCircle,
  Footprints,
  Shirt,
  Sparkles,
  Package,
  Calendar,
  Trophy,
  type LucideIcon
} from 'lucide-react';
import { Box } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';

export function getCategoryIcon(category: string): LucideIcon {
  const norm = (category || '').toLowerCase();
  if (norm.includes('tech')) return Cpu;
  if (norm.includes('travel')) return Globe;
  if (norm.includes('wcs') || norm.includes('registry')) return Calendar;
  if (norm.includes('shoe')) return Footprints;
  if (norm.includes('outfit')) return Shirt;
  if (norm.includes('accessory')) return Sparkles;
  if (norm.includes('essential')) return Package;
  if (norm.includes('competition')) return Trophy;
  if (norm.includes('gear')) return Camera;
  if (norm.includes('lifestyle')) return Heart;
  return HelpCircle;
}

interface CategoryPlaceholderProps {
  category: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CategoryPlaceholder({ category, size = 'lg' }: CategoryPlaceholderProps) {
  const sizeMap = {
    sm: 'md',
    md: 'xl',
    lg: undefined // Use custom for lg
  } as const;

  const icon = getCategoryIcon(category);

  return (
    <Box 
      width="full" 
      height="full" 
      display="flex" 
      align="center" 
      justify="center"
      className="text-accent"
    >
      <Icon
        icon={icon}
        size={sizeMap[size]}
        className={size === 'lg' ? 'w-24 h-24 opacity-10' : ''}
        strokeWidth={2}
      />
    </Box>
  );
}
