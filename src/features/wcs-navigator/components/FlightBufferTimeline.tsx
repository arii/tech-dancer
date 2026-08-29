import { Box, Stack, Grid } from '@/layouts/Primitives';
import { MapPin, Navigation, Luggage, Coffee } from 'lucide-react';

export interface FlightBufferTimelineProps {
  activeEventName?: string;
  className?: string;
}

interface EventLogistics {
  venueName: string;
  primaryAirport: string;
  transitTip: string;
  baggageAndCheckin: string;
  foodAndHydration: string;
  travelBuffer: string;
}

const EVENT_LOGISTICS_MAP: Record<string, EventLogistics> = {
  'boogie-by-the-bay': {
    venueName: 'Hyatt Regency San Francisco Airport (Burlingame, CA)',
    primaryAirport: 'SFO (San Francisco Int’l) — 5 mins away',
    transitTip: 'Complimentary 24/7 Hyatt Airport Shuttle departs every 15-20 mins from SFO departures level. No rental car or rideshare needed.',
    baggageAndCheckin: 'Complimentary bell desk luggage holding available prior to standard 3:00 PM check-in. 3rd-floor atrium connects directly to Grand Ballroom.',
    foodAndHydration: 'On-site 24/7 market & Starbucks in lobby; Broadway Burlingame dining strip is a 5-min rideshare or 15-min walk.',
    travelBuffer: 'Target SFO landing by 2:30 PM Friday for zero-rush ballroom check-in before evening workshops.',
  },
  'south-bay-dance-fling': {
    venueName: 'DoubleTree by Hilton San Jose / Silicon Valley',
    primaryAirport: 'SJC (Mineta San Jose Int’l) — 7 mins away',
    transitTip: 'Free hotel airport shuttle runs continuously between SJC Terminals A/B and hotel entrance. SFO is 35-45 mins with variable 101 traffic.',
    baggageAndCheckin: 'Front desk early bag holding available; elevator bank leads straight to competition ballroom foyer and registration desk.',
    foodAndHydration: '24-hour convenience pantry in lobby; multiple fast-casual restaurants within 0.3 miles on Gateway Place.',
    travelBuffer: 'Target SJC landing by 2:15 PM Friday to allow smooth check-in and full warmup before 5:00 PM Novice staging calls.',
  },
  'halloween-swingthing': {
    venueName: 'Hyatt Regency John Wayne Airport (Irvine/Newport Beach, CA)',
    primaryAirport: 'SNA (John Wayne Airport) — 5 mins away',
    transitTip: 'Free on-demand SNA airport shuttle. Highly recommended over LAX to avoid 405 freeway traffic.',
    baggageAndCheckin: 'Spacious luggage drop at registration lobby; dedicated costume change suites adjacent to ballroom wing.',
    foodAndHydration: 'Lobby cafe & full restaurant on-site; Newport Beach dining plaza 5 mins away.',
    travelBuffer: 'Land at SNA by 3:00 PM Friday for easy hotel settling and costume prep.',
  },
  'the-open': {
    venueName: 'Marriott Burbank Airport & Convention Center (Burbank, CA)',
    primaryAirport: 'BUR (Hollywood Burbank Airport) — 3 mins away (across street)',
    transitTip: 'Walkable or 2-minute complimentary shuttle from BUR terminals. LAX is 45-75+ minutes away.',
    baggageAndCheckin: 'Convention center wing features dedicated competitor registration pavilion and staging warm-up halls.',
    foodAndHydration: 'Multiple dining options on Hollywood Way; hotel market stocked with dancer hydration essentials.',
    travelBuffer: 'Book flights into BUR for the fastest gate-to-ballroom transition in the WCS circuit.',
  },
  'the-after-party': {
    venueName: 'Holiday Inn Orange County Airport (Santa Ana, CA)',
    primaryAirport: 'SNA (John Wayne Airport) — 6 mins away',
    transitTip: 'Complimentary hotel shuttle to/from John Wayne Airport (SNA).',
    baggageAndCheckin: 'Bell desk baggage check-in and early dancer check-in suites.',
    foodAndHydration: 'On-site hotel lounge & dining; local cafes nearby on Dyer Road.',
    travelBuffer: 'Target SNA touchdown by 3:15 PM Friday for evening peer jam and welcome mixer.',
  },
};

