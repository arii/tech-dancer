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
    "group relative bg-surface transition-all duration-200",
    isLink && "hover:bg-surface-alt",
    className
  );

  const linkClasses = "absolute inset-0 z-10 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent";

  return (
    <Stack
      as="article"
      radius="lg"
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
