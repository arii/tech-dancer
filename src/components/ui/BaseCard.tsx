import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, BaseProps } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface BaseCardProps extends BaseProps {
  children: ReactNode;
  href?: string;
  isExternal?: boolean;
  ariaLabel?: string;
  className?: string;
}

export function BaseCard({
  children,
  href,
  isExternal,
  ariaLabel,
  className,
  ...props
}: BaseCardProps) {
  const CardRoot = (props as any).as || Stack;

  return (
    <CardRoot
      {...props}
      radius="lg"
      border
      className={cn(
        "group relative bg-surface transition-all duration-300 hover:border-accent/40 hover:-translate-y-0.5",
        className
      )}
    >
      {href && (
        isExternal ? (
          <Box
            as="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            aria-label={ariaLabel}
            className="absolute inset-0 z-10 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 rounded-lg"
          />
        ) : (
          <Box
            as={NavLink}
            to={href}
            aria-label={ariaLabel}
            className="absolute inset-0 z-10 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 rounded-lg"
          />
        )
      )}
      {children}
    </CardRoot>
  );
}
