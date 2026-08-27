import { DiscoveryResponse } from '../types/navigator';
import { AgentDecisionTrace } from '../types';

export interface EventMockData {
  discovery: DiscoveryResponse;
  decisionTrace: AgentDecisionTrace;
  icsContent: string;
}

export const MOCK_EVENT_RESULTS: Record<string, EventMockData> = {
  'south-bay-dance-fling-2026': {
    discovery: {
      preset_id: 'south-bay-dance-fling-2026',
      preset_name: 'South Bay Dance Fling 2026',
      suggested_form_questions: [
        {
          id: 'competition_level',
          type: 'select',
          title: 'What is your competitive WSDC division?',
          options: [
            { label: 'Novice / New Competitor', value: 'novice' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced / All-Star', value: 'advanced' },
            { label: 'Pure Social Dancer (Not competing)', value: 'social_only' }
          ],
          context: 'Used to filter out ineligible leveled intensive workshops and schedule Jack & Jill prelim call times.',
          defaultValue: 'novice',
          required: true
        },
        {
          id: 'workshop_focus',
          type: 'multiselect',
          title: 'Which workshop tracks do you plan to prioritize?',
          options: [
            { label: 'Footwork & Connection Technique', value: 'technique' },
            { label: 'Musicality & Phrasing', value: 'musicality' },
            { label: 'Dips, Tricks & Flow', value: 'flow' }
          ],
          context: 'Schedule contains simultaneous workshop rooms; filters out conflicting tracks.',
          defaultValue: ['technique', 'musicality']
        },
        {
          id: 'late_night_energy',
          type: 'boolean',
          title: 'Plan to stay for late-night social dancing past 3:00 AM?',
          options: [],
          context: 'Adjusts Sunday morning workshop recommendations and triggers hydration/footwear packing alerts.',
          defaultValue: true
        }
      ]
    },
    decisionTrace: {
      subTasks: [
        { id: '1', label: 'Ingest schedule layout & parse room columns', status: 'completed', detail: 'Found 4 ballrooms, 48 total workshops, 6 competitive divisions' },
        { id: '2', label: 'Extract WSDC prelim call times & calculate flight buffers', status: 'completed', detail: 'Computed step-down buffer: 17:15 Staging -> 14:15 Landing' },
        { id: '3', label: 'Filter workshops by division & level gating', status: 'completed', detail: 'Filtered 18 ineligible advanced intensives' },
        { id: '4', label: 'Assemble in-memory RFC 5545 calendar stream', status: 'completed', detail: 'Generated 14 VEVENT blocks with buffer reminders' }
      ],
      bufferTimeline: {
        earliestStagingTime: '5:15 PM (Friday)',
        warmupMinutes: 60,
        hotelSettleMinutes: 90,
        transitMinutes: 30,
        latestFlightArrivalDeadline: '2:15 PM (Friday)',
        formulaSummary: '17:15 (Novice Staging) - (30m SJC Transit + 90m Hotel Settle + 60m Warmup) = 14:15 Target Landing',
        steps: [
          { label: 'Earliest Competition Staging Call', time: '5:15 PM', duration: 'Check-in', type: 'staging', description: 'Novice Strictly Swing Prelims Check-in' },
          { label: 'Warmup & Bib Registration Window', time: '4:15 PM', duration: '60 min', type: 'warmup', description: 'Physical warm-up and bib collection' },
          { label: 'Hotel Check-in & Wardrobe Settle', time: '2:45 PM', duration: '90 min', type: 'hotel', description: 'Unpack dance attire & freshen up' },
          { label: 'SJC Airport to Venue Transit', time: '2:15 PM', duration: '30 min', type: 'transit', description: 'Taxi/Rideshare buffer from San Jose Mineta Airport' },
          { label: 'Target Flight Landing Deadline', time: '2:15 PM', duration: 'Deadline', type: 'flight', description: 'Recommended latest flight touchdown' }
        ]
      },
      sessions: [
        {
          id: 's1',
          title: 'Novice Strictly Swing Prelims',
          time: 'Friday 5:30 PM - 6:30 PM',
          location: 'Grand Ballroom',
          status: 'included',
          decisionBadge: 'Division Match',
          justification: 'Matched selected competitive division (Novice)'
        },
        {
          id: 's2',
          title: 'All-Levels Connection & Elasticity with Pro Staff',
          time: 'Friday 3:00 PM - 4:00 PM',
          location: 'Junior Ballroom',
          status: 'included',
          decisionBadge: 'All-Levels',
          justification: 'Open technique workshop open to all registered dancers'
        },
        {
          id: 's3',
          title: 'Advanced/All-Star Micro-Musicality Masterclass',
          time: 'Saturday 11:00 AM - 12:00 PM',
          location: 'Executive Salon',
          status: 'filtered',
          decisionBadge: 'Level Ineligible',
          justification: 'Filtered: User profile (Novice) is ineligible for Advanced+ audition workshops'
        },
        {
          id: 's4',
          title: 'Friday Neon Glow Late Night Social',
          time: 'Friday 10:30 PM - 5:00 AM',
          location: 'Grand Ballroom',
          status: 'included',
          decisionBadge: 'Social Energy',
          justification: 'Matched late-night social energy preference'
        }
      ],
      packingManifest: [
        { id: 'p1', name: 'Adhesive Suede Sole Sheets', category: 'footwear', rationale: 'Ballroom uses temporary wood parquet over carpet; suede soles protect knee ligaments during fast pivots.', quantity: 2 },
        { id: 'p2', name: 'Competition Bib Safety Pins', category: 'essentials', rationale: 'Scheduled for Jack & Jill competitions; safety pins required for registration bibs.', quantity: 4 },
        { id: 'p3', name: 'Neon / UV Reactive Apparel', category: 'attire', rationale: 'Official Friday social theme is Neon & Retro Glow.', quantity: 1 },
        { id: 'p4', name: 'Electrolyte Hydration Packets', category: 'toiletries', rationale: 'Late-night social dancing scheduled past 4:00 AM requires proactive hydration.', quantity: 6 }
      ],
      icsContent: 'BEGIN:VCALENDAR\\nVERSION:2.0\\nPRODID:-//WCS Navigator//EN\\nCALSCALE:GREGORIAN\\nMETHOD:PUBLISH\\nBEGIN:VEVENT\\nUID:wcs-flight-deadline-001@boomtick.blog\\nDTSTART:20260904T211500Z\\nDTEND:20260904T214500Z\\nSUMMARY:✈️ Target Flight Landing Deadline (SJC)\\nDESCRIPTION:Latest recommended landing time to allow 30m transit, 90m hotel check-in, and 60m warmup before Novice Staging.\\nLOCATION:San Jose Mineta International Airport (SJC)\\nSTATUS:CONFIRMED\\nEND:VEVENT\\nBEGIN:VEVENT\\nUID:wcs-novice-strictly-002@boomtick.blog\\nDTSTART:20260905T003000Z\\nDTEND:20260905T013000Z\\nSUMMARY:🏆 Novice Strictly Swing Prelims\\nDESCRIPTION:Report to ballroom staging area by 5:15 PM for roll call.\\nLOCATION:Grand Ballroom, South Bay Dance Fling\\nSTATUS:CONFIRMED\\nEND:VEVENT\\nEND:VCALENDAR'
    },
    icsContent: 'BEGIN:VCALENDAR\\nVERSION:2.0\\nPRODID:-//WCS Navigator//EN\\nCALSCALE:GREGORIAN\\nMETHOD:PUBLISH\\nBEGIN:VEVENT\\nUID:wcs-flight-deadline-001@boomtick.blog\\nDTSTART:20260904T211500Z\\nDTEND:20260904T214500Z\\nSUMMARY:✈️ Target Flight Landing Deadline (SJC)\\nDESCRIPTION:Latest recommended landing time to allow 30m transit, 90m hotel check-in, and 60m warmup before Novice Staging.\\nLOCATION:San Jose Mineta International Airport (SJC)\\nSTATUS:CONFIRMED\\nEND:VEVENT\\nBEGIN:VEVENT\\nUID:wcs-novice-strictly-002@boomtick.blog\\nDTSTART:20260905T003000Z\\nDTEND:20260905T013000Z\\nSUMMARY:🏆 Novice Strictly Swing Prelims\\nDESCRIPTION:Report to ballroom staging area by 5:15 PM for roll call.\\nLOCATION:Grand Ballroom, South Bay Dance Fling\\nSTATUS:CONFIRMED\\nEND:VEVENT\\nEND:VCALENDAR'
  },
  'boogie-by-the-bay-2026': {
    discovery: {
      preset_id: 'boogie-by-the-bay-2026',
      preset_name: 'Boogie by the Bay 2026',
      suggested_form_questions: [
        {
          id: 'dance_styles',
          type: 'multiselect',
          title: 'Which dance genres do you want on your schedule?',
          options: [
            { label: 'West Coast Swing', value: 'wcs' },
            { label: 'Country Swing', value: 'country' },
            { label: 'Hustle', value: 'hustle' }
          ],
          context: 'Boogie is a multi-genre event; filter out non-WCS tracks if focusing purely on WCS.',
          defaultValue: ['wcs']
        },
        {
          id: 'wsdc_level',
          type: 'select',
          title: 'What is your WSDC competitive level?',
          options: [
            { label: 'Novice', value: 'novice' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
            { label: 'All-Star / Champion', value: 'allstar' }
          ],
          context: 'Enforces workshop level gatekeeping and flags your division check-in time.',
          defaultValue: 'novice',
          required: true
        },
        {
          id: 'spectator_interest',
          type: 'boolean',
          title: 'Include Saturday night Champion Showcase in your schedule?',
          options: [],
          context: 'Prime-time spectator event (9:00 PM - 11:30 PM) which pauses general social dancing.',
          defaultValue: true
        }
      ]
    },
    decisionTrace: {
      subTasks: [
        { id: '1', label: 'Scan multi-genre timetable (WCS, Hustle, Country)', status: 'completed', detail: 'Identified 3 ballroom streams across 4 days' },
        { id: '2', label: 'Calculate SFO shuttle and hotel buffer', status: 'completed', detail: '20m shuttle + 90m settle + 60m warmup' },
        { id: '3', label: 'Gate Champion masterclasses', status: 'completed', detail: 'Filtered Level 4/5 intensives' }
      ],
      bufferTimeline: {
        earliestStagingTime: '5:15 PM (Friday)',
        warmupMinutes: 60,
        hotelSettleMinutes: 90,
        transitMinutes: 20,
        latestFlightArrivalDeadline: '2:25 PM (Friday)',
        formulaSummary: '17:15 (Staging) - (20m SFO Transit + 90m Settle + 60m Warmup) = 14:25 Target Landing',
        steps: [
          { label: 'Novice Strictly Swing Staging Call', time: '5:15 PM', duration: 'Staging', type: 'staging', description: 'Grand Peninsula Ballroom Staging' },
          { label: 'Warmup & Floor Check', time: '4:15 PM', duration: '60 min', type: 'warmup', description: 'Test floor speed & stretch' },
          { label: 'Hyatt Regency Check-in', time: '2:45 PM', duration: '90 min', type: 'hotel', description: 'Hotel check-in and dress change' },
          { label: 'SFO Airport to Hyatt Shuttle Transit', time: '2:25 PM', duration: '20 min', type: 'transit', description: 'Direct 5-minute shuttle + buffer' },
          { label: 'Target Flight Landing Deadline', time: '2:25 PM', duration: 'Deadline', type: 'flight', description: 'Recommended latest flight touchdown' }
        ]
      },
      sessions: [
        {
          id: 'b1',
          title: 'Novice Strictly Swing Prelims',
          time: 'Friday 5:30 PM - 6:45 PM',
          location: 'Grand Peninsula Ballroom',
          status: 'included',
          decisionBadge: 'Division Match',
          justification: 'Division match for Novice'
        },
        {
          id: 'b2',
          title: 'Level 4/5 Champion Masterclass with Benji Schwimmer',
          time: 'Saturday 1:00 PM - 2:15 PM',
          location: 'Regency Ballroom',
          status: 'filtered',
          decisionBadge: 'Level Ineligible',
          justification: 'Filtered: Requires Level 4/5 audition band'
        }
      ],
      packingManifest: [
        { id: 'p1', name: 'Suede Wire Shoe Brush', category: 'footwear', rationale: 'Large Hyatt Regency ballroom floors tend to collect talc dust by Saturday.', quantity: 1 },
        { id: 'p2', name: 'Travel Garment Steamer', category: 'attire', rationale: 'Competition slacks and vests require pressing for spotlight finals.', quantity: 1 },
        { id: 'p3', name: 'High-Fidelity Filter Earplugs', category: 'essentials', rationale: 'Grand Peninsula Ballroom late-night sound system operates above 90dB.', quantity: 1 }
      ],
      icsContent: 'BEGIN:VCALENDAR\\nVERSION:2.0\\nPRODID:-//WCS Navigator//EN\\nCALSCALE:GREGORIAN\\nBEGIN:VEVENT\\nSUMMARY:✈️ Target Flight Landing Deadline (SFO)\\nDTSTART:20261009T212500Z\\nDTEND:20261009T215500Z\\nDESCRIPTION:Landing deadline for Boogie by the Bay 2026.\\nLOCATION:San Francisco International Airport (SFO)\\nEND:VEVENT\\nEND:VCALENDAR'
    },
    icsContent: 'BEGIN:VCALENDAR\\nVERSION:2.0\\nPRODID:-//WCS Navigator//EN\\nCALSCALE:GREGORIAN\\nBEGIN:VEVENT\\nSUMMARY:✈️ Target Flight Landing Deadline (SFO)\\nDTSTART:20261009T212500Z\\nDTEND:20261009T215500Z\\nDESCRIPTION:Landing deadline for Boogie by the Bay 2026.\\nLOCATION:San Francisco International Airport (SFO)\\nEND:VEVENT\\nEND:VCALENDAR'
  }
};

export const createGenericMockResult = (eventName: string): EventMockData => ({
  discovery: {
    preset_id: 'custom-event',
    preset_name: eventName || 'Custom Event Schedule',
    suggested_form_questions: [
      {
        id: 'experience_level',
        type: 'select',
        title: 'What is your dance & competition level?',
        options: [
          { label: 'Novice / Beginner', value: 'novice' },
          { label: 'Intermediate', value: 'intermediate' },
          { label: 'Advanced', value: 'advanced' },
          { label: 'Social Dancer Only', value: 'social_only' }
        ],
        context: 'Filters out ineligible advanced intensives and targets call times.',
        defaultValue: 'novice',
        required: true
      },
      {
        id: 'workshop_selection',
        type: 'multiselect',
        title: 'Select your preferred workshop topics:',
        options: [
          { label: 'Lead & Follow Connection', value: 'connection' },
          { label: 'Musicality & Accents', value: 'musicality' },
          { label: 'Speed & Footwork', value: 'footwork' }
        ],
        context: 'Resolves simultaneous class schedule conflicts.',
        defaultValue: ['connection', 'musicality']
      }
    ]
  },
  decisionTrace: {
    subTasks: [
      { id: '1', label: `Ingest & analyze ${eventName} timetable`, status: 'completed', detail: 'Extracted sessions and timeline' },
      { id: '2', label: 'Calculate backwards arrival buffer', status: 'completed', detail: '30m transit + 90m hotel + 60m warmup' },
      { id: '3', label: 'Filter workshops & assemble calendar', status: 'completed', detail: 'Tailored schedule generated' }
    ],
    bufferTimeline: {
      earliestStagingTime: '5:00 PM (Friday)',
      warmupMinutes: 60,
      hotelSettleMinutes: 90,
      transitMinutes: 30,
      latestFlightArrivalDeadline: '2:00 PM (Friday)',
      formulaSummary: '17:00 Staging - (30m Transit + 90m Hotel + 60m Warmup) = 14:00 Landing',
      steps: [
        { label: 'Earliest Competition Staging', time: '5:00 PM', duration: 'Staging', type: 'staging', description: 'Event Staging Call' },
        { label: 'Warmup Buffer', time: '4:00 PM', duration: '60 min', type: 'warmup', description: 'Check-in & Warmup' },
        { label: 'Hotel Settle', time: '2:30 PM', duration: '90 min', type: 'hotel', description: 'Hotel Room Check-in' },
        { label: 'Airport Transit', time: '2:00 PM', duration: '30 min', type: 'transit', description: 'Transit from Airport' },
        { label: 'Target Flight Landing Deadline', time: '2:00 PM', duration: 'Deadline', type: 'flight', description: 'Recommended latest flight touchdown' }
      ]
    },
    sessions: [
      {
        id: 'g1',
        title: 'Friday Welcome Social & All-Levels Class',
        time: 'Friday 6:00 PM - 7:30 PM',
        location: 'Main Ballroom',
        status: 'included',
        decisionBadge: 'All-Levels',
        justification: 'Open all-levels class'
      }
    ],
    packingManifest: [
      { id: 'p1', name: 'Suede Dance Shoes & Brush', category: 'footwear', rationale: 'Optimized for ballroom dance flooring.', quantity: 1 },
      { id: 'p2', name: 'Safety Pins & Electrolytes', category: 'essentials', rationale: 'Essential convention preparedness.', quantity: 1 }
    ],
    icsContent: 'BEGIN:VCALENDAR\\nVERSION:2.0\\nPRODID:-//WCS Navigator//EN\\nBEGIN:VEVENT\\nSUMMARY:✈️ Target Flight Landing Deadline\\nDTSTART:20261015T210000Z\\nDTEND:20261015T213000Z\\nDESCRIPTION:Landing deadline for event.\\nEND:VEVENT\\nEND:VCALENDAR'
  },
  icsContent: 'BEGIN:VCALENDAR\\nVERSION:2.0\\nPRODID:-//WCS Navigator//EN\\nBEGIN:VEVENT\\nSUMMARY:✈️ Target Flight Landing Deadline\\nDTSTART:20261015T210000Z\\nDTEND:20261015T213000Z\\nDESCRIPTION:Landing deadline for event.\\nEND:VEVENT\\nEND:VCALENDAR'
});
