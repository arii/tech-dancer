import { ReactNode, ElementType } from 'react';
import { Box, BoxProps } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface PrimaryActionButtonProps extends BoxProps {
  children: ReactNode;
  as?: ElementType;
}

/**
 * Standard primary action button used across the lab and preview features.
 * Encapsulates brand-aligned interactive styling.
 */
export function PrimaryActionButton({ children, className, ...props }: PrimaryActionButtonProps) {
  return (
    <Box
      as="button"
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
