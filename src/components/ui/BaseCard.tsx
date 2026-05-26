import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, BaseProps } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface BaseCardProps extends BaseProps {
  children: ReactNode;
  to?: string;
  href?: string;
  rel?: string;
  ariaLabel?: string;
  className?: string;
}

/**
 * BaseCard component provides a standardized container for all card-like UI elements.
 * It handles:
 * - Consistent background, border, and radius
 * - Hover animations (lift and accent border)
 * - Stretched link pattern for accessibility and UX
 */
export function BaseCard({
  children,
  to,
  href,
  rel,
  ariaLabel,
  className,
  ...props
}: BaseCardProps) {
  const isLink = !!(to || href);

  // Standardized hover and transition classes
  const cardClasses = cn(
    "group relative transition-all duration-300",
    "bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md",
    "shadow-sm hover:shadow-md",
    isLink && "md:hover:-translate-y-1 hover:border-accent/40 hover:from-slate-800/50 hover:to-slate-900/50",
    className
  );

  const linkClasses = "absolute inset-0 z-10 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

  return (
    <Stack
      as="article"
      radius="xl"
      border
      className={cardClasses}
      {...props}
    >
      {to && (
        <Box
          as={NavLink}
          to={to}
          aria-label={ariaLabel}
          className={linkClasses}
        />
      )}
      {href && (
        <Box
          as="a"
          href={href}
          target="_blank"
          rel={rel || "noopener noreferrer"}
          aria-label={ariaLabel}
          className={linkClasses}
        />
      )}
      {children}
    </Stack>
  );
}
