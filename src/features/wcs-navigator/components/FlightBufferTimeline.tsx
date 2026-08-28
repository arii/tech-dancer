import { useState } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { FlightBuffer } from '../types';

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
      time: '02:15 PM',
      duration: '',
      description: '',
    },
    {
      type: 'transit',
      label: 'Airport-to-Venue Transit',
      time: '02:15 PM',
      duration: '',
      description: '',
    },
    {
      type: 'hotel',
      label: 'Hotel Check-in & Wardrobe Settle',
      time: '02:45 PM',
      duration: '',
      description: '',
    },
    {
      type: 'warmup',
      label: 'Warmup & Floor Check',
      time: '04:15 PM',
      duration: '',
      description: '',
    },
    {
      type: 'staging',
      label: 'Competition Staging Call',
      time: '05:15 PM',
      duration: '',
      description: '',
    },
  ],
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

  const cleanTime = (t: string) => {
    const m = t.match(/\d{1,2}:\d{2}\s*(?:AM|PM)/i);
    return m ? m[0] : t;
  };

  const totalBufferMins = (buffer.transitMinutes || 30) + (buffer.hotelSettleMinutes || 90) + (buffer.warmupMinutes || 60);
  const deadlineWithoutOffset = formatOffsetTime(buffer.earliestStagingTime, -totalBufferMins);
  const flightLandingTime = formatOffsetTime(deadlineWithoutOffset, activeOffset);

  const transitStart = flightLandingTime;
  const hotelStart = formatOffsetTime(transitStart, buffer.transitMinutes || 30);
  const warmupStart = formatOffsetTime(hotelStart, buffer.hotelSettleMinutes || 90);
  const stagingTime = buffer.earliestStagingTime;

  const steps = [
    {
      id: 'flight',
      label: 'Flight Touchdown Target',
      time: cleanTime(flightLandingTime),
      isFlight: true,
    },
    {
      id: 'transit',
      label: `Airport to Venue Transit (${buffer.transitMinutes || 30}m)`,
      time: cleanTime(transitStart),
    },
    {
      id: 'hotel',
      label: `Hotel Check-in & Wardrobe (${buffer.hotelSettleMinutes || 90}m)`,
      time: cleanTime(hotelStart),
    },
    {
      id: 'warmup',
      label: `Warmup & Floor Check (${buffer.warmupMinutes || 60}m)`,
      time: cleanTime(warmupStart),
    },
    {
      id: 'staging',
      label: 'Competition Staging Call',
      time: cleanTime(stagingTime),
      isStaging: true,
    },
  ];

  return (
    <Stack gap={5} width="full" className={className}>
      {/* Editorial Header */}
      <Box display="flex" align="start" justify="between" wrap gap={2} className="pb-2 border-b border-line/40">
        <Stack gap={0.5}>
          <Text as="h3" variant="body-bold" size="lg" color="main" className="text-base sm:text-lg">
            Travel &amp; Arrival Timeline
          </Text>
          <Text size="xs" color="dim">
            Calculated backward from your earliest call ({buffer.earliestStagingTime}) • Total required buffer: <span className="text-text-main font-semibold">{totalBufferHours}h ({totalBufferMinutes}m)</span>
          </Text>
        </Stack>
      </Box>

      {/* Editorial Continuous Vertical Line Timeline */}
      <Box className="relative pl-6 border-l border-line/60 space-y-6 my-2">
        {steps.map((step) => {
          return (
            <Box key={step.id} className="relative group">
              {/* Subtle timeline node marker */}
              <Box
                className={`w-2 h-2 rounded-full absolute -left-[29px] top-1.5 ring-4 ring-bg transition-colors ${
                  step.isFlight || step.isStaging ? 'bg-text-main' : 'bg-slate-500 group-hover:bg-text-main'
                }`}
              />

              <Box display="flex" align="start" justify="between" wrap gap={3}>
                <Stack gap={1} flex={1} className="min-w-0">
                  <Box display="flex" align="center" gap={2} wrap>
                    <Text
                      weight={step.isFlight || step.isStaging ? 'font-bold' : 'font-medium'}
                      size="sm"
                      className={step.isFlight || step.isStaging ? 'text-text-main' : 'text-text-dim'}
                    >
                      {step.label}
                    </Text>

                    {/* Inline Flight Shift Modifiers directly in row */}
                    {step.isFlight && (
                      <Box display="flex" align="center" gap={1.5} className="text-xs font-mono text-text-dim">
                        <span className="text-line">|</span>
                        <span>Shift:</span>
                        {[-30, -15, 15, 30].map((delta) => (
                          <Box
                            key={delta}
                            as="button"
                            type="button"
                            onClick={() => handleOffsetChange(delta)}
                            className="hover:text-text-main text-text-dim cursor-pointer underline-offset-2 hover:underline"
                          >
                            {delta > 0 ? `+${delta}m` : `${delta}m`}
                          </Box>
                        ))}
                        {activeOffset !== 0 && (
                          <Box
                            as="button"
                            type="button"
                            onClick={handleResetOffset}
                            className="text-brand-terminal-red underline hover:opacity-80 cursor-pointer ml-1"
                          >
                            Reset
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                </Stack>

                <Text
                  variant="mono"
                  size="xs"
                  weight="font-bold"
                  className={`shrink-0 ${step.isFlight || step.isStaging ? 'text-text-main font-bold' : 'text-text-dim'}`}
                >
                  {step.time}
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Stack>
  );
};
