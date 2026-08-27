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
          title: 'What is your dancer persona & competition division?',
          options: [
            { label: 'Novice Competitor', subtitle: 'WSDC Novice prelims, early staging call, foundational tracks', value: 'novice', badge: 'Novice' },
            { label: 'Intermediate Competitor', subtitle: 'WSDC Intermediate prelims, intensive classes, late night socials', value: 'intermediate', badge: 'Intermediate' },
            { label: 'Social Dancer Only', subtitle: 'All-levels workshops, peak party energy, no prelim staging calls', value: 'social_only', badge: 'Social' },
            { label: 'Workshop Enthusiast', subtitle: 'Max daytime classes, masterclasses & technique intensives', value: 'workshop_enthusiast', badge: 'Workshops' }
          ],
          context: 'Used to filter out conflicting tracks, gate level-restricted workshops, and calculate travel staging deadlines.',
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
        { id: '1', label: 'Parsed event timetable & rooms', status: 'completed', detail: 'Found 4 ballrooms, 48 workshops, and 6 divisions' },
        { id: '2', label: 'Calculated travel buffer & arrival deadline', status: 'completed', detail: 'Arrival target computed: 2:15 PM Friday' },
        { id: '3', label: 'Filtered workshops by division level', status: 'completed', detail: 'Selected workshops matching your profile' },
        { id: '4', label: 'Generated calendar file (.ics)', status: 'completed', detail: 'Ready for Apple & Google Calendar' }
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
          justification: 'Matched selected competitive division (Novice). On-time staging guaranteed.'
        },
        {
          id: 's2',
          title: 'All-Levels Connection & Elasticity with Pro Staff',
          time: 'Friday 3:00 PM - 4:00 PM',
          location: 'Junior Ballroom',
          status: 'filtered',
          decisionBadge: 'Arrival Time Conflict',
          justification: 'Filtered: Conflicts with your airport transit and hotel settle window (2:15 PM - 4:15 PM).'
        },
        {
          id: 's5',
          title: 'Saturday Flow & Connection Technique Workshop',
          time: 'Saturday 2:00 PM - 3:15 PM',
          location: 'Grand Ballroom',
          status: 'included',
          decisionBadge: 'Workshop Match',
          justification: 'Fits your Novice technique focus and scheduled during open Saturday afternoon slot.'
        },
        {
          id: 's3',
          title: 'Advanced/All-Star Micro-Musicality Masterclass',
          time: 'Saturday 11:00 AM - 12:00 PM',
          location: 'Executive Salon',
          status: 'filtered',
          decisionBadge: 'Level Ineligible',
          justification: 'Filtered: User profile (Novice) is ineligible for Advanced+ audition workshops.'
        },
        {
          id: 's4',
          title: 'Friday Neon Glow Late Night Social',
          time: 'Friday 10:30 PM - 5:00 AM',
          location: 'Grand Ballroom',
          status: 'included',
          decisionBadge: 'Social Energy',
          justification: 'Matched late-night social energy preference.'
        }
      ],
      themeDressCodes: [
        {
          id: 't1',
          day: 'Friday Night',
          themeTitle: 'Neon & Retro Glow Party',
          category: 'social_theme',
          description: 'Midnight social featuring blacklights and UV lighting throughout the grand ballroom.',
          recommendedAttire: ['Neon tops & shoes', 'UV glow accessories', 'White accents'],
          vibe: 'High Energy & Vibrant'
        },
        {
          id: 't2',
          day: 'Saturday Evening',
          themeTitle: 'Champions Showcase Gala & Dressy Glam',
          category: 'showcase_formal',
          description: 'Marquee evening with Champion Jack & Jill finals and all-star pro routines.',
          recommendedAttire: ['Fitted dress shirts & vests', 'Cocktail attire & jumpsuits', 'Clean dance shoes'],
          vibe: 'Elegant & Sophisticated'
        },
        {
          id: 't3',
          day: 'Sat / Sun Prelims',
          themeTitle: 'WSDC Competition Dress Code',
          category: 'competition_attire',
          description: 'Smart casual dancewear adhering to official WSDC partnering guidelines.',
          recommendedAttire: ['Breathable dance trousers / dark denim', 'Neat fitted shirts', 'Secure bib placement'],
          vibe: 'Clean & Professional'
        },
        {
          id: 't4',
          day: 'Sunday Night',
          themeTitle: 'Survivor Social & Studio Athleisure',
          category: 'casual_sunday',
          description: 'Late-night chill survivors party until sunrise with resident DJs.',
          recommendedAttire: ['Event / Studio t-shirts', 'Stretch joggers / leggings', 'Flat dance sneakers'],
          vibe: 'Cozy & Laid Back'
        }
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
          title: 'What is your dancer persona & competition division?',
          options: [
            { label: 'Novice Competitor', subtitle: 'WSDC Novice prelims, early staging call, foundational tracks', value: 'novice', badge: 'Novice' },
            { label: 'Intermediate Competitor', subtitle: 'WSDC Intermediate prelims, intensive classes, late night socials', value: 'intermediate', badge: 'Intermediate' },
            { label: 'Social Dancer Only', subtitle: 'All-levels workshops, peak party energy, no prelim staging calls', value: 'social_only', badge: 'Social' },
            { label: 'Workshop Enthusiast', subtitle: 'Max daytime classes, masterclasses & technique intensives', value: 'workshop_enthusiast', badge: 'Workshops' }
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
        { id: '1', label: 'Scanned event timetable', status: 'completed', detail: 'Identified ballroom streams across the weekend' },
        { id: '2', label: 'Calculated airport transit & hotel buffer', status: 'completed', detail: '20m shuttle + 90m check-in + 60m warmup' },
        { id: '3', label: 'Filtered workshops by division', status: 'completed', detail: 'Filtered advanced intensives' },
        { id: '4', label: 'Generated calendar file (.ics)', status: 'completed', detail: 'Ready for Apple & Google Calendar' }
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
      themeDressCodes: [
        {
          id: 'tb1',
          day: 'Friday Night',
          themeTitle: 'Bay Area Glow Social Party',
          category: 'social_theme',
          description: 'Friday kickoff late night social with blacklights and neon colors.',
          recommendedAttire: ['Neon & UV bright colors', 'White accents', 'Glow jewelry'],
          vibe: 'High Energy & Electric'
        },
        {
          id: 'tb2',
          day: 'Saturday Evening',
          themeTitle: 'Classic Champions Showcase & Cocktail Chic',
          category: 'showcase_formal',
          description: 'Strictly Swing & Pro Classic Showcases in the Grand Peninsula Ballroom.',
          recommendedAttire: ['Dress shirts & ties/vests', 'Cocktail dresses', 'Polished suede dance shoes'],
          vibe: 'Glamorous & Prestigious'
        },
        {
          id: 'tb3',
          day: 'Sat / Sun Prelims',
          themeTitle: 'WSDC Competition Dress Code',
          category: 'competition_attire',
          description: 'Official WSDC competition attire for Jack & Jill and Strictly Swing.',
          recommendedAttire: ['Clean dark trousers / stretch slacks', 'Fitted neat shirts', 'Competition bibs'],
          vibe: 'Sharp & Athletic'
        },
        {
          id: 'tb4',
          day: 'Sunday Night',
          themeTitle: 'Survivors Sunrise Social',
          category: 'casual_sunday',
          description: 'Late night survivor dancing until dawn with acoustic sets.',
          recommendedAttire: ['Boogie t-shirts / hoodies', 'Comfortable dance sneakers', 'Joggers'],
          vibe: 'Warm & Community-Driven'
        }
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
        title: 'What is your dancer persona & competition division?',
        options: [
          { label: 'Novice Competitor', subtitle: 'WSDC Novice prelims, early staging call, foundational tracks', value: 'novice', badge: 'Novice' },
          { label: 'Intermediate Competitor', subtitle: 'WSDC Intermediate prelims, intensive classes, late night socials', value: 'intermediate', badge: 'Intermediate' },
          { label: 'Social Dancer Only', subtitle: 'All-levels workshops, peak party energy, no prelim staging calls', value: 'social_only', badge: 'Social' },
          { label: 'Workshop Enthusiast', subtitle: 'Max daytime classes, masterclasses & technique intensives', value: 'workshop_enthusiast', badge: 'Workshops' }
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
      { id: '1', label: `Analyzed ${eventName} timetable`, status: 'completed', detail: 'Extracted sessions and timeline' },
      { id: '2', label: 'Calculated arrival & travel buffer', status: 'completed', detail: '30m transit + 90m hotel + 60m warmup' },
      { id: '3', label: 'Filtered workshops & assembled calendar', status: 'completed', detail: 'Tailored schedule generated' },
      { id: '4', label: 'Generated calendar file (.ics)', status: 'completed', detail: 'Ready for Apple & Google Calendar' }
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
    themeDressCodes: [
      {
        id: 'g-theme-1',
        day: 'Friday Night',
        themeTitle: 'Welcome Social & Kickoff Party',
        category: 'social_theme',
        description: 'Casual and welcoming social dance atmosphere.',
        recommendedAttire: ['Dance t-shirts', 'Suede dance shoes', 'Comfortable stretch jeans'],
        vibe: 'Fun & Friendly'
      },
      {
        id: 'g-theme-2',
        day: 'Saturday Evening',
        themeTitle: 'Main Showcase & Champions Gala',
        category: 'showcase_formal',
        description: 'Evening spotlight showcases and finals.',
        recommendedAttire: ['Dress shirts / cocktail attire', 'Polished dance shoes'],
        vibe: 'Festive & Elegant'
      }
    ],
    icsContent: 'BEGIN:VCALENDAR\\nVERSION:2.0\\nPRODID:-//WCS Navigator//EN\\nBEGIN:VEVENT\\nSUMMARY:✈️ Target Flight Landing Deadline\\nDTSTART:20261015T210000Z\\nDTEND:20261015T213000Z\\nDESCRIPTION:Landing deadline for event.\\nEND:VEVENT\\nEND:VCALENDAR'
  },
  icsContent: 'BEGIN:VCALENDAR\\nVERSION:2.0\\nPRODID:-//WCS Navigator//EN\\nBEGIN:VEVENT\\nSUMMARY:✈️ Target Flight Landing Deadline\\nDTSTART:20261015T210000Z\\nDTEND:20261015T213000Z\\nDESCRIPTION:Landing deadline for event.\\nEND:VEVENT\\nEND:VCALENDAR'
});
