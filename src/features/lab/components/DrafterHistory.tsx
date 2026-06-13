import { History as HistoryIcon, Trash2 } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { DrafterHistoryEntry } from '../useBlogDrafter';

interface DrafterHistoryProps {
  history: DrafterHistoryEntry[];
  rollback: (entry: DrafterHistoryEntry) => void;
  deleteHistoryEntry: (id: string) => void;
}

export function DrafterHistory({ history, rollback, deleteHistoryEntry }: DrafterHistoryProps) {
  if (history.length === 0) return null;

  return (
    <Stack gap={4} marginTop={4}>
      <Box border="b" paddingBottom={2} display="flex" align="center" gap={2}>
        <HistoryIcon className="w-3 h-3 text-accent" />
        <Text variant="mono" size="micro" color="brand">VERSION_HISTORY</Text>
      </Box>
      <Stack gap={2}>
        {history.map((entry) => (
          <Box
            key={entry.id}
            border
            padding={3}
            surface="muted"
            display="flex"
            align="center"
            justify="between"
            className="hover:border-accent/50 transition-colors"
          >
            <Stack gap={1}>
              <Box display="flex" align="center" gap={2}>
                 <Text variant="mono" size="xs" weight="font-bold">
                  {entry.data.title || 'Untitled Snapshot'}
                </Text>
                <Box paddingX={1} className="bg-accent/20 rounded">
                   <Text variant="mono" size="micro" color="accent">{entry.data.type.toUpperCase()}</Text>
                </Box>
              </Box>
              <Text variant="mono" size="micro" color="dim">
                {new Date(entry.timestamp).toLocaleString()}
              </Text>
            </Stack>
            <Box display="flex" gap={2}>
              <Box
                as="button"
                onClick={() => rollback(entry)}
                surface="accent"
                paddingX={2}
                paddingY={1}
                className="bg-accent/10 text-accent hover:bg-accent hover:text-bg transition-all cursor-pointer"
              >
                <Text variant="mono" size="micro" weight="font-bold" color="inherit">ROLLBACK</Text>
              </Box>
              <Box
                as="button"
                onClick={() => deleteHistoryEntry(entry.id)}
                className="text-dim hover:text-warning transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </Box>
            </Box>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
