import { cn } from '@/lib/utils';

interface FilterButtonProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function FilterButton({
  label,
  onClick,
  isActive,
  className,
  type = "button"
}: FilterButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "rounded-lg px-4 py-1.5 text-xs font-semibold transition-all duration-200 whitespace-nowrap",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20",
        isActive
          ? "bg-white/10 text-white"
          : "text-slate-400 hover:text-slate-200",
        className
      )}
    >
      {label}
    </button>
  );
}
