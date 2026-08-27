
import { useMemo } from 'react';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { FlightBuffer, BufferStep } from '../types';
import { Plane, Home, Flame, Clock, Calendar, Hourglass, ShieldCheck, Car } from 'lucide-react';

export interface FlightBufferTimelineProps {
  buffer?: FlightBuffer;
  className?: string;
  flightOffsetMinutes?: number;
  onFlightOffsetChange?: (offsetMinutes: number) => void;
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

export const FlightBufferTimeline = ({
  buffer = DEFAULT_BUFFER,
  className,
  flightOffsetMinutes = 0,
  onFlightOffsetChange,
}: FlightBufferTimelineProps) => {
  const [internalOffset, setInternalOffset] = useState(0);
  const activeOffset = flightOffsetMinutes !== undefined && onFlightOffsetChange ? flightOffsetMinutes : internalOffset;

  const handleOffsetChange = (delta: number) => {
    const newOffset = activeOffset + delta;
    if (onFlightOffsetChange) {
      onFlightOffsetChange(newOffset);
    } else {
      setInternalOffset(newOffset);
    }
  };

  const handleResetOffset = () => {
    if (onFlightOffsetChange) {
      onFlightOffsetChange(0);
    } else {
      setInternalOffset(0);
    }
  };

  const totalBufferMinutes = (buffer.transitMinutes || 30) + (buffer.hotelSettleMinutes || 90) + (buffer.warmupMinutes || 60);
  const totalBufferHours = (totalBufferMinutes / 60).toFixed(1).replace('.0', '');

  // Helper to parse time string like "02:15 PM" or "2:15 PM (Friday)" and add offset minutes
  const formatOffsetTime = (timeStr: string, offsetMins: number): string => {
    if (offsetMins === 0) return timeStr;
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!match) return timeStr;

    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const ampm = match[3].toUpperCase();

    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;

    let totalMins = hours * 60 + minutes + offsetMins;
    if (totalMins < 0) totalMins += 24 * 60;
    totalMins = totalMins % (24 * 60);

    let newHours = Math.floor(totalMins / 60);
    const newMins = totalMins % 60;
    const newAmpm = newHours >= 12 ? 'PM' : 'AM';
    newHours = newHours % 12;
    if (newHours === 0) newHours = 12;

    const formattedMins = newMins < 10 ? `0${newMins}` : `${newMins}`;
    const formattedHours = newHours < 10 ? `0${newHours}` : `${newHours}`;

    return timeStr.replace(/(\d{1,2}):(\d{2})\s*(AM|PM)/i, `${formattedHours}:${formattedMins} ${newAmpm}`);
  };

  // Ensure chronological top-to-bottom flow (earliest flight arrival first, ending at staging call)
  const chronologicalSteps = useMemo(() => {
    const rawSteps = buffer.steps || [];
    const stepsToUse = rawSteps.length === 0 ? DEFAULT_BUFFER.steps : rawSteps;

    let ordered = [...stepsToUse];
    if (ordered[0]?.type === 'staging' && ordered[ordered.length - 1]?.type === 'flight') {
      ordered = ordered.reverse();
    }

    if (activeOffset === 0) return ordered;

    return ordered.map((step) => {
      if (step.type === 'staging') return step; // Staging call is fixed

      // Adjust time string
      if (step.time.includes('→')) {
        const parts = step.time.split('→').map((p) => p.trim());
        const adjustedStart = formatOffsetTime(parts[0], activeOffset);
        const adjustedEnd = formatOffsetTime(parts[1], activeOffset);
        return { ...step, time: `${adjustedStart} → ${adjustedEnd}` };
      }
      return { ...step, time: formatOffsetTime(step.time, activeOffset) };
    });
  }, [buffer.steps, activeOffset]);

  const adjustedLandingDeadline = useMemo(
    () => formatOffsetTime(buffer.latestFlightArrivalDeadline, activeOffset),
    [buffer.latestFlightArrivalDeadline, activeOffset]
  );

  const hasScheduleConflict = activeOffset > 0;

