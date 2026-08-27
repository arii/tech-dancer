import { useState } from 'react';
import { SubTask } from '../types';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { Stack, Box } from '@/layouts/Primitives';

export interface ExecutionProgressBarProps {
  tasks?: SubTask[];
  className?: string;
}

const DEFAULT_TASKS: SubTask[] = [
  { id: '1', label: 'Schedule Parsed', status: 'completed' },
  { id: '2', label: 'Divisions Filtered', status: 'completed' },
  { id: '3', label: 'Travel Buffer Calculated', status: 'completed' },
  { id: '4', label: 'Calendar Generated (.ics)', status: 'completed' },
];

export const ExecutionProgressBar = ({ tasks = DEFAULT_TASKS, className }: ExecutionProgressBarProps) => {
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <Stack padding={3.5} direction={{ default: "col", sm: "row" }} align={{ default: "start", sm: "center" }} justify="between" gap={3} className={`w-full rounded-2xl bg-surface/80 border border-line/70 shadow-sm ${className || ''}`}>
      <Stack direction="row" align="center" gap={2.5}>
        <Box padding={1.5} radius="lg" className="bg-brand-cyan/20 text-brand-cyan shrink-0">
          <Sparkles className="w-4 h-4" />
        </Box>
        <Stack direction="row" align="center" gap={2}>
          <span className="text-xs font-bold text-text-main">
            Schedule Optimized
          </span>
          <Box as="span" paddingX={2} paddingY={0.5} radius="full" className="text-xs font-mono font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
            {progressPercent}% Complete
          </Box>
        </Stack>
      </Stack>

      {/* Compact Horizontal Step Pills */}
      <Stack direction="row" align="center" gap={2} overflowX="auto" noScrollbar className="text-xs">
        {tasks.map((task, idx) => (
          <Box
            key={task.id || idx}
            display="inline-flex" align="center" gap={1.5} paddingX={2.5} paddingY={1} radius="lg" className="bg-surface/60 border border-line/50 text-xs font-mono text-text-dim shrink-0 whitespace-nowrap"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0" />
            <span>{task.label}</span>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};
