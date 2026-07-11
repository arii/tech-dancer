import { Box } from '@/layouts/Primitives';
import { filterButtonVariants, type FilterButtonVariants } from '@/lib/variants';
import { cn } from '@/lib/utils';

interface FilterButtonProps extends FilterButtonVariants {
  label: string;
  onClick: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
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
  variant = "default",
  ...props
}: FilterButtonProps) => {
  return (
    <Box
      as="button"
      type={type}
      onClick={onClick}
      radius="md"
      cursor="pointer"
      className={cn(
        filterButtonVariants({ variant, isActive, className })
      )}
      {...props}
    >
      {label}
    </Box>
  );
};
