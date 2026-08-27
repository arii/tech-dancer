import React, { useMemo } from 'react';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { FlightBuffer, BufferStep } from '../types';
import { Plane, Home, Flame, Clock, Calendar, Hourglass, ShieldCheck, Car } from 'lucide-react';

export interface FlightBufferTimelineProps {
  buffer?: FlightBuffer;
  className?: string;
}

const DEFAULT_BUFFER: FlightBuffer = {
  earliestStagingTime: '5:15 PM (Friday)',
  warmupMinutes: 60,
  hotelSettleMinutes: 90,
  transitMinutes: 30,
  latestFlightArrivalDeadline: '2:15 PM (Friday)',
  formulaSummary: 'Target Flight Landing (2:15 PM) + 30m Transit + 90m Hotel Settle + 60m Warmup = Earliest Staging (5:15 PM)',
  steps: [
    {
      type: 'flight',
      label: 'Target Flight Landing Deadline',
      time: '02:15 PM Touchdown',
      duration: 'Deadline Target',
      description: 'Recommended latest wheels-down time to account for deplaning and baggage collection.',
    },
    {
      type: 'transit',
      label: 'Airport-to-Venue Transit',
      time: '02:15 PM → 02:45 PM',
      duration: '30 mins',
      description: 'Dedicated rideshare or shuttle buffer from airport terminal directly to host hotel.',
    },
    {
      type: 'hotel',
      label: 'Hotel Check-in & Wardrobe Settle',
      time: '02:45 PM → 04:15 PM',
      duration: '90 mins',
      description: 'Room check-in, unpacking dance wardrobe, shoe prep, and freshening up.',
    },
    {
      type: 'warmup',
      label: 'Warmup & Floor Check',
      time: '04:15 PM → 05:15 PM',
      duration: '60 mins',
      description: 'Competitor bib registration, physical dynamic stretch, and ballroom floor test.',
    },
    {
      type: 'staging',
      label: 'Competition Staging Call',
      time: '05:15 PM Staging Call',
      duration: 'Mandatory Call',
      description: 'Earliest division roll call. Competitors must report to ballroom marshalling.',
    },
  ],
};

const TYPE_CONFIG = {
  flight: {
    iconBg: 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40',
    icon: Plane,
  },
  transit: {
    iconBg: 'bg-muted/70 text-text-dim border-line',
    icon: Car,
  },
  hotel: {
    iconBg: 'bg-muted/70 text-text-dim border-line',
    icon: Home,
  },
  warmup: {
    iconBg: 'bg-brand-amber/20 text-brand-amber border-brand-amber/40',
    icon: Flame,
  },
  staging: {
    iconBg: 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40',
    icon: Calendar,
  },
};

