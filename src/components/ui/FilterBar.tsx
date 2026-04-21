import { cn } from '@/lib/utils';

interface FilterBarProps {
  activeCategory: string;
  categories: string[];
  onSelect: (category: string) => void;
}

export function FilterBar({ activeCategory, categories, onSelect }: FilterBarProps) {
  return (
    <div className="w-full border-b border-slate-200 bg-surface/80 backdrop-blur-md sticky top-0 z-40 overflow-x-auto no-scrollbar py-5">
      <div className="flex flex-row gap-4 min-w-max">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={cn(
              "px-6 py-2.5 rounded-full transition-all duration-300 border text-sm font-bold tracking-tight cursor-pointer",
              activeCategory === cat
                ? "bg-accent text-white border-accent shadow-sm"
                : "bg-bg text-text-dim border-line hover:border-accent hover:text-accent"
            )}
          >
            {cat === 'all' ? 'All Posts' : cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </button>
        ))}
      </div>
    </div>
  );
}
