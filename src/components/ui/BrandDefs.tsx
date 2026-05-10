import { useId } from 'react';

interface BrandDefsProps {
  gradientId?: string;
  filterId?: string;
}

/**
 * Shared SVG definitions for brand assets.
 * Consolidates gradients and filters to a single source.
 * Supports custom IDs with a fallback to useId for uniqueness.
 */
export function BrandDefs({ gradientId, filterId }: BrandDefsProps) {
  const generatedGradientId = useId();
  const generatedFilterId = useId();

  const finalGradientId = gradientId || `brand-grad-${generatedGradientId}`;
  const finalFilterId = filterId || `brand-glow-${generatedFilterId}`;

  return (
    <defs>
      <linearGradient id={finalGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" className="brand-stop-accent" />
        <stop offset="100%" className="brand-stop-purple" />
      </linearGradient>
      <filter id={finalFilterId} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  );
}
