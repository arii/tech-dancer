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
        <Box
          as="button"
          key={v}
          onClick={() => onChange(v)}
          padding={3}
          display="flex"
          align="center"
          justify="center"
          minWidth={11}
          minHeight={11}
          border={v === 'card' ? 'r' : false}
          className={cn(
            'transition-colors cursor-pointer',
            view === v 
              ? 'bg-accent-navy text-bg shadow-inner' 
              : 'bg-bg text-text-dim hover:text-text-main hover:bg-surface'
          )}
          aria-label={v === 'card' ? 'Grid view' : 'List view'}
          aria-pressed={view === v}
        >
          {v === 'card' ? <LayoutGrid size={20} /> : <List size={20} />}
        </Box>
      ))}
    </Box>
  );
}
