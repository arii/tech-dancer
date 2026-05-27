import { cn } from '@/lib/utils';

interface FilterButtonProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "compact" | "quiet";
}

export function FilterButton({
  label,
  onClick,
  isActive,
  className,
  type = "button",
  variant = "default"
}: FilterButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "inline-flex items-center rounded-full border transition-all cursor-pointer",
        // Original styles for default/compact
        variant !== "quiet" && "font-semibold uppercase tracking-emphasized",
        variant === "default" && "px-4 py-3 text-xs min-h-11",
        variant === "compact" && "px-3 py-1.5 text-xs min-h-11",
        variant !== "quiet" && (
          isActive
            ? "border-accent text-accent bg-accent/5 ring-2 ring-accent"
            : "border-line text-text-dim hover:border-accent/50 hover:text-text-main"
        ),
        // New quiet variant
        variant === "quiet" && "px-3.5 py-2 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-line",
        variant === "quiet" && (
          isActive
            ? "bg-surface border-line text-text-main"
            : "bg-transparent border-transparent text-text-dim hover:text-text-main"
        ),
        className
      )}
    >
      {label}
    </button>
  );
}
