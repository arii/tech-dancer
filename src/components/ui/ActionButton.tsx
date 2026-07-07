import { ReactNode, ElementType, forwardRef, Ref } from 'react';
import { Box, BoxProps } from '@/layouts/Primitives';
import { actionButtonVariants, type ActionButtonVariants } from '@/lib/variants';
import { cn } from '@/lib/utils';

interface ActionButtonProps extends BoxProps, ActionButtonVariants {
  children: ReactNode;
  as?: ElementType;
  loading?: boolean;
}

/**
 * Standard action button used across the application.
 * Encapsulates brand-aligned interactive styling and typography.
 */
export const ActionButton = forwardRef<HTMLElement, ActionButtonProps>(
  ({ children, className, as = "button", variant = "primary", loading: _loading, ...props }, ref) => {
    return (
      <Box
        as={as}
        ref={ref as Ref<HTMLDivElement>}
        display="flex"
        align="center"
        justify="center"
        cursor="pointer"
        className={cn(
          "transition-all font-bold uppercase tracking-widest text-xs disabled:opacity-muted disabled:cursor-not-allowed",
          actionButtonVariants({ variant }),
          className
        )}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

ActionButton.displayName = "ActionButton";
