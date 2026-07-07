import { Box } from '@/layouts/Primitives';
import { filterButtonVariants, type FilterButtonVariants } from '@/lib/variants';

interface FilterButtonProps extends FilterButtonVariants {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
}

/**
 * FilterButton component for collection and category filtering.
 * Adheres to design system constraints and utilizes the Primitive system.
 */
export const FilterButton = ({
  label,
  onClick,
  type = "button",
  variant,
  isActive = false
}: FilterButtonProps) => {
  return (
    <Box
      as="button"
      type={type}
      onClick={onClick}
      aria-pressed={isActive}
      radius="md"
      cursor="pointer"
      className={filterButtonVariants({ variant, isActive })}
    >
      {label}
    </Box>
  );
};
