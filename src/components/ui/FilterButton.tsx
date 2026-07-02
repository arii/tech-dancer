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
  default: "font-semibold uppercase tracking-emphasized px-4 py-1.5 text-xs min-h-11",
  compact: "font-semibold uppercase tracking-emphasized px-4 py-1.5 text-xs min-h-11",
  quiet: "px-4 py-1.5 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-line",
};

const activeStyles = {
  default: "border-text-main text-text-main bg-white/10 ring-2 ring-line ring-offset-2 ring-offset-background hover:bg-white/20",
  compact: "border-text-main text-text-main bg-white/10 ring-2 ring-line ring-offset-2 ring-offset-background hover:bg-white/20",
  quiet: "bg-surface border-line text-text-main hover:bg-surface/80",
};

const inactiveStyles = {
  default: "border-line text-text-dim hover:border-text-main/50 hover:text-text-main hover:bg-white/5",
  compact: "border-line text-text-dim hover:border-text-main/50 hover:text-text-main hover:bg-white/5",
  quiet: "bg-transparent border-transparent text-text-dim hover:text-text-main hover:bg-line/10",
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
        "inline-flex items-center rounded-xl border transition-all cursor-pointer",
        variantStyles[variant],
        isActive ? activeStyles[variant] : inactiveStyles[variant],
        className
      )}
    >
      {label}
    </button>
  );
}
