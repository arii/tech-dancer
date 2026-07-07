import { ReactNode, ElementType, forwardRef, Ref } from 'react';
import { Box, BoxProps } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { cva } from "class-variance-authority";

/**
 * Shared variants for Console-style action buttons (compact, high-contrast)
 */
export const actionButtonVariants = cva(
  "font-bold transition-all text-sm shrink-0 flex items-center gap-2 disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "hover:text-text-main",
        primary: "bg-accent text-bg hover:opacity-90 shadow-md",
        ghost: "hover:bg-line/10 text-text-dim hover:text-text-main",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ActionButtonProps extends BoxProps {
  children: ReactNode;
  as?: ElementType;
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
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
          variant === 'primary' && "bg-accent text-bg hover:bg-accent/90",
          variant === 'secondary' && "bg-surface-alt text-text-main border border-line hover:border-accent/50",
          variant === 'accent' && "bg-accent-navy text-bg border border-accent/20 hover:bg-accent/10",
          variant === 'ghost' && "bg-transparent text-text-dim hover:text-text-main hover:bg-line/10",
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
