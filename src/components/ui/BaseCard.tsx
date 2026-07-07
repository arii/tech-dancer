import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, BaseProps } from '@/layouts/Primitives';
import { cn, isSafeUrl } from '@/lib/utils';
import { cardVariants } from '@/lib/variants';

interface BaseCardProps extends Omit<BaseProps, "border"> {
  border?: boolean;
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
  border = true,
  ...props
}: BaseCardProps) {
  const isLink = !!(to || href);
  const safeHref = isSafeUrl(href) ? href : undefined;
  const safeTo = isSafeUrl(to) ? to : undefined;

  // Use standardized cardVariants to ensure visual consistency
  const cardClasses = cn(
    "group relative",
    cardVariants({ interactive: isLink }),
    !border && "border-none",
    className
  );

  const linkClasses = "absolute inset-0 z-10 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent";

  return (
    <Stack
      as="article"
      radius="md"
      className={cardClasses}
      {...props}
    >
      {safeTo && (
        <Box
          as={NavLink}
          to={safeTo}
          aria-label={ariaLabel}
          className={linkClasses}
        />
      )}
      {safeHref && (
        <Box
          as="a"
          href={safeHref}
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
