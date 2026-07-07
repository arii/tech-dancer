import { ReactNode, ElementType, forwardRef, Ref } from 'react';
import { Box, BoxProps } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { actionButtonVariants, type ActionButtonVariants } from '@/lib/variants';

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
  ({ children, className, as = "button", variant, loading: _loading, ...props }, ref) => {
    return (
      <Box
        as={as}
        ref={ref as Ref<HTMLDivElement>}
        display="flex"
        align="center"
        justify="center"
        cursor="pointer"
        className={cn(
          actionButtonVariants({ variant }),
          "uppercase tracking-widest text-xs disabled:opacity-muted disabled:cursor-not-allowed",
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
