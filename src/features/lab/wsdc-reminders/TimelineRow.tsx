import { Calendar, Plane, Hotel, Trophy, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Box, Stack, Text, Grid, Button } from '@/layouts/Primitives';
import { TimelineItem } from './types';

const ICON_MAP: Record<string, React.ReactNode> = {
  'flight-track': <Plane className="w-5 h-5" />,
  'early-bird': <Trophy className="w-5 h-5" />,
  'hotel-block': <Hotel className="w-5 h-5" />,
  'comp-window': <CheckCircle2 className="w-5 h-5" />,
  'cancel-safety': <ShieldCheck className="w-5 h-5" />,
};

interface TimelineRowProps {
  item: TimelineItem;
  onSync: (item: TimelineItem) => void;
}

export function TimelineRow({ item, onSync }: TimelineRowProps) {
  return (
    <Box position="relative" display="flex" gap={{ base: 4, sm: 10 }} className="group">
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
        {ICON_MAP[item.id] || <Calendar className="w-5 h-5" />}
      </Box>

      <Box flex={1} border radius="lg" padding={6} surface="surface" className="hover:border-accent/40 transition-all">
        <Grid cols={{ base: 1, md: 4 }} gap={4} align="center">
          <Box className="md:col-span-1">
            <Text variant="mono" size="xs" color="accent" weight="font-bold">
              {item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </Text>
          </Box>
          <Box className="md:col-span-2">
            <Stack gap={1}>
              <Text variant="headline" size="md" weight="font-black" className="uppercase tracking-tight">{item.label}</Text>
              <Text size="sm" color="dim" className="leading-relaxed">{item.description}</Text>
            </Stack>
          </Box>
          <Box display="flex" justify={{ base: 'start', md: 'end' }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSync(item)}
              className="h-10"
            >
              <Box display="flex" align="center" gap={2} paddingX={4}>
                <Calendar className="w-3 h-3" />
                <Text as="span" size="xs" weight="font-bold" uppercase className="tracking-widest">Sync</Text>
              </Box>
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
