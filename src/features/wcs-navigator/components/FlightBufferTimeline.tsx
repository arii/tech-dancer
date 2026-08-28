import { Box, Stack, Text } from '@/layouts/Primitives';
import { FlightBuffer } from '../types';

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
  formulaSummary: 'Target Arrival (2:15 PM) + 30m Transit + 90m Hotel Settle + 60m Warmup = First Event (5:15 PM)',
  steps: [
    {
      type: 'flight',
      label: 'Recommended Venue Arrival',
      time: '02:15 PM',
      duration: '',
      description: '',
    },
    {
      type: 'hotel',
      label: 'Hotel Check-in & Wardrobe',
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
      label: 'First Event / Competition Staging Call',
      time: '05:15 PM',
      duration: '',
      description: '',
    },
  ],
};

export const FlightBufferTimeline = ({
  buffer = DEFAULT_BUFFER,
  className,
}: FlightBufferTimelineProps) => {
  const totalBufferMinutes = (buffer.transitMinutes || 30) + (buffer.hotelSettleMinutes || 90) + (buffer.warmupMinutes || 60);
  const totalBufferHours = (totalBufferMinutes / 60).toFixed(1).replace('.0', '');

  const cleanTime = (t: string) => {
    const m = t.match(/\d{1,2}:\d{2}\s*(?:AM|PM)/i);
    return m ? m[0] : t;
  };

  const steps = [
    {
      id: 'arrival',
      label: 'Recommended Arrival Time',
      time: cleanTime(buffer.latestFlightArrivalDeadline || '02:15 PM'),
      isHighlight: false,
    },
    {
      id: 'hotel',
      label: `Hotel Check-in & Settle (${buffer.hotelSettleMinutes || 90}m)`,
      time: '02:45 PM',
      isHighlight: false,
    },
    {
      id: 'warmup',
      label: `Warmup & Floor Check (${buffer.warmupMinutes || 60}m)`,
      time: '04:15 PM',
      isHighlight: false,
    },
    {
      id: 'staging',
      label: 'First Event / Competition Staging Call',
      time: cleanTime(buffer.earliestStagingTime),
      isHighlight: true,
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
            Prioritizing your earliest call ({buffer.earliestStagingTime}) • Total required buffer: <span className="text-text-main font-semibold">{totalBufferHours}h ({totalBufferMinutes}m)</span>
          </Text>
        </Stack>
      </Box>

      {/* Editorial Continuous Vertical Line Timeline */}
      <div className="relative pl-6 border-l border-line/60 space-y-6 my-2">
        {steps.map((step) => (
          <div key={step.id} className="relative group">
            {/* Subtle timeline node marker */}
            <div
              className={`w-2 h-2 rounded-full absolute -left-[29px] top-1.5 ring-4 ring-bg transition-colors ${
                step.isHighlight ? 'bg-brand-cyan ring-brand-cyan/20' : 'bg-slate-500 group-hover:bg-text-main'
              }`}
            />

            <div className="flex items-start justify-between flex-wrap gap-3">
              <div className="flex-1 min-w-0 space-y-0.5">
                <span
                  className={`text-sm ${
                    step.isHighlight ? 'font-bold text-text-main text-brand-cyan' : 'font-medium text-text-dim'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              <span
                className={`font-mono text-xs shrink-0 ${
                  step.isHighlight ? 'text-brand-cyan font-bold' : 'text-text-dim'
                }`}
              >
                {step.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Stack>
  );
};