  return (
    <Stack gap={4} className={className}>
      {/* Header Banner */}
      <Box display="flex" align="center" justify="between" wrap gap={2}>
        <Stack gap={1}>
          <Stack direction="row" align="center" gap={2}>
            <Clock className="w-5 h-5 text-accent shrink-0" />
            <Text as="h3" variant="body-lg" weight="font-bold" color="main">
              Travel &amp; Arrival Timeline
            </Text>
          </Stack>
          <Text size="xs" color="dim">
            Calculated backward from your earliest mandatory event call to guarantee zero rushing
          </Text>
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
          <Text variant="mono" size="micro" color="dim" uppercase tracking="wider">
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
          justify="between"
          gap={2}
          className={`transition-all shadow-sm ${
            hasScheduleConflict
              ? 'border-brand-terminal-red/50 bg-brand-terminal-red/10'
              : 'border-brand-cyan/40 bg-brand-cyan/10'
          }`}
        >
          <Box display="flex" align="center" justify="between" width="full" gap={1}>
            <Text
              variant="mono"
              size="micro"
              uppercase
              tracking="wider"
              className={hasScheduleConflict ? 'text-brand-terminal-red' : 'text-brand-cyan'}
            >
              ✈️ Landing Target {activeOffset !== 0 ? `(${activeOffset > 0 ? '+' : ''}${activeOffset}m)` : ''}
            </Text>

            {activeOffset !== 0 && (
              <Box
                as="button"
                type="button"
                onClick={handleResetOffset}
                className="font-mono underline text-dim hover:text-main cursor-pointer"
              >
                <Text variant="mono" size="micro">Reset</Text>
              </Box>
            )}
          </Box>

          <Text
            variant="body-lg"
            weight="font-bold"
            className={`font-mono text-base sm:text-lg ${
              hasScheduleConflict ? 'text-brand-terminal-red' : 'text-brand-cyan'
            }`}
          >
            {adjustedLandingDeadline}
          </Text>

          {/* Time Adjustment Controls */}
          <Box display="flex" align="center" gap={1.5}>
            <Box
              as="button"
              type="button"
              onClick={() => handleOffsetChange(-30)}
              paddingX={2}
              paddingY={1}
              radius="md"
              surface="muted"
              border
              className="min-h-7 border-line text-main hover:border-accent hover:text-accent cursor-pointer transition-colors"
              aria-label="Land 30 minutes earlier"
            >
              <Text variant="mono" size="micro">-30m</Text>
            </Box>
            <Box
              as="button"
              type="button"
              onClick={() => handleOffsetChange(30)}
              paddingX={2}
              paddingY={1}
              radius="md"
              surface="muted"
              border
              className="min-h-7 border-line text-main hover:border-accent hover:text-accent cursor-pointer transition-colors"
              aria-label="Land 30 minutes later"
            >
              <Text variant="mono" size="micro">+30m</Text>
            </Box>
            <Box marginLeft="auto">
              <Text variant="mono" size="micro" color="dim">
                Simulate flight shift
              </Text>
            </Box>
          </Box>
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
          <Text variant="mono" size="micro" color="dim" uppercase tracking="wider">
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
            <Text variant="mono" size="micro" color="main" weight="font-bold" uppercase tracking="wider">
              📅 Friday Arrival &amp; Competition Day Breakdown
            </Text>
          </Box>
          <Text variant="mono" size="micro" color="dim">
            {chronologicalSteps.length} Sequential Steps
          </Text>
        </Box>

        {/* Static Chronological Steps with Continuous Vertical Connector Line */}
        <Box className="relative">
          {/* Continuous vertical connector line linking icon centers */}
          <Box className="w-0.5 bg-line/70 absolute left-9 top-6 bottom-6 z-0" />

          <Stack gap={0} className="divide-y divide-line/40 relative z-10">
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
                  className="hover:bg-surface transition-colors"
                >
                  {/* Left Side: Icon & Time Window */}
                  <Box display="flex" align="center" gap={4} className="min-w-60 shrink-0">
                    <Box
                      padding={2.5}
                      radius="lg"
                      border
                      display="flex"
                      align="center"
                      justify="center"
                      className={`w-10 h-10 ${config.iconBg} shrink-0 relative z-10 bg-surface`}
                    >
                      <StepIcon className="w-5 h-5" />
                    </Box>

                    <Stack gap={0.5}>
                      <Text variant="body-sm" weight="font-bold" className="font-mono text-accent text-sm sm:text-base">
                        {step.time}
                      </Text>
                      {step.duration && (
                        <Box display="flex" align="center" gap={1}>
                          <Hourglass className="w-3 h-3 text-text-dim shrink-0" />
                          <Text variant="mono" size="micro" color="dim">{step.duration}</Text>
                        </Box>
                      )}
                    </Stack>
                  </Box>

                  {/* Right Side: Title & Description */}
                  <Box flex={1} className="min-w-0">
                    <Stack gap={1}>
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
                </Box>
              );
            })}
          </Stack>
        </Box>
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
        <Box paddingTop={0.5}>
          <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
        </Box>
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



