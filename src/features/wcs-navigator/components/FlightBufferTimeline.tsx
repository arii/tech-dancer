import React, { useState, useMemo } from 'react';
import { Box, Stack } from '@/layouts/Primitives';
import { FlightBuffer, BufferStep } from '../types';
import { Plane, Home, Flame, Clock, Calendar, MapPin, Hourglass, ChevronDown, ChevronUp, Calculator } from 'lucide-react';

export interface FlightBufferTimelineProps {
  buffer?: FlightBuffer;
  className?: string;
}

const DEFAULT_BUFFER: FlightBuffer = {
  earliestStagingTime: 'Fri 5:15 PM',
  warmupMinutes: 60,
  hotelSettleMinutes: 90,
  transitMinutes: 30,
  latestFlightArrivalDeadline: 'Fri 2:15 PM',
  formulaSummary: 'Target Flight Landing (2:15 PM) + 30m Transit + 90m Hotel Settle + 60m Warmup = Earliest Staging (5:15 PM)',
  steps: [
    {
      type: 'flight',
      label: 'Target Flight Landing Deadline',
      time: '02:15 PM',
      duration: 'Deadline Target',
      description: 'Recommended latest flight touchdown time needed to guarantee on-time staging without rushing.',
    },
    {
      type: 'transit',
      label: 'SJC Airport to Venue Transit',
      time: '02:15 PM',
      duration: '30 mins',
      description: 'Taxi / Rideshare buffer from San Jose Mineta Airport to DoubleTree hotel.',
    },
    {
      type: 'hotel',
      label: 'Hotel Check-in & Wardrobe Settle',
      time: '02:45 PM',
      duration: '90 mins',
      description: 'Room check-in, outfit change, dance shoe setup & freshen up.',
    },
    {
      type: 'warmup',
      label: 'Warmup & Bib Registration Window',
      time: '04:15 PM',
      duration: '60 mins',
      description: 'Physical dynamic stretch, floor speed test & competitor bib collection.',
    },
    {
      type: 'staging',
      label: 'Novice Strictly Swing Staging Call',
      time: '05:15 PM',
      duration: 'Event Anchor',
      description: 'Grand Ballroom Marshalling & Prelims check-in.',
    },
  ],
};

const TYPE_STYLES = {
  staging: {
    badge: 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40',
    icon: Calendar,
  },
  warmup: {
    badge: 'bg-brand-amber/20 text-brand-amber border-brand-amber/40',
    icon: Flame,
  },
  hotel: {
    badge: 'bg-surface text-text-main border-line',
    icon: Home,
  },
  transit: {
    badge: 'bg-surface text-text-main border-line',
    icon: Clock,
  },
  flight: {
    badge: 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40',
    icon: Plane,
  },
};

export const FlightBufferTimeline = ({ buffer = DEFAULT_BUFFER, className }: FlightBufferTimelineProps) => {
  const [showFormula, setShowFormula] = useState(false);

  // Ensure chronological top-to-bottom flow (earliest flight arrival first, ending at staging call)
  const chronologicalSteps = useMemo(() => {
    const rawSteps = buffer.steps || [];
    if (rawSteps.length === 0) return DEFAULT_BUFFER.steps;
    
    // If the first item is staging and last is flight, reverse it to chronological order
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
          <Box as="h3" className="text-lg font-bold text-text-main">
            Travel &amp; Arrival Timeline
          </Box>
          <Box as="p" className="text-xs text-text-dim">
            Chronological step-by-step buffer from flight touchdown to competition staging
          </Box>
        </Stack>
        <Box paddingX={3} paddingY={1} radius="md" surface="card" border className="text-xs font-mono text-accent font-semibold">
          Latest Arrival: {buffer.latestFlightArrivalDeadline}
        </Box>
      </Box>

      {/* Collapsible Calculation Details Toggle */}
      <div className="flex flex-col space-y-2">
        <button
          type="button"
          onClick={() => setShowFormula(!showFormula)}
          className="self-start inline-flex items-center gap-1.5 text-xs text-text-dim hover:text-accent font-mono transition-colors cursor-pointer"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>{showFormula ? 'Hide calculation details' : 'View calculation details'}</span>
          {showFormula ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showFormula && (
          <div className="p-4 rounded-xl border border-accent/30 bg-accent/5 transition-all animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
              <span className="text-[11px] font-mono font-semibold text-text-dim uppercase tracking-wider">
                Arrival Timeline Formula
              </span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-text-main font-semibold leading-relaxed">
              {buffer.formulaSummary}
            </p>
          </div>
        )}
      </div>

      {/* Structure by Explicit Date Header */}
      <div className="w-full bg-surface/90 border border-line rounded-2xl overflow-hidden shadow-lg">
        <div className="bg-muted/70 px-5 py-3 border-b border-line flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-cyan" />
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-text-main">
              📅 Friday Arrival &amp; Competition Day
            </span>
          </div>
          <span className="text-[11px] font-mono text-text-dim">
            {chronologicalSteps.length} Time Blocks
          </span>
        </div>

        {/* Chronological Time Stream (Top to Bottom) */}
        <div className="p-4 sm:p-6 space-y-3.5">
          {chronologicalSteps.map((step: BufferStep, idx: number) => {
            const style = TYPE_STYLES[step.type] || TYPE_STYLES.staging;

            return (
              <div
                key={idx}
                className="group relative flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 p-4 rounded-xl bg-muted/40 border border-line/60 hover:border-accent/50 transition-all shadow-sm"
              >
                {/* Dedicated Left Time Column */}
                <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-1 sm:w-28 shrink-0">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-accent">
                    <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>{step.time}</span>
                  </div>
                  {step.duration && (
                    <div className="flex items-center gap-1 text-[11px] font-mono text-text-dim">
                      <Hourglass className="w-3 h-3 shrink-0" />
                      <span>{step.duration}</span>
                    </div>
                  )}
                </div>

                {/* Vertical Divider for sm+ screens */}
                <div className="hidden sm:block w-px self-stretch bg-line/60 my-0.5 shrink-0" />

                {/* Card Content: Title First, then Metadata */}
                <div className="flex flex-col space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className="text-sm sm:text-base font-bold text-text-main leading-snug group-hover:text-accent transition-colors">
                      {step.label}
                    </h4>
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${style.badge} shrink-0`}>
                      <span className="capitalize">{step.type}</span>
                    </span>
                  </div>

                  {step.description && (
                    <div className="flex items-start gap-1.5 text-xs text-text-dim leading-relaxed">
                      <MapPin className="w-3.5 h-3.5 text-accent/80 shrink-0 mt-0.5" />
                      <span>{step.description}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Stack>
  );
};


