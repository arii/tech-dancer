import { Box } from '@/layouts/Primitives';
import { filterButtonVariants } from '@/lib/variants';
import { cn } from '@/lib/utils';

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
      radius="sm"
      cursor="pointer"
      className={cn(
        filterButtonVariants({ variant, isActive, className })
      )}
    >
      {label}
    </Box>
  );
};
