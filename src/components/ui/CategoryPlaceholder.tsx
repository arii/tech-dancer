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
}

export function CategoryPlaceholder({ category, size = 'lg' }: CategoryPlaceholderProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-24 h-24 opacity-10'
  };

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
      {React.createElement(icon, { 
        className: sizeClasses[size], 
        strokeWidth: 2 
      })}
    </Box>
  );
}
