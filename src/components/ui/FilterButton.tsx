import { Box } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { cva } from "class-variance-authority";

/**
 * FilterButton variants for collection and category filtering.
 * Separates structural styles from state-specific styles.
 */
export const filterButtonVariants = cva(
  "inline-flex items-center justify-center border transition-all whitespace-nowrap font-semibold uppercase tracking-emphasized text-xs",
  {
    variants: {
      variant: {
        default: "px-4 py-3 min-h-11",
        compact: "px-4 py-1.5",
        quiet: "px-3.5 py-2 font-medium tracking-normal",
      },
      isActive: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: ["default", "compact"],
        isActive: true,
        className: "border-accent text-accent bg-accent/5 ring-2 ring-accent ring-offset-2 ring-offset-background hover:bg-accent/10",
      },
      {
        variant: ["default", "compact"],
        isActive: false,
        className: "border-line text-text-dim hover:border-accent/50 hover:text-text-main hover:bg-white/5",
      },
      {
        variant: "quiet",
        isActive: true,
        className: "bg-surface border-line text-text-main hover:bg-surface/80",
      },
      {
        variant: "quiet",
        isActive: false,
        className: "bg-transparent border-transparent text-text-dim hover:text-text-main hover:bg-line/10",
      },
    ],
    defaultVariants: {
      variant: "default",
      isActive: false,
    },
  }
);

interface FilterButtonProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "compact" | "quiet";
}

/**
 * FilterButton component for collection and category filtering.
 * Adheres to design system constraints and utilizes the Primitive system.
 */
export const FilterButton = ({
  label,
  onClick,
  isActive,
  className,
  type = "button",
  variant = "default"
}: FilterButtonProps) => {
  return (
    <Box
      as="button"
      type={type}
      onClick={onClick}
      aria-pressed={isActive}
      radius="md"
      cursor="pointer"
      className={cn(
        filterButtonVariants({ variant, isActive, className })
      )}
    >
      {label}
    </Box>
  );
};
