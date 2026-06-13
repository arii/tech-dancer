import { cn } from '@/lib/utils';

interface FilterButtonProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "compact" | "quiet";
}

const variantStyles = {
  default: "font-semibold uppercase tracking-emphasized px-4 py-3 text-xs min-h-11",
  compact: "font-semibold uppercase tracking-emphasized px-3 py-1.5 text-xs min-h-11",
  quiet: "px-3.5 py-2 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-line",
};

const activeStyles = {
  default: "border-accent text-bg bg-accent ring-2 ring-accent",
  compact: "border-accent text-bg bg-accent ring-2 ring-accent",
  quiet: "bg-surface border-line text-text-main",
};

const inactiveStyles = {
  default: "border-line text-text-dim hover:border-accent/50 hover:text-text-main",
  compact: "border-line text-text-dim hover:border-accent/50 hover:text-text-main",
  quiet: "bg-transparent border-transparent text-text-dim hover:text-text-main",
};

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
        variantStyles[variant],
        isActive ? activeStyles[variant] : inactiveStyles[variant],
        className
      )}
    >
      {label}
    </button>
  );
}