const DEFAULT_LOGISTICS: EventLogistics = {
  venueName: 'Host Hotel & Convention Center',
  primaryAirport: 'Nearest Major Regional Airport — 15-25 mins away',
  transitTip: 'Check host hotel airport shuttle schedule or arrange direct rideshare to the main registration lobby.',
  baggageAndCheckin: 'Early luggage holding available at bell desk if arriving prior to standard afternoon check-in.',
  foodAndHydration: 'On-site convenience market and water refill stations located near the main ballroom foyer.',
  travelBuffer: 'Target landing 2.5 to 3 hours before your earliest scheduled competition marshalling call or workshop.',
};

export const FlightBufferTimeline: React.FC<FlightBufferTimelineProps> = ({
  activeEventName = 'South Bay Dance Fling 2026',
  className,
}) => {
  const norm = activeEventName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  let logistics = DEFAULT_LOGISTICS;
  if (norm.includes('boogie')) {
    logistics = EVENT_LOGISTICS_MAP['boogie-by-the-bay'];
  } else if (norm.includes('south-bay') || norm.includes('fling')) {
    logistics = EVENT_LOGISTICS_MAP['south-bay-dance-fling'];
  } else if (norm.includes('halloween') || norm.includes('swingthing')) {
    logistics = EVENT_LOGISTICS_MAP['halloween-swingthing'];
  } else if (norm.includes('open') || norm.includes('usopen')) {
    logistics = EVENT_LOGISTICS_MAP['the-open'];
  } else if (norm.includes('after-party') || norm.includes('afterparty')) {
    logistics = EVENT_LOGISTICS_MAP['the-after-party'];
  }

  return (
    <Stack gap={3} width="full" className={className}>
      <Box
        padding={4}
        radius="xl"
        border
        className="bg-surface-alt/70 border-white/10 backdrop-blur-md"
      >
        <Stack gap={3}>
          {/* Header without redundant badge */}
          <Stack direction="row" align="center" gap={2} paddingBottom={2} className="border-b border-line/40">
            <MapPin className="w-4 h-4 text-brand-cyan shrink-0" />
            <h4 className="font-bold text-sm text-white">
              Pre-Event Transit Logistics — {logistics.venueName}
            </h4>
          </Stack>

          {/* Clean 2-Column Text Grid (No heavy nested box borders) */}
          <Grid cols={{ default: 1, md: 2 }} gap={4}>
            {/* Transit & Airport Column */}
            <Stack direction="row" align="start" gap={2.5} className="text-xs">
              <Box marginTop={0.5} className="shrink-0">
                <Navigation className="w-4 h-4 text-brand-cyan" />
              </Box>
              <Stack gap={1}>
                <span className="font-bold text-white font-mono">
                  {logistics.primaryAirport}
                </span>
                <p className="text-text-dim leading-relaxed">
                  {logistics.transitTip}
                </p>
              </Stack>
            </Stack>

            {/* Baggage & Staging Column */}
            <Stack direction="row" align="start" gap={2.5} className="text-xs">
              <Box marginTop={0.5} className="shrink-0">
                <Luggage className="w-4 h-4 text-brand-cyan" />
              </Box>
              <Stack gap={1}>
                <span className="font-bold text-white font-mono">
                  Arrival, Luggage &amp; Ballroom Access
                </span>
                <p className="text-text-dim leading-relaxed">
                  {logistics.baggageAndCheckin}
                </p>
              </Stack>
            </Stack>
          </Grid>

          {/* Bottom Helpful Dancer Tips */}
          <Stack direction="row" align="center" gap={2} paddingTop={1} className="border-t border-line/20 text-xs text-text-dim">
            <Coffee className="w-3.5 h-3.5 text-text-dim shrink-0" />
            <span><strong className="text-white font-mono">Pro Tip:</strong> {logistics.travelBuffer}</span>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

