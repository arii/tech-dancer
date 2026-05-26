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
        variant === "default" && "px-5 py-2.5 text-xs min-h-11",
        variant === "compact" && "px-4 py-1.5 text-xs min-h-9",
        isActive
          ? "border-accent/60 text-accent bg-accent/10 ring-2 ring-accent/20"
          : "border-slate-700/50 text-text-dim bg-slate-800/30 hover:border-slate-600 hover:text-text-main hover:bg-slate-800/60",
        className
      )}
    >
      {label}
    </button>
  );
}
