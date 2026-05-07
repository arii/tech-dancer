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
    <Box display="flex" border radius="none" overflow="hidden">
      {(['card', 'list'] as ViewMode[]).map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={cn(
            'p-3 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center',
            v === 'card' ? 'border-r border-line' : '',
            view === v 
              ? 'bg-accent-navy text-bg shadow-inner' 
              : 'bg-bg text-text-dim hover:text-text-main hover:bg-surface transition-colors'
          )}
          aria-label={v === 'card' ? 'Grid view' : 'List view'}
          aria-pressed={view === v}
        >
          {v === 'card' ? <LayoutGrid className="w-5 h-5" /> : <List className="w-5 h-5" />}
        </button>
      ))}
    </Box>
  );
}
