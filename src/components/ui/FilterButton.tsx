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
        "rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60",
        isActive
          ? "bg-slate-800 text-cyan-200"
          : "text-slate-400 hover:bg-slate-900 hover:text-slate-100",
        className
      )}
    >
      {label}
    </button>
  );
}
