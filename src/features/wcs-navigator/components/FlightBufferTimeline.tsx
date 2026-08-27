import { Box, Stack, Grid } from '@/layouts/Primitives';
import { FlightBuffer } from '../types';
import { Plane, Home, Flame, Clock, Calendar } from 'lucide-react';

export interface FlightBufferTimelineProps {
  buffer?: FlightBuffer;
  className?: string;
}

const DEFAULT_BUFFER: FlightBuffer = {
  earliestStagingTime: 'Fri 4:00 PM',
  warmupMinutes: 60,
  hotelSettleMinutes: 90,
  transitMinutes: 45,
  latestFlightArrivalDeadline: 'Fri 12:45 PM',
  formulaSummary: 'Earliest Staging (4:00 PM) - 60m Warmup - 90m Hotel Settle - 45m Transit = Latest Flight Arrival (12:45 PM)',
  steps: [
    {
      type: 'staging',
      label: 'Earliest Staging Time',
      time: 'Fri 4:00 PM',
      duration: 'Event Anchor',
      description: 'Novice Jack & Jill Marshalling Begins',
    },
    {
      type: 'warmup',
      label: 'Warmup & Floor Familiarization',
      time: '-60m Warmup',
      duration: '60 mins',
      description: 'Body warmup, shoe check, Ballroom A open practice',
    },
    {
      type: 'hotel',
      label: 'Hotel Check-in & Settle',
      time: '-90m Hotel Settle',
      duration: '90 mins',
      description: 'Room check-in, outfit change & dance bag prep',
    },
    {
      type: 'transit',
      label: 'Airport-to-Hotel Transit',
      time: '-45m Transit',
      duration: '45 mins',
      description: 'Rideshare / Shuttle from SFO to Event Hotel',
    },
    {
      type: 'flight',
      label: 'Latest Flight Arrival Deadline',
      time: 'Fri 12:45 PM',
      duration: 'Target Cutoff',
      description: 'Latest touchdown time needed to guarantee on-time staging',
    },
  ],
};

const TYPE_STYLES = {
  staging: {
    badge: 'bg-accent/10 text-accent border-accent/20',
    icon: Calendar,
    dot: 'bg-accent',
  },
  warmup: {
    badge: 'bg-accent/10 text-accent border-accent/20',
    icon: Flame,
    dot: 'bg-accent',
  },
  hotel: {
    badge: 'bg-surface text-text-main border-line',
    icon: Home,
    dot: 'bg-text-dim',
  },
  transit: {
    badge: 'bg-surface text-text-main border-line',
    icon: Clock,
    dot: 'bg-text-dim',
  },
  flight: {
    badge: 'bg-accent/10 text-accent border-accent/20',
    icon: Plane,
    dot: 'bg-accent',
  },
};

export function FlightBufferTimeline({ buffer = DEFAULT_BUFFER, className }: FlightBufferTimelineProps) {
  return (
    <Stack gap={4} className={className}>
      <Box display="flex" align="center" justify="between" wrap gap={2}>
        <Stack gap={1}>
          <Box as="h3" className="text-lg font-bold text-text-main">
            Flight & Buffer Timeline
          </Box>
          <Box as="p" className="text-xs text-text-dim">
            Logistics equation backwards calculation for zero-stress arrival
          </Box>
        </Stack>
        <Box paddingX={3} paddingY={1} radius="md" surface="card" border className="text-xs font-mono text-accent">
          Deadline: {buffer.latestFlightArrivalDeadline}
        </Box>
      </Box>

      {/* Formula Summary Box */}
      <Box padding={3} radius="md" surface="card" border className="border-accent/30 bg-accent/5">
        <Box display="flex" align="center" gap={2}>
          <Box className="w-2 h-2 rounded-full bg-accent shrink-0" />
          <Box as="span" className="text-xs font-mono font-semibold text-text-dim uppercase tracking-wider">
            Logistics Equation
          </Box>
        </Box>
        <Box as="p" marginTop={1} className="text-sm font-mono text-text-main font-semibold">
          {buffer.formulaSummary}
        </Box>
      </Box>

      {/* Visual Step-down Timeline */}
      <Stack gap={3} paddingLeft={4} marginY={2} className="relative border-l-2 border-line">
        {buffer.steps.map((step, idx) => {
          const style = TYPE_STYLES[step.type] || TYPE_STYLES.staging;
          const StepIcon = style.icon;

          return (
            <Box key={idx} className="relative group">
              {/* Timeline Connector Dot */}
              <Box
                className={`absolute -left-6 top-3 w-3 h-3 rounded-full border-2 border-bg ${style.dot} transition-transform group-hover:scale-125`}
              />

              <Box padding={4} radius="md" surface="card" border className="transition-all hover:border-accent/40">
                <Box display="flex" align="center" justify="between" wrap gap={2} marginBottom={2}>
                  <Box display="flex" align="center" gap={2}>
                    <Box padding={1} radius="md" className={`border ${style.badge}`}>
                      <StepIcon className="w-4 h-4" />
                    </Box>
                    <Box as="span" className="text-sm font-bold text-text-main">
                      {step.label}
                    </Box>
                  </Box>

                  <Box display="flex" align="center" gap={2}>
                    <Box paddingX={2} paddingY={1} radius="md" className={`text-xs font-mono font-semibold border ${style.badge}`}>
                      {step.time}
                    </Box>
                    {step.duration && (
                      <Box paddingX={2} paddingY={1} radius="md" surface="card" border className="text-xs font-mono text-text-dim">
                        {step.duration}
                      </Box>
                    )}
                  </Box>
                </Box>

                {step.description && (
                  <Box paddingLeft={6} className="text-xs text-text-dim leading-relaxed">
                    {step.description}
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Stack>

      {/* Logistics Stats Bar */}
      <Grid cols={{ default: 2, sm: 4 }} gap={3}>
        <Box padding={3} radius="md" surface="card" border className="text-center">
          <Box as="span" className="text-xs font-mono text-text-dim block">Warmup</Box>
          <Box as="span" className="text-base font-bold text-accent font-mono">{buffer.warmupMinutes} mins</Box>
        </Box>
        <Box padding={3} radius="md" surface="card" border className="text-center">
          <Box as="span" className="text-xs font-mono text-text-dim block">Hotel Settle</Box>
          <Box as="span" className="text-base font-bold text-text-main font-mono">{buffer.hotelSettleMinutes} mins</Box>
        </Box>
        <Box padding={3} radius="md" surface="card" border className="text-center">
          <Box as="span" className="text-xs font-mono text-text-dim block">Transit</Box>
          <Box as="span" className="text-base font-bold text-text-main font-mono">{buffer.transitMinutes} mins</Box>
        </Box>
        <Box padding={3} radius="md" surface="card" border className="text-center">
          <Box as="span" className="text-xs font-mono text-text-dim block">Earliest Staging</Box>
          <Box as="span" className="text-base font-bold text-accent font-mono">{buffer.earliestStagingTime}</Box>
        </Box>
      </Grid>
    </Stack>
  );
}
