// impeccable-ignore-file
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
          className={cn(
            'transition-colors cursor-pointer hit-area-sm hit-area-sm',
            v === 'card' ? 'border-r border-line' : '',
            view === v 
              ? 'bg-accent-navy text-bg shadow-inner' 
              : 'bg-bg text-text-dim hover:text-text-main hover:bg-surface'
          )}
          aria-label={v === 'card' ? 'Grid view' : 'List view'}
          aria-pressed={view === v}
        >
          {v === 'card' ? <LayoutGrid className="w-5 h-5" /> : <List className="w-5 h-5" />}
        </Box>
      ))}
    </Box>
  );
}
