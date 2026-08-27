import React from 'react';
import { SubTask } from '../types';
import { CheckCircle2, Sparkles } from 'lucide-react';

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
    <div className={`w-full p-3.5 rounded-2xl bg-surface/80 border border-line/70 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${className || ''}`}>
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-brand-cyan/20 text-brand-cyan shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-text-main">
            Schedule Optimized
          </span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
            {progressPercent}% Complete
          </span>
        </div>
      </div>

      {/* Compact Horizontal Step Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
        {tasks.map((task, idx) => (
          <div
            key={task.id || idx}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/60 border border-line/50 text-[11px] font-mono text-text-dim shrink-0 whitespace-nowrap"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0" />
            <span>{task.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

