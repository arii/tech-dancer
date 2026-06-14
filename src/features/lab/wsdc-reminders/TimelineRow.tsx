import { Calendar } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { ActionButton } from '@/components/ui/ActionButton';
import { TimelineItem } from './types';

interface TimelineRowProps {
  item: TimelineItem;
  formattedDate: string;
  onSync: (item: TimelineItem) => void;
}

export function TimelineRow({ item, formattedDate, onSync }: TimelineRowProps) {
  const Icon = item.icon || Calendar;

  return (
    <Box position="relative" display="flex" gap={{ base: 4, sm: 10 }} className="group" data-testid="timeline-row">
      {/* Dot / Icon */}
      <Box
        display="flex"
        align="center"
        justify="center"
        width={10}
        height={10}
        radius="full"
        border
        surface="surface"
        color="accent"
        zIndex={10}
        className="shrink-0 group-hover:border-accent transition-colors shadow-sm"
      >
        <Icon className="w-5 h-5" />
      </Box>

      <Box flex={1} border radius="lg" padding={6} surface="surface" className="hover:border-accent/40 transition-all">
        <Grid cols={{ base: 1, md: 4 }} gap={4} align="center">
          <Box className="md:col-span-1">
            <Text variant="mono" size="xs" color="accent" weight="font-bold">
              {formattedDate}
            </Text>
          </Box>
          <Box className="md:col-span-2">
            <Stack gap={1}>
              <Text variant="headline" size="md" weight="font-black" className="uppercase tracking-tight">{item.label}</Text>
              <Text size="sm" color="dim" className="leading-relaxed">{item.description}</Text>
            </Stack>
          </Box>
          <Box display="flex" justify={{ base: 'start', md: 'end' }}>
            <ActionButton
              variant="secondary"
              onClick={() => onSync(item)}
              height={10}
              paddingX={4}
            >
              <Box display="flex" align="center" gap={2}>
                <Calendar className="w-3 h-3" />
                <Text as="span">Sync</Text>
              </Box>
            </ActionButton>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
