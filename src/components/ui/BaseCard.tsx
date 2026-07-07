import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, BaseProps } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { cva } from "class-variance-authority";

/**
 * Card variants for reports, tools, and callout blocks
 */
export const cardVariants = cva(
  "bg-surface rounded-md shadow-sm card-border transition-all",
  {
    variants: {
      interactive: {
        true: "hover:border-accent cursor-pointer",
        false: "",
      },
      overflow: {
        hidden: "overflow-hidden",
        visible: "overflow-visible",
      },
      span: {
        1: "col-span-1",
        2: "col-span-2",
        3: "col-span-3",
      }
    },
    defaultVariants: {
      interactive: false,
      overflow: "visible",
    }
  }
);

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

  // Standardized hover and transition classes
  const cardClasses = cn(
    "group relative bg-surface transition-all duration-200",
    border === true && "card-border",
    isLink && "hover:-translate-y-0.5 hover:border-accent/40",
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
