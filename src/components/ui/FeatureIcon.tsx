import { ReactNode } from 'react';
import { Box } from '@/layouts/Primitives';

type FeatureType = 'traingrow' | 'travel' | 'shop' | 'data';

interface FeatureIconProps {
  type: FeatureType;
  colors: string[];
}

export function FeatureIcon({ type, colors }: FeatureIconProps) {
  const icons: Record<FeatureType, ReactNode> = {
    traingrow: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
        <path d="M12 7v14" className="opacity-40" />
      </svg>
    ),
    travel: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
      </svg>
    ),
    shop: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
        <path d="M3 6h18M16 10a4 4 0 01-8 0" />
      </svg>
    ),
    data: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    )
  };

  return (
    <Box position="relative" marginBottom={3} className="group">
      <div
        className="absolute inset-0 blur-lg opacity-40 group-hover:opacity-80 transition-opacity" // impeccable-ignore
        style={{ background: `linear-gradient(to bottom, ${colors[0]}, ${colors[1]})` }} // impeccable-ignore
      />
      <Box
        position="relative"
        padding={3}
        radius="xl"
        border
        className="border-white/10 backdrop-blur-sm bg-black/20"
        style={{ color: colors[0] }} // impeccable-ignore
      >
        {icons[type]}
      </Box>
    </Box>
  );
}
