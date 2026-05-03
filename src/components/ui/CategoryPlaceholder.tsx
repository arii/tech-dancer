import React from 'react';
import { Cpu, Globe, Camera, Heart, HelpCircle, LucideIcon } from 'lucide-react';
import { Box } from '@/layouts/Primitives';

export function getCategoryIcon(category: string): LucideIcon {
  const norm = (category || '').toLowerCase();
  if (norm.includes('tech')) return Cpu;
  if (norm.includes('travel') || norm.includes('wcs')) return Globe;
  if (norm.includes('gear')) return Camera;
  if (norm.includes('lifestyle')) return Heart;
  return HelpCircle;
}

interface CategoryPlaceholderProps {
  category: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CategoryPlaceholder({ category, size = 'lg', className }: CategoryPlaceholderProps) {
  const norm = (category || '').toLowerCase();

  let surfaceClass: "brand" | "accent" | "warning" | "danger" | "muted" = 'muted';

  if (norm.includes('tech')) surfaceClass = 'brand';
  else if (norm.includes('travel') || norm.includes('wcs')) surfaceClass = 'accent';
  else if (norm.includes('gear')) surfaceClass = 'warning';
  else if (norm.includes('lifestyle')) surfaceClass = 'danger';

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-24 h-24 opacity-10'
  };

  const icon = getCategoryIcon(category);

  return (
    <Box surface={surfaceClass} width="full" height="full" display="flex" align="center" justify="center" className={`bg-[#050816] ${className || ''}`}>
      <Box className="flex items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accent shadow-[0_0_18px_rgba(0,229,255,.12)] p-4">
        {React.createElement(icon, { className: sizeClasses[size], strokeWidth: 1.5 })}
      </Box>
    </Box>
  );
}
