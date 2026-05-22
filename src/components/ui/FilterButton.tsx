import { cn } from '@/lib/utils';

interface FilterButtonProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "compact";
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
        "inline-flex items-center rounded-full border font-semibold uppercase tracking-emphasized cursor-pointer transition-all",
        variant === "default" && "px-4 py-3 text-xs min-h-11",
        variant === "compact" && "px-3 py-1.5 text-xs min-h-11",
        isActive
          ? "border-accent text-accent bg-accent/5 ring-2 ring-accent"
          : "border-line text-text-dim hover:border-accent/50 hover:text-text-main",
        className
      )}
    >
      {label}
    </button>
  );
}