export const FlightBufferTimeline = ({ buffer = DEFAULT_BUFFER, className }: FlightBufferTimelineProps) => {
  const totalBufferMinutes = (buffer.transitMinutes || 30) + (buffer.hotelSettleMinutes || 90) + (buffer.warmupMinutes || 60);
  const totalBufferHours = (totalBufferMinutes / 60).toFixed(1).replace('.0', '');

  // Ensure chronological top-to-bottom flow (earliest flight arrival first, ending at staging call)
  const chronologicalSteps = useMemo(() => {
    const rawSteps = buffer.steps || [];
    if (rawSteps.length === 0) return DEFAULT_BUFFER.steps;
    
    if (rawSteps[0]?.type === 'staging' && rawSteps[rawSteps.length - 1]?.type === 'flight') {
      return [...rawSteps].reverse();
    }
    return rawSteps;
  }, [buffer.steps]);

  return (
    <Stack gap={4} className={className}>
      {/* Header Banner */}
      <Box display="flex" align="center" justify="between" wrap gap={2}>
        <Stack gap={1}>
          <Box as="h3" className="text-lg font-bold text-text-main flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" />
            <span>Travel &amp; Arrival Timeline</span>
          </Box>
          <Box as="p" className="text-xs text-text-dim">
            Calculated backward from your earliest mandatory event call to guarantee zero rushing
          </Box>
        </Stack>
      </Box>

      {/* ⏱️ 1. Direct Time Summary Row (High Contrast) */}
      <Grid cols={{ default: 1, sm: 3 }} gap={3}>
        <Box
          padding={4}
          radius="lg"
          surface="card"
          border
          display="flex"
          direction="column"
          gap={1}
          className="border-line bg-surface/90"
        >
          <Text variant="caption-bold" color="dim" className="text-[11px] font-mono uppercase tracking-wider">
            🏆 Earliest Event Call
          </Text>
          <Text variant="body-lg" weight="font-bold" color="main" className="font-mono text-base sm:text-lg">
            {buffer.earliestStagingTime}
          </Text>
        </Box>

        <Box
          padding={4}
          radius="lg"
          surface="card"
          border
          display="flex"
          direction="column"
          gap={1}
          className="border-brand-cyan/40 bg-brand-cyan/10 shadow-sm"
        >
          <Text variant="caption-bold" className="text-[11px] font-mono uppercase tracking-wider text-brand-cyan">
            ✈️ Target Landing Deadline
          </Text>
          <Text variant="body-lg" weight="font-bold" className="font-mono text-base sm:text-lg text-brand-cyan">
            {buffer.latestFlightArrivalDeadline}
          </Text>
        </Box>

        <Box
          padding={4}
          radius="lg"
          surface="card"
          border
          display="flex"
          direction="column"
          gap={1}
          className="border-line bg-surface/90"
        >
          <Text variant="caption-bold" color="dim" className="text-[11px] font-mono uppercase tracking-wider">
            ⏱️ Total Required Buffer
          </Text>
          <Text variant="body-lg" weight="font-bold" color="main" className="font-mono text-base sm:text-lg">
            {totalBufferHours} Hours ({totalBufferMinutes} mins)
          </Text>
        </Box>
      </Grid>

      {/* 📊 2. Static Scannable Breakdown List */}
      <Box surface="card" radius="xl" border className="border-line/80 overflow-hidden shadow-md">
        <Box paddingX={5} paddingY={3} surface="muted" border="b" display="flex" align="center" justify="between" className="border-line">
          <Box display="flex" align="center" gap={2}>
            <Calendar className="w-4 h-4 text-brand-cyan" />
            <Text variant="caption-bold" color="main" className="text-xs font-mono uppercase tracking-wider">
              📅 Friday Arrival &amp; Competition Day Breakdown
            </Text>
          </Box>
          <Text variant="caption-subtle" color="dim" className="text-[11px] font-mono">
            {chronologicalSteps.length} Sequential Steps
          </Text>
        </Box>

        {/* Static Chronological Steps */}
        <Stack gap={0} className="divide-y divide-line/40">
          {chronologicalSteps.map((step: BufferStep, idx: number) => {
            const config = TYPE_CONFIG[step.type] || TYPE_CONFIG.staging;
            const StepIcon = config.icon;

            return (
              <Box
                key={idx}
                paddingX={5}
                paddingY={4}
                display="flex"
                direction={{ default: 'column', sm: 'row' }}
                align={{ default: 'start', sm: 'center' }}
                justify="between"
                gap={4}
                className="hover:bg-muted/30 transition-colors"
              >
                {/* Left Side: Generous Icon & Clear Time Window */}
                <Box display="flex" align="center" gap={4} className="min-w-[240px] shrink-0">
                  <Box
                    padding={2.5}
                    radius="lg"
                    border
                    display="flex"
                    align="center"
                    justify="center"
                    className={`w-10 h-10 ${config.iconBg} shrink-0`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </Box>

                  <Stack gap={0.5}>
                    <Text variant="body-sm" weight="font-bold" className="font-mono text-accent text-sm sm:text-base">
                      {step.time}
                    </Text>
                    {step.duration && (
                      <Text variant="caption-subtle" color="dim" className="text-[11px] font-mono flex items-center gap-1">
                        <Hourglass className="w-3 h-3 text-text-dim shrink-0" />
                        <span>{step.duration}</span>
                      </Text>
                    )}
                  </Stack>
                </Box>

                {/* Right Side: Bold Title First, Then Explanation */}
                <Stack gap={1} className="flex-1 min-w-0">
                  <Text variant="body-sm" weight="font-bold" color="main" className="text-base">
                    {step.label}
                  </Text>

                  {step.description && (
                    <Text variant="caption-subtle" color="dim" className="text-xs leading-relaxed">
                      {step.description}
                    </Text>
                  )}
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Box>

      {/* 💡 3. Friendly Mathematical Validation Text Callout */}
      <Box
        padding={4}
        radius="lg"
        surface="muted"
        border
        display="flex"
        align="start"
        gap={3}
        className="border-line/70 bg-surface/60"
      >
        <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <Stack gap={1}>
          <Text variant="caption-bold" color="main" className="font-mono text-xs">
            Why {buffer.latestFlightArrivalDeadline.split(' ')[0]}?
          </Text>
          <Text variant="caption-subtle" color="dim" className="text-xs leading-relaxed">
            We take your earliest mandatory call time (<span className="text-text-main font-semibold">{buffer.earliestStagingTime}</span>) and calculate backward through warmup ({buffer.warmupMinutes}m), hotel logistics ({buffer.hotelSettleMinutes}m), and transit ({buffer.transitMinutes}m) to guarantee you are never rushed on competition day.
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};



