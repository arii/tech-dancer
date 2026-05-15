import { cn } from '@/lib/utils';

interface FilterButtonProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
  className?: string;
}

export function FilterButton({ label, onClick, isActive, className }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
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
