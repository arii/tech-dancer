import { cn } from '@/lib/utils';

interface FilterButtonProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function FilterButton({ label, onClick, isActive, className, type = "button" }: FilterButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "inline-flex items-center rounded-full border px-4 py-3 text-xs font-semibold uppercase tracking-emphasized cursor-pointer min-h-11",
        isActive && "ring-2 ring-offset-2 ring-offset-bg ring-current",
        className
      )}
    >
      {label}
    </button>
  );
}
