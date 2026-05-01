import { LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Box } from "@/layouts/Primitives";
export type ViewMode = 'card' | 'list';

interface ViewToggleProps {
  view: ViewMode;
  onChange: (v: ViewMode) => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <Box display="flex" border radius="none" overflow="hidden">
      {(['card', 'list'] as ViewMode[]).map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={cn(
            'p-2 transition-colors',
            v === 'card' ? 'border-r border-line' : '',
            view === v ? 'bg-surface text-text-main' : 'bg-bg text-text-dim hover:text-text-main'
          )}
          aria-label={v === 'card' ? 'Card view' : 'List view'}
          aria-pressed={view === v}
        >
          {v === 'card' ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
        </button>
      ))}
    </Box>
  );
}
