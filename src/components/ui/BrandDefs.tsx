
interface BrandDefsProps {
  gradientId: string;
  filterId: string;
  stdDeviation?: number;
}

/**
 * Shared SVG definitions for brand assets.
 * Consolidates linear gradients and filters to reduce duplication.
 */
export function BrandDefs({ gradientId, filterId, stdDeviation = 3 }: BrandDefsProps) {
  return (
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" className="brand-stop-accent" />
        <stop offset="100%" className="brand-stop-purple" />
      </linearGradient>
      <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation={stdDeviation} result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  );
}
