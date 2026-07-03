import { Box } from '@/layouts/Primitives';
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
  const isQuiet = variant === "quiet";

  return (
    <Box
      as="button"
      type={type}
      onClick={onClick}
      aria-pressed={isActive}
      paddingX={4}
      paddingY={1.5}
      radius="md"
      display="inline-flex"
      align="center"
      justify="center"
      cursor="pointer"
      className={cn(
        "border transition-all font-semibold uppercase tracking-emphasized text-xs min-h-11 whitespace-nowrap",
        !isQuiet && (isActive
          ? "border-text-main text-text-main bg-white/10 ring-2 ring-line ring-offset-2 ring-offset-background hover:bg-white/20"
          : "border-line text-text-dim hover:border-text-main/50 hover:text-text-main hover:bg-white/5"),
        isQuiet && (isActive
          ? "bg-surface border-line text-text-main hover:bg-surface/80"
          : "bg-transparent border-transparent text-text-dim hover:text-text-main hover:bg-line/10"),
        className
      )}
    >
      {label}
    </Box>
  );
};
