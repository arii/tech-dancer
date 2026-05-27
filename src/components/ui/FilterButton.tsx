import { cn } from '@/lib/utils';

interface FilterButtonProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function FilterButton({ label, onClick, isActive, className, type = 'button' }: FilterButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        'rounded-full border px-3.5 py-2 text-xs font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-line',
        isActive ? 'bg-surface border-line text-text-main' : 'bg-transparent border-transparent text-text-dim',
        className,
      )}
    >
      {label}
    </button>
  );
}
