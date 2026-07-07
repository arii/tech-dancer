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
  className,
  type = "button",
  ...variants
}: FilterButtonProps) => {
  return (
    <Box
      as="button"
      type={type}
      onClick={onClick}
      aria-pressed={variants.isActive || false}
      radius="md"
      cursor="pointer"
      className={cn(
        filterButtonVariants({ ...variants, className })
      )}
    >
      {label}
    </Box>
  );
};
