import { Cpu, Globe, Camera, Heart, HelpCircle, LucideIcon } from 'lucide-react';
import { Box } from '@/layouts/Primitives';

interface CategoryPlaceholderProps {
  category: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CategoryPlaceholder({ category, size = 'lg' }: CategoryPlaceholderProps) {
  const norm = (category || '').toLowerCase();

  let Icon: LucideIcon = HelpCircle;
  let surfaceClass: "brand" | "accent" | "warning" | "danger" | "muted" = 'muted';

  if (norm.includes('tech')) {
    Icon = Cpu;
    surfaceClass = 'brand'; // Tech Portfolio
  } else if (norm.includes('travel') || norm.includes('wcs')) {
    Icon = Globe;
    surfaceClass = 'accent'; // Travel
  } else if (norm.includes('gear')) {
    Icon = Camera;
    surfaceClass = 'warning'; // Dance Gear
  } else if (norm.includes('lifestyle')) {
    Icon = Heart;
    surfaceClass = 'danger';
  }

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-16 h-16 opacity-50'
  };

  return (
    <Box surface={surfaceClass} className="w-full h-full flex items-center justify-center">
      <Icon className={sizeClasses[size]} strokeWidth={1.5} />
    </Box>
  );
}
