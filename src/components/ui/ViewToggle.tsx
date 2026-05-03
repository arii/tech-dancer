import { LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Box } from '@/layouts/Primitives';

export type ViewMode = 'card' | 'list';

interface ViewToggleProps {
  view: ViewMode;
  onChange: (v: ViewMode) => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <Box display="flex" border radius="none" overflow="hidden" aria-label="Switch content view" role="group">
      {(['card', 'list'] as ViewMode[]).map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={cn(
            'p-2 transition-colors cursor-pointer min-h-11 min-w-11 flex items-center justify-center',
            v === 'card' ? 'border-r border-line' : '',
            view === v 
              ? 'bg-accent-navy text-white shadow-inner' 
              : 'bg-bg text-text-dim hover:text-text-main hover:bg-surface transition-colors'
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
