import { ReactNode, ElementType } from 'react';
import { Box, BoxProps } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface PrimaryActionButtonProps extends BoxProps {
  children: ReactNode;
  as?: ElementType;
}

import { forwardRef, Ref } from 'react';

/**
 * Standard primary action button used across the lab and preview features.
 * Encapsulates brand-aligned interactive styling.
 */
export const PrimaryActionButton = forwardRef<HTMLElement, PrimaryActionButtonProps>(
  ({ children, className, as = "button", ...props }, ref) => {
    return (
      <Box
        as={as}
        ref={ref as Ref<HTMLDivElement>}
        display="flex"
        align="center"
        justify="center"
        surface="accent"
        className={cn(
          "bg-accent text-bg hover:bg-accent/90 transition-all cursor-pointer font-bold uppercase tracking-widest text-xs",
          className
        )}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

PrimaryActionButton.displayName = "PrimaryActionButton";
