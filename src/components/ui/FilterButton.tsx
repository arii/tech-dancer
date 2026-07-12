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
  // Extract variant props so they don't leak to the DOM element via Box
  const variantClasses = filterButtonVariants({ variant, isActive });

  return (
    <Box
      as="button"
      type={type}
      onClick={onClick}
      aria-pressed={isActive || undefined}
      radius="md"
      cursor="pointer"
      className={cn(variantClasses, className)}
      {...props}
    >
      {label}
    </Box>
  );
};
