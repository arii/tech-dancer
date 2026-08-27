import { Box, Stack, Grid } from '@/layouts/Primitives';
import { SubTask } from '../types';
import { CheckCircle2, Loader2, Circle, FileText, UserCheck, Clock, Calendar } from 'lucide-react';

export interface ExecutionProgressBarProps {
  tasks?: SubTask[];
  className?: string;
}

const DEFAULT_TASKS: SubTask[] = [
  { id: '1', label: 'Parsed Event Timetable', status: 'completed', detail: 'Identified all workshops, ballrooms, and competitions' },
  { id: '2', label: 'Applied Division Filters', status: 'completed', detail: 'Selected sessions matching your level & preferences' },
  { id: '3', label: 'Calculated Travel Buffer', status: 'completed', detail: 'Computed warmup, check-in & transit times' },
  { id: '4', label: 'Generated Calendar File', status: 'completed', detail: 'Ready for Apple & Google Calendar' },
];

const TASK_ICONS = [FileText, UserCheck, Clock, Calendar];

export function ExecutionProgressBar({ tasks = DEFAULT_TASKS, className }: ExecutionProgressBarProps) {
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <Stack gap={4} className={className}>
      <Box display="flex" align="center" justify="between">
        <Stack gap={1}>
          <Box as="h3" className="text-lg font-bold text-text-main">
            Schedule Optimization Steps
          </Box>
          <Box as="p" className="text-xs text-text-dim">
            Summary of how your personalized plan was organized
          </Box>
        </Stack>
        <Box paddingX={3} paddingY={1} radius="md" className="text-xs font-mono font-semibold bg-accent/10 text-accent border border-accent/20">
          {progressPercent}% Complete
        </Box>
      </Box>

      {/* Progress Track */}
      <Box className="w-full h-2 bg-surface rounded-full overflow-hidden border border-line">
        <Box
          className="h-full bg-accent transition-all duration-500 ease-out rounded-full"
          width={`${progressPercent}%`}
        />
      </Box>

      {/* Animated Task Steps */}
      <Grid cols={{ default: 1, sm: 2, lg: 4 }} gap={3} paddingTop={2}>
        {tasks.map((task, idx) => {
          const StepIcon = TASK_ICONS[idx % TASK_ICONS.length];
          const isCompleted = task.status === 'completed';
          const isInProgress = task.status === 'in_progress';

          return (
            <Box
              key={task.id}
              padding={3}
              radius="md"
              surface="card"
              border
              className={`transition-all duration-200 ${
                isInProgress ? 'border-accent bg-accent/5 ring-1 ring-accent/30' : 'border-line'
              }`}
            >
              <Stack gap={2}>
                <Box display="flex" align="center" justify="between">
                  <Box display="flex" align="center" gap={2}>
                    <StepIcon className="w-4 h-4 text-accent shrink-0" />
                    <Box as="span" className="text-xs font-mono text-text-dim">
                      Step 0{idx + 1}
                    </Box>
                  </Box>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  ) : isInProgress ? (
                    <Loader2 className="w-4 h-4 text-accent animate-spin shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-text-dim/40 shrink-0" />
                  )}
                </Box>

                <Box as="p" className="text-sm font-semibold text-text-main leading-snug">
                  {task.label}
                </Box>

                {task.detail && (
                  <Box as="p" className="text-xs text-text-dim truncate">
                    {task.detail}
                  </Box>
                )}
              </Stack>
            </Box>
          );
        })}
      </Grid>
    </Stack>
  );
}
