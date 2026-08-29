import { DiscoveryResponse } from '../types/navigator';
import { AgentDecisionTrace } from '../types';

export interface EventMockData {
  discovery: DiscoveryResponse;
  decisionTrace: AgentDecisionTrace;
  icsContent: string;
}

function createIcsString(
  eventName: string,
  landingDeadline: string,
  stagingTime: string,
  sessions: { title: string; time: string; location: string }[]
): string {
  const events = [
    [
      'BEGIN:VEVENT',
      `UID:flight-landing-${Date.now()}-1@wcs-navigator.boomtick.blog`,
      'SUMMARY:✈️ Target Flight Landing Deadline',
      `DESCRIPTION:Recommended latest flight touchdown to allow transit, hotel check-in, and warmup before ${stagingTime}.`,
      'DTSTART:20261009T212500Z',
      'DTEND:20261009T215500Z',
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder: Flight landing deadline for WCS convention',
      'END:VALARM',
      'END:VEVENT'
    ].join('\r\n'),
    ...sessions.map((s, i) =>
      [
        'BEGIN:VEVENT',
        `UID:session-${i}-${Date.now()}@wcs-navigator.boomtick.blog`,
        `SUMMARY:🏆 ${s.title}`,
        `DESCRIPTION:Scheduled at ${s.time} in ${s.location}. Matched to your preferences by WCS Navigator.`,
        `LOCATION:${s.location}`,
        'DTSTART:20261010T170000Z',
        'DTEND:20261010T181500Z',
        'BEGIN:VALARM',
        'TRIGGER:-PT15M',
        'ACTION:DISPLAY',
        `DESCRIPTION:Reminder: ${s.title} starting in 15 minutes`,
        'END:VALARM',
        'END:VEVENT'
      ].join('\r\n')
    )
  ];

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//WCS Navigator//Event Calendar Generator//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${eventName} Custom Schedule`,
    ...events,
    'END:VCALENDAR'
  ].join('\r\n');
}

const southBaySessions = [
  { title: 'Novice Strictly Swing Prelims', time: 'Friday 5:30 PM - 6:30 PM', location: 'Grand Ballroom' },
  { title: 'Saturday Flow & Connection Technique Workshop', time: 'Saturday 2:00 PM - 3:15 PM', location: 'Grand Ballroom' },
  { title: 'Friday Neon Glow Late Night Social', time: 'Friday 10:30 PM - 5:00 AM', location: 'Grand Ballroom' }
];

const southBayIcs = createIcsString('South Bay Dance Fling 2026', '2:15 PM', '5:15 PM', southBaySessions);

const boogieSessions = [
  { title: 'Novice Strictly Swing Prelims', time: 'Friday 5:30 PM - 6:45 PM', location: 'Grand Peninsula Ballroom' },
  { title: 'All-Levels Musicality & Connection Workshop', time: 'Saturday 11:30 AM - 12:45 PM', location: 'Regency Ballroom' },
  { title: 'Bay Area Glow Social Party', time: 'Friday 10:30 PM - 5:00 AM', location: 'Grand Peninsula Ballroom' },
  { title: 'Classic Champions Showcase & Cocktail Chic Gala', time: 'Saturday 8:30 PM - 11:00 PM', location: 'Grand Peninsula Ballroom' }
];

const boogieIcs = createIcsString('Boogie by the Bay 2026', '2:25 PM', '5:15 PM', boogieSessions);

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
          type: 'select',
          title: 'Which workshop tracks do you plan to prioritize?',
          options: [
            { label: 'All Workshops & Masterclasses (Comprehensive Schedule)', subtitle: 'Include full daytime workshop schedule across all rooms (no theme filtering)', value: 'all_workshops', badge: 'All Tracks' },
            { label: 'Footwork & Connection Technique', subtitle: 'Focus on partner connection mechanics and turns', value: 'technique', badge: 'Technique' },
            { label: 'Musicality & Phrasing', subtitle: 'Focus on musical expression and timing', value: 'musicality', badge: 'Musicality' },
            { label: 'Dips, Tricks & Flow', subtitle: 'Elasticity, momentum and styling', value: 'flow', badge: 'Flow' }
          ],
          context: 'Schedule contains simultaneous workshop rooms; filters out conflicting tracks.',
          defaultValue: 'all_workshops'
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
          decisionBadge: 'Competition Call',
          justification: 'Matched selected competitive division (Novice). On-time staging guaranteed.'
        },
        {
          id: 's_fri_dinner',
          title: 'Friday Dinner & Evening Social Warmup Break',
          time: 'Friday 6:30 PM - 8:30 PM',
          location: 'Hotel Concourse',
          status: 'included',
          decisionBadge: 'Meal / Rest Break',
          justification: 'Scheduled dinner break and social warmup.'
        },
        {
          id: 's4',
          title: 'Friday Neon Glow Late Night Social',
          time: 'Friday 10:30 PM - 5:00 AM',
          location: 'Grand Ballroom',
          status: 'included',
          decisionBadge: 'Social Dancing',
          justification: 'Friday kickoff late-night social dancing.'
        },
        {
          id: 's_sat_ws1',
          title: 'All-Levels Phrasing & Micro-Musicality',
          time: 'Saturday 10:00 AM - 11:15 AM',
          location: 'Grand Ballroom',
          status: 'included',
          decisionBadge: 'Workshop Match',
          justification: 'Foundational phrasing workshop in main ballroom.'
        },
        {
          id: 's_sat_lunch',
          title: 'Saturday Midday Lunch & Practice Floor Break',
          time: 'Saturday 12:30 PM - 2:00 PM',
          location: 'Pavilion Area',
          status: 'included',
          decisionBadge: 'Meal / Rest Break',
          justification: 'Midday meal and practice break.'
        },
        {
          id: 's5',
          title: 'Saturday Flow & Connection Technique Workshop',
          time: 'Saturday 2:00 PM - 3:15 PM',
          location: 'Grand Ballroom',
          status: 'included',
          decisionBadge: 'Workshop Match',
          justification: 'Fits your technique focus and scheduled during open Saturday afternoon slot.'
        },
        {
          id: 's_sat_dinner',
          title: 'Saturday Dinner & Champions Showcase Seating Break',
          time: 'Saturday 6:00 PM - 8:30 PM',
          location: 'Grand Ballroom Foyer',
          status: 'included',
          decisionBadge: 'Meal / Rest Break',
          justification: 'Dinner break and cocktail formal gala dress change.'
        },
        {
          id: 's_sat_social',
          title: 'Saturday Champions Showcase & Late-Night Social Dancing',
          time: 'Saturday 10:30 PM - 5:30 AM',
          location: 'Grand Ballroom',
          status: 'included',
          decisionBadge: 'Social Dancing',
          justification: 'Marquee Saturday champions showcase gala and social dancing.'
        },
        {
          id: 's_sun_ws1',
          title: 'Sunday Morning Technique & Elasticity Masterclass',
          time: 'Sunday 11:30 AM - 12:45 PM',
          location: 'Grand Ballroom',
          status: 'included',
          decisionBadge: 'Workshop Match',
          justification: 'Open masterclass on partner elasticity.'
        },
        {
          id: 's_sun_lunch',
          title: 'Sunday Lunch & Afternoon Rest Break',
          time: 'Sunday 1:00 PM - 2:30 PM',
          location: 'Pavilion Area',
          status: 'included',
          decisionBadge: 'Meal / Rest Break',
          justification: 'Afternoon rest and meal break.'
        },
        {
          id: 's_sun_social',
          title: 'Sunday Survivors Sunrise Social Dancing',
          time: 'Sunday 10:00 PM - 5:00 AM',
          location: 'Grand Ballroom',
          status: 'included',
          decisionBadge: 'Social Dancing',
          justification: 'Survivor dance party until sunrise.'
        },
        {
          id: 's3',
          title: 'Advanced/All-Star Micro-Musicality Masterclass',
          time: 'Saturday 11:00 AM - 12:00 PM',
          location: 'Executive Salon',
          status: 'filtered',
          decisionBadge: 'Level Ineligible',
          justification: 'Filtered: User profile (Novice) is ineligible for Advanced+ audition workshops.'
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
      icsContent: southBayIcs
    },
    icsContent: southBayIcs
  },
  'boogie-by-the-bay-2026': {
    discovery: {
      preset_id: 'boogie-by-the-bay-2026',
      preset_name: 'Boogie by the Bay 2026',
      suggested_form_questions: [
        {
          id: 'intensive',
          type: 'select',
          title: 'Are you registered for any special pre-convention intensives or bootcamps at Boogie by the Bay?',
          options: [
            { label: 'No — Not attending any special intensives or bootcamps', subtitle: 'Standard arrival for regular workshops, competitions, or social dancing kickoff', value: 'no_intensives', badge: 'None' },
            { label: 'Jordan & Tatiana "Mastering the Blues" (Fri 10:00 AM - 1:00 PM)', subtitle: 'Regency Ballroom • Requires flight landing by 8:30 AM', value: 'blues_intensive', badge: 'Intensive' },
            { label: 'Kelly Casanova Judging Intensive (Fri 1:00 PM - 4:00 PM)', subtitle: 'Harbour Room A • Requires arrival by 12:00 PM', value: 'judging_intensive', badge: 'Judging' },
            { label: 'Competitor Leveled Afternoon Tracks (Fri 1:00 PM - 5:00 PM)', subtitle: 'Sandpebble ABC • Novice 1pm, Int 2pm, Adv 3pm, All-Star 4pm', value: 'competitor_workshops', badge: 'Leveled' }
          ],
          context: 'Used to configure early morning travel buffer alerts and pre-convention calendar items.',
          defaultValue: 'no_intensives',
          required: true
        },
        {
          id: 'division',
          type: 'select',
          title: 'Which competitive divisions are you entering this weekend?',
          options: [
            { label: 'Novice Competitor Track', subtitle: 'Friday 6:30 PM Strictly Prelims + Saturday 12:30 PM J&J Prelims', value: 'novice', badge: 'Novice' },
            { label: 'Intermediate Competitor Track', subtitle: 'Friday 6:30 PM Strictly Prelims + Saturday 2:15 PM J&J Prelims', value: 'intermediate', badge: 'Intermediate' },
            { label: 'Advanced / All-Star Competitor', subtitle: 'Friday 8:00 PM Strictly + Saturday 4:00 PM J&J Prelims', value: 'advanced_allstar', badge: 'Adv/All-Star' },
            { label: 'Social Dancer / Non-Competitor', subtitle: 'All-levels workshops, Champions Gala, and late-night socials (no staging calls)', value: 'social_only', badge: 'Social' }
          ],
          context: 'Calculates your earliest competition marshalling call and filters leveled workshops.',
          defaultValue: 'novice',
          required: true
        },
        {
          id: 'arrival',
          type: 'select',
          title: 'When is your Friday arrival target at Hyatt Regency SFO?',
          options: [
            { label: 'Early Afternoon (Flight landing before 2:30 PM)', subtitle: 'Full 3.5h buffer for SFO transit, hotel check-in, unpack & warmup before 6:30 PM Strictly', value: 'early', badge: 'Recommended' },
            { label: 'Friday Evening Arrival (6:00 PM – 8:00 PM)', subtitle: 'Check in for evening masterclasses and 9:00 PM kickoff social', value: 'evening', badge: 'Evening' },
            { label: 'Local Bay Area Commute / Drive-In', subtitle: 'Driving in locally from SF/Bay Area; no airport buffer needed', value: 'local', badge: 'Drive-In' }
          ],
          context: 'Generates backward staging timeline and sets automatic flight touchdown alarms.',
          defaultValue: 'early',
          required: true
        },
        {
          id: 'track',
          type: 'select',
          title: 'Boogie by the Bay runs 3 simultaneous daytime tracks. Which stream should we prioritize?',
          options: [
            { label: 'All Workshops & Masterclasses (Comprehensive Schedule)', subtitle: 'Include full daytime workshop schedule across Grand Peninsula, Regency, and Sandpebble ballrooms', value: 'all_workshops', badge: 'All Tracks' },
            { label: 'Competitor Leveled Workshops', subtitle: 'Sandpebble ABC • Division-targeted technique & strategy classes', value: 'competitor_workshops', badge: 'Technique' },
            { label: 'Main Ballroom Masterclasses', subtitle: 'Grand Peninsula • Musicality, phrasing & partner connection classes', value: 'all_levels_ballroom', badge: 'Musicality' },
            { label: 'Curated All-Around Mix', subtitle: 'Optimal balance across all rooms and touring instructors', value: 'balanced_mix', badge: 'Curated' }
          ],
          context: 'Resolves workshop timetable clashes across Grand Peninsula, Regency, and Sandpebble ballrooms.',
          defaultValue: 'all_workshops',
          required: true
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
          decisionBadge: 'Competition Call',
          justification: 'Division match for Novice. Marshalling call on time.'
        },
        {
          id: 'b_fri_dinner',
          title: 'Friday Dinner & Evening Social Warmup Break',
          time: 'Friday 6:45 PM - 8:30 PM',
          location: 'Atrium Dining & Lounge',
          status: 'included',
          decisionBadge: 'Meal / Rest Break',
          justification: 'Scheduled dinner and social warmup before evening dance.'
        },
        {
          id: 'b4',
          title: 'Bay Area Glow Social Party & Late-Night Dancing',
          time: 'Friday 10:30 PM - 5:00 AM',
          location: 'Grand Peninsula & Regency Soul Room',
          status: 'included',
          decisionBadge: 'Social Dancing',
          justification: 'Friday kickoff late night social party with dual ballrooms.'
        },
        {
          id: 'b3',
          title: 'All-Levels Musicality & Connection Workshop',
          time: 'Saturday 11:30 AM - 12:45 PM',
          location: 'Regency Ballroom',
          status: 'included',
          decisionBadge: 'Workshop Match',
          justification: 'Matched all-levels musicality focus.'
        },
        {
          id: 'b_sat_lunch',
          title: 'Saturday Midday Lunch & Floor Check Break',
          time: 'Saturday 12:45 PM - 2:00 PM',
          location: 'Grand Atrium',
          status: 'included',
          decisionBadge: 'Meal / Rest Break',
          justification: 'Midday meal and practice warmup break.'
        },
        {
          id: 'b_sat_ws2',
          title: 'Competitor Strategy & Dynamic Footwork in Sandpebble',
          time: 'Saturday 2:15 PM - 3:30 PM',
          location: 'Sandpebble Room ABC',
          status: 'included',
          decisionBadge: 'Workshop Match',
          justification: 'Division-targeted competitor workshop.'
        },
        {
          id: 'b_sat_dinner',
          title: 'Saturday Dinner & Champions Showcase Seating Break',
          time: 'Saturday 6:00 PM - 8:30 PM',
          location: 'Grand Peninsula Foyer',
          status: 'included',
          decisionBadge: 'Meal / Rest Break',
          justification: 'Dinner and formal cocktail attire preparation.'
        },
        {
          id: 'b_sat_social',
          title: 'Classic Champions Showcase & Cocktail Chic Gala Social',
          time: 'Saturday 10:30 PM - 5:30 AM',
          location: 'Grand Peninsula Ballroom',
          status: 'included',
          decisionBadge: 'Social Dancing',
          justification: 'Champions showcase gala followed by late-night social dancing.'
        },
        {
          id: 'b_sun_ws1',
          title: 'Sunday Morning Flow & Phrasing with Jordan & Tatiana',
          time: 'Sunday 11:30 AM - 12:45 PM',
          location: 'Grand Peninsula Ballroom',
          status: 'included',
          decisionBadge: 'Workshop Match',
          justification: 'Sunday morning connection masterclass.'
        },
        {
          id: 'b_sun_lunch',
          title: 'Sunday Lunch & Afternoon Rest Break',
          time: 'Sunday 1:00 PM - 2:30 PM',
          location: 'Grand Atrium',
          status: 'included',
          decisionBadge: 'Meal / Rest Break',
          justification: 'Afternoon lunch and rest break.'
        },
        {
          id: 'b_sun_social',
          title: 'Sunday Survivors Sunrise Social Dancing',
          time: 'Sunday 10:00 PM - 5:00 AM',
          location: 'Grand Peninsula Ballroom',
          status: 'included',
          decisionBadge: 'Social Dancing',
          justification: 'Survivor social dancing until dawn.'
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
      icsContent: boogieIcs
    },
    icsContent: boogieIcs
  },
  'the-open-2026': {
    discovery: {
      preset_id: 'the-open-2026',
      preset_name: 'The Open (US Open Swing Dance Championships)',
      suggested_form_questions: [
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
          context: 'Used to filter out conflicting tracks, gate level-restricted workshops, and calculate travel staging deadlines.',
          defaultValue: 'novice',
          required: true
        },
        {
          id: 'workshop_focus',
          type: 'multiselect',
          title: 'Which workshop tracks do you plan to prioritize?',
          options: [
            { label: 'Lead & Follow Connection', value: 'connection' },
            { label: 'Musicality & Accents', value: 'musicality' },
            { label: 'Speed & Footwork', value: 'footwork' }
          ],
          context: 'Schedule contains simultaneous workshop rooms; filters out conflicting tracks.',
          defaultValue: ['connection', 'musicality']
        },
        {
          id: 'spectator_interest',
          type: 'boolean',
          title: 'Include Saturday night US Open Classic Showcase Finals in your schedule?',
          options: [],
          context: 'The premier championship showcase division (8:00 PM - 11:30 PM).',
          defaultValue: true
        }
      ]
    },
    decisionTrace: {
      subTasks: [
        { id: '1', label: 'Analyzed US Open timetable & ballrooms', status: 'completed', detail: 'Found Burbank Marriott Convention Hall, 52 workshops, and 8 divisions' },
        { id: '2', label: 'Calculated BUR transit & warmup buffer', status: 'completed', detail: '15m transit + 90m hotel settle + 60m warmup' },
        { id: '3', label: 'Filtered workshops & assembled calendar', status: 'completed', detail: 'Selected workshops matching your division' },
        { id: '4', label: 'Generated calendar file (.ics)', status: 'completed', detail: 'Ready for Apple & Google Calendar' }
      ],
      bufferTimeline: {
        earliestStagingTime: '4:15 PM (Friday)',
        warmupMinutes: 60,
        hotelSettleMinutes: 90,
        transitMinutes: 15,
        latestFlightArrivalDeadline: '1:30 PM (Friday)',
        formulaSummary: '16:15 (Novice Strictly Staging) - (15m BUR Transit + 90m Settle + 60m Warmup) = 13:30 Target Arrival',
        steps: [
          { label: 'US Open Strictly Swing Staging Call', time: '4:15 PM', duration: 'Staging', type: 'staging', description: 'Grand Ballroom Check-in & Warmup' },
          { label: 'Warmup & Floor Check', time: '3:15 PM', duration: '60 min', type: 'warmup', description: 'Test floor speed & stretch' },
          { label: 'Burbank Marriott Check-in & Wardrobe', time: '1:45 PM', duration: '90 min', type: 'hotel', description: 'Unpack dance attire & freshen up' },
          { label: 'BUR Airport to Marriott Transit', time: '1:30 PM', duration: '15 min', type: 'transit', description: 'Direct 5-minute shuttle / taxi buffer' },
          { label: 'Recommended Venue Arrival', time: '1:30 PM', duration: 'Deadline', type: 'flight', description: 'Recommended latest arrival deadline' }
        ]
      },
      sessions: [
        {
          id: 'uo1',
          title: 'Friday Afternoon WCS Foundations & Flow Workshop',
          time: 'Friday 1:30 PM - 2:45 PM',
          location: 'Grand Ballroom',
          status: 'included',
          decisionBadge: 'Workshop Match',
          justification: 'Fits foundational technique focus prior to evening competitions.'
        },
        {
          id: 'uo2',
          title: 'US Open Strictly Swing Prelims (Novice & Intermediate)',
          time: 'Friday 4:15 PM - 6:45 PM',
          location: 'Grand Ballroom',
          status: 'included',
          decisionBadge: 'Division Match',
          justification: 'Division match for Novice. Check-in call at 4:15 PM.'
        },
        {
          id: 'uo3',
          title: 'US Open Classic Division Routines & Late Night Kickoff',
          time: 'Friday 8:30 PM - 5:00 AM',
          location: 'Convention Hall',
          status: 'included',
          decisionBadge: 'Social Energy',
          justification: 'Marquee evening pro routines followed by open late-night social dancing.'
        },
        {
          id: 'uo4',
          title: 'Champions Musicality & Micro-Phrasing Workshop',
          time: 'Saturday 11:30 AM - 12:45 PM',
          location: 'Academy Ballroom',
          status: 'included',
          decisionBadge: 'Workshop Match',
          justification: 'Matches your Musicality & Accents preference.'
        },
        {
          id: 'uo5',
          title: 'Level 4/5 Champion Masterclass with Benji Schwimmer',
          time: 'Saturday 3:45 PM - 5:00 PM',
          location: 'Academy Ballroom',
          status: 'filtered',
          decisionBadge: 'Level Ineligible',
          justification: 'Requires Level 4/5 audition wristband or Advanced WSDC points.'
        },
        {
          id: 'uo6',
          title: 'US Open Showcase Division Finals & Gala Show',
          time: 'Saturday 8:00 PM - 11:30 PM',
          location: 'Convention Hall',
          status: 'included',
          decisionBadge: 'Showcase Event',
          justification: 'The premier worldwide championship showcase division.'
        }
      ],
      themeDressCodes: [
        {
          id: 'tuo1',
          day: 'Friday Night',
          themeTitle: 'Friday Kickoff & Classic Showcases',
          category: 'social_theme',
          description: 'High-energy kickoff evening featuring Classic pro routines and midnight social.',
          recommendedAttire: ['Smart casual dancewear', 'Clean suede shoes', 'Breathable shirts'],
          vibe: 'Exciting & Welcoming'
        },
        {
          id: 'tuo2',
          day: 'Saturday Evening',
          themeTitle: 'US Open Showcase Gala & Formal Glam',
          category: 'showcase_formal',
          description: 'The pinnacle gala evening of the US Open Swing Dance Championships.',
          recommendedAttire: ['Suits & fitted jackets', 'Cocktail gowns / dressy jumpsuits', 'Polished ballroom dance shoes'],
          vibe: 'World-Class Championship Prestigious'
        },
        {
          id: 'tuo3',
          day: 'Sat / Sun Prelims',
          themeTitle: 'WSDC Official Competition Dress Code',
          category: 'competition_attire',
          description: 'Official WSDC competition attire for Jack & Jill and Strictly Swing.',
          recommendedAttire: ['Dark slacks / dance trousers', 'Neat fitted button-down shirts', 'Competition bibs'],
          vibe: 'Athletic & Professional'
        },
        {
          id: 'tuo4',
          day: 'Sunday Night',
          themeTitle: 'Thanksgiving Weekend Survivor Social',
          category: 'casual_sunday',
          description: 'Survivor dancing until dawn to close out the US Open weekend.',
          recommendedAttire: ['US Open event tees', 'Comfortable joggers & dance sneakers'],
          vibe: 'Warm & Festive'
        }
      ],
      icsContent: southBayIcs
    },
    icsContent: southBayIcs
  },
  'halloween-swingthing-2026': {
    discovery: {
      preset_id: 'halloween-swingthing-2026',
      preset_name: 'Halloween SwingThing 2026',
      suggested_form_questions: [
        {
          id: 'intensive',
          type: 'select',
          title: 'Are you registered for any Friday pre-convention intensives at Halloween SwingThing?',
          options: [
            { label: 'No — Not attending any special intensives or bootcamps', subtitle: 'Standard arrival for evening Costume Strictly and social kickoff', value: 'no_intensives', badge: 'None' },
            { label: 'Ben Morris Masterclass Intensive (Fri 1:00 PM - 4:00 PM)', subtitle: 'Hyatt Grand Ballroom • Requires flight landing by 11:30 AM', value: 'ben_morris_intensive', badge: 'Intensive' },
            { label: 'Costume Styling & Routine Lab (Fri 2:00 PM - 4:30 PM)', subtitle: 'Pacific Room • Requires arrival by 1:00 PM', value: 'costume_lab', badge: 'Lab' }
          ],
          context: 'Configures travel arrival buffer math and pre-convention calendar sessions.',
          defaultValue: 'no_intensives',
          required: true
        },
        {
          id: 'division',
          type: 'select',
          title: 'Which competitive divisions or showcases are you entering?',
          options: [
            { label: 'Novice Competitor + Friday Costume Strictly', subtitle: 'Friday 6:00 PM Strictly Prelims + Saturday 12:30 PM J&J Prelims', value: 'novice', badge: 'Novice' },
            { label: 'Intermediate / Advanced Competitor Track', subtitle: 'Friday 7:30 PM Strictly + Saturday 2:30 PM J&J Prelims', value: 'intermediate', badge: 'Int/Adv' },
            { label: 'Pro-Am Spotlight Routine Competitor', subtitle: 'Friday Evening Floor trials + Pro-Am Spotlights', value: 'pro_am', badge: 'Pro-Am' },
            { label: 'Social Dancer / Costume Party Spectator', subtitle: 'Workshops, Monster Mash costume contests, all-night socials (No contest calls)', value: 'social_only', badge: 'Social' }
          ],
          context: 'Calculates earliest staging marshalling deadlines and gates leveled workshops.',
          defaultValue: 'novice',
          required: true
        },
        {
          id: 'track',
          type: 'select',
          title: 'Which daytime workshop track fits your goals?',
          options: [
            { label: 'All Workshops (Include all daytime workshops)', subtitle: 'Includes all non-conflicting masterclasses, technique & musicality classes', value: 'all_workshops', badge: 'All' },
            { label: 'Rhythm & Syncopation Masterclasses', subtitle: 'Footwork syncopation, speed control & polyrhythmic phrasing', value: 'rhythm', badge: 'Rhythm' },
            { label: 'Connection Dynamics & Elasticity Flow', subtitle: 'Leverage, compression & smooth slot physics with Ben & Victoria', value: 'connection', badge: 'Connection' },
            { label: 'Performance Styling & Dramatic Accents', subtitle: 'Spooky accents, theatrical extensions & performance charisma', value: 'styling', badge: 'Styling' }
          ],
          context: 'Filters workshop streams and resolves room schedule conflicts.',
          defaultValue: 'all_workshops',
          required: true
        },
        {
          id: 'social_preference',
          type: 'select',
          title: 'What is your social dancing and late-night party plan?',
          options: [
            { label: 'All-Night Monster Mash Socials (Dancing until 5:30 AM)', subtitle: 'Peak late-night DJ sets, acoustic soul rooms & costume dancing', value: 'latenight', badge: 'Late Night' },
            { label: 'Evening Socials & Gala Spectator (Until 2:00 AM)', subtitle: 'Costume contest viewing, showcase gala & moderate social dancing', value: 'moderate', badge: 'Moderate' }
          ],
          context: 'Adds social dance sessions and rest buffer recommendations.',
          defaultValue: 'latenight',
          required: true
        }
      ]
    },
    decisionTrace: {
      subTasks: [
        { id: '1', label: 'Analyzed Halloween SwingThing 2026 timetable', status: 'completed', detail: 'Identified 4 workshop tracks, Costume Strictly, and 3 late-night parties' },
        { id: '2', label: 'Calculated flight buffer for SNA Airport', status: 'completed', detail: '5m transit + 90m hotel settle + 60m warmup' },
        { id: '3', label: 'Injected social dancing & meal breaks', status: 'completed', detail: 'Friday/Sat/Sun social dancing & dinner/lunch rest periods' },
        { id: '4', label: 'Generated calendar stream (.ics)', status: 'completed', detail: 'Ready for 1-click import' }
      ],
      bufferTimeline: {
        earliestStagingTime: '5:30 PM (Friday)',
        warmupMinutes: 60,
        hotelSettleMinutes: 90,
        transitMinutes: 15,
        latestFlightArrivalDeadline: '2:45 PM (Friday)',
        formulaSummary: '17:30 Staging - (15m Transit + 90m Hotel + 60m Warmup) = 14:45 Landing',
        steps: [
          { label: 'Earliest Competition Check-in', time: '5:30 PM', duration: 'Staging', type: 'staging', description: 'Costume Strictly Competitor Staging Call' },
          { label: 'Physical Warmup & Bibs', time: '4:30 PM', duration: '60 min', type: 'warmup', description: 'Warmup & Costume adjustment' },
          { label: 'Hotel Check-in & Costume Prep', time: '3:00 PM', duration: '90 min', type: 'hotel', description: 'Unpack Halloween wardrobe' },
          { label: 'SNA Airport to Hotel Transit', time: '2:45 PM', duration: '15 min', type: 'transit', description: 'Short rideshare from John Wayne Airport' },
          { label: 'Recommended Flight Touchdown', time: '2:45 PM', duration: 'Deadline', type: 'flight', description: 'Recommended latest flight landing' }
        ]
      },
      sessions: [
        {
          id: 'hw1',
          title: 'Friday Costume Strictly Swing Prelims & Finals',
          time: 'Friday 6:00 PM - 8:00 PM',
          location: 'Grand Ballroom',
          status: 'included',
          decisionBadge: 'Competition Call',
          justification: 'The legendary Halloween Costume Strictly Swing contest.'
        },
        {
          id: 'hw_fri_dinner',
          title: 'Friday Dinner & Costume Prep Break',
          time: 'Friday 8:00 PM - 9:30 PM',
          location: 'Hotel Bistro / Foyer',
          status: 'included',
          decisionBadge: 'Meal / Rest Break',
          justification: 'Dinner and Halloween costume adjustments before party kickoff.'
        },
        {
          id: 'hw2',
          title: 'Monster Mash Halloween Costume Party & All-Night Social Dancing',
          time: 'Friday 9:30 PM - 5:00 AM',
          location: 'Grand Ballroom & Spooky Lounge',
          status: 'included',
          decisionBadge: 'Social Dancing',
          justification: 'Opening costume theme social dancing marathon.'
        },
        {
          id: 'hw3',
          title: 'Connection Dynamics & Elasticity Flow with Ben & Victoria',
          time: 'Saturday 11:30 AM - 12:45 PM',
          location: 'Pacific Ballroom',
          status: 'included',
          decisionBadge: 'Workshop Match',
          justification: 'Matches your Connection & Flow preference.'
        },
        {
          id: 'hw_sat_lunch',
          title: 'Saturday Lunch & Afternoon Rest Break',
          time: 'Saturday 1:00 PM - 2:15 PM',
          location: 'Hyatt Courtyard',
          status: 'included',
          decisionBadge: 'Meal / Rest Break',
          justification: 'Lunch nutrition and hydration buffer before afternoon prelims.'
        },
        {
          id: 'hw4',
          title: 'Novice & Intermediate Jack & Jill Preliminaries',
          time: 'Saturday 2:30 PM - 5:00 PM',
          location: 'Grand Ballroom',
          status: 'included',
          decisionBadge: 'Competition Call',
          justification: 'Official WSDC Jack & Jill competition rounds.'
        },
        {
          id: 'hw_sat_dinner',
          title: 'Saturday Dinner & Gala Seating Break',
          time: 'Saturday 6:00 PM - 8:00 PM',
          location: 'Main Pavilion',
          status: 'included',
          decisionBadge: 'Meal / Rest Break',
          justification: 'Dinner buffer before Champions Showcase Gala.'
        },
        {
          id: 'hw5',
          title: 'Halloween Champions Showcase Gala & All-Night Social Dancing',
          time: 'Saturday 9:00 PM - 5:30 AM',
          location: 'Grand Ballroom',
          status: 'included',
          decisionBadge: 'Social Dancing',
          justification: 'Champions showcase performances and late-night social dancing.'
        },
        {
          id: 'hw6',
          title: 'Sunday Rhythm Syncopation Masterclass',
          time: 'Sunday 11:30 AM - 12:45 PM',
          location: 'Pacific Ballroom',
          status: 'included',
          decisionBadge: 'Workshop Match',
          justification: 'Daytime rhythm and musical phrasing workshop.'
        },
        {
          id: 'hw_sun_lunch',
          title: 'Sunday Lunch & Afternoon Rest Break',
          time: 'Sunday 1:00 PM - 2:30 PM',
          location: 'Hyatt Courtyard',
          status: 'included',
          decisionBadge: 'Meal / Rest Break',
          justification: 'Afternoon rest buffer before Sunday evening survivor party.'
        },
        {
          id: 'hw7',
          title: 'Sunday Halloween Survivor Sunrise Social Dancing',
          time: 'Sunday 10:00 PM - 5:00 AM',
          location: 'Grand Ballroom',
          status: 'included',
          decisionBadge: 'Social Dancing',
          justification: 'Survivor closing dance marathon with late-night DJ sets.'
        }
      ],
      themeDressCodes: [
        {
          id: 'thw1',
          day: 'Friday Night',
          themeTitle: 'Monster Mash Costume Extravaganza',
          category: 'social_theme',
          description: 'The premier costume party night of the weekend. Dress up in your full creative costume!',
          recommendedAttire: ['Halloween costumes', 'Danceable themed accessories', 'Suede / flat dance shoes'],
          vibe: 'Festive, Creative & High-Energy'
        },
        {
          id: 'thw2',
          day: 'Saturday Evening',
          themeTitle: 'Gothic Glamour Champions Showcase',
          category: 'showcase_formal',
          description: 'Saturday night champions showcase performances and formal evening.',
          recommendedAttire: ['Gothic chic / dark elegant cocktail wear', 'Fitted dark shirts & trousers', 'Polished suede shoes'],
          vibe: 'Glamorous & Theatrical'
        },
        {
          id: 'thw3',
          day: 'Saturday Night',
          themeTitle: 'Midnight Spooky Glow Social',
          category: 'social_theme',
          description: 'Late night social dancing with UV blacklights and neon accents.',
          recommendedAttire: ['Neon / UV-reactive dance tops', 'Comfortable stretch bottoms', 'Dance sneakers'],
          vibe: 'Electric & Immersive'
        },
        {
          id: 'thw4',
          day: 'Sunday Night',
          themeTitle: 'Halloween Survivor Cozy Social',
          category: 'casual_sunday',
          description: 'Relaxed final night dancing with cozy, comfortable dance attire.',
          recommendedAttire: ['Halloween swing tees', 'Comfortable joggers & dance shoes'],
          vibe: 'Warm & Community-Centric'
        }
      ],
      icsContent: southBayIcs
    },
    icsContent: southBayIcs
  },
  'the-after-party-2026': {
    discovery: {
      preset_id: 'the-after-party-2026',
      preset_name: 'The After Party 2026',
      suggested_form_questions: [
        {
          id: 'intensive',
          type: 'select',
          title: 'Are you registered for any daytime peer labs or masterclasses at The After Party?',
          options: [
            { label: 'No — Not attending daytime intensives (Pure Social Arrival)', subtitle: 'Standard arrival for evening social dance marathon', value: 'no_intensives', badge: 'None' },
            { label: 'Peer Practice & Video Feedback Lab (Fri 2:00 PM - 5:00 PM)', subtitle: 'Daytime coaching lab with peer critique and video review', value: 'peer_lab', badge: 'Lab' }
          ],
          context: 'Configures travel arrival buffer math and pre-convention calendar sessions.',
          defaultValue: 'no_intensives',
          required: true
        },
        {
          id: 'division',
          type: 'select',
          title: 'What is your primary weekend participation focus?',
          options: [
            { label: 'Pure Social Marathoner (Sunrise sets until 7:00 AM)', subtitle: 'Maximize late-night social dancing and sunrise DJ acoustic sets', value: 'social_only', badge: 'Social' },
            { label: 'Novice / Intermediate Competitor Track', subtitle: 'Saturday Afternoon Jack & Jill prelims and finals', value: 'novice', badge: 'Competitor' },
            { label: 'Relaxed Dance Vacation & Daytime Labs', subtitle: 'Low-stress daytime learning and relaxed evening socials', value: 'relaxed', badge: 'Vacation' }
          ],
          context: 'Calculates staging calls and shapes personalized itinerary.',
          defaultValue: 'social_only',
          required: true
        },
        {
          id: 'track',
          type: 'select',
          title: 'Which daytime workshop topics would you like to prioritize?',
          options: [
            { label: 'All Workshops (Include all daytime classes)', subtitle: 'Includes all daytime masterclasses and peer feedback labs', value: 'all_workshops', badge: 'All' },
            { label: 'Connection & Dynamic Elasticity Mechanics', subtitle: 'Elasticity, momentum flow and slot control with Sean & Alyssa', value: 'connection', badge: 'Connection' },
            { label: 'Late-Night DJ Music Phrasing & Micro-Musicality', subtitle: 'Interpreting modern acoustic, blues, and R&B tracks', value: 'musicality', badge: 'Musicality' }
          ],
          context: 'Filters workshop streams and resolves room schedule conflicts.',
          defaultValue: 'all_workshops',
          required: true
        },
        {
          id: 'stamina_target',
          type: 'select',
          title: 'What is your social dance stamina target?',
          options: [
            { label: 'Sunrise Survivor (Dancing until 7:00 AM each morning)', subtitle: 'All-night dancing through the sunrise acoustic DJ sessions', value: 'sunrise', badge: 'Survivor' },
            { label: 'Balanced Night Owl (Dancing until 3:30 AM)', subtitle: 'Solid evening and late-night dancing with restorative sleep', value: 'balanced', badge: 'Balanced' }
          ],
          context: 'Optimizes daily sleep and meal rest buffers.',
          defaultValue: 'sunrise',
          required: true
        }
      ]
    },
    decisionTrace: {
      subTasks: [
        { id: '1', label: 'Analyzed The After Party 2026 timetable', status: 'completed', detail: 'Indexed 3 sunrise social marathons and peer growth labs' },
        { id: '2', label: 'Calculated flight buffer for SNA Airport', status: 'completed', detail: '10m transit + 90m hotel settle + 60m warmup' },
        { id: '3', label: 'Injected social dancing & meal breaks', status: 'completed', detail: 'Friday/Sat/Sun social dancing & dinner/lunch rest periods' },
        { id: '4', label: 'Generated calendar stream (.ics)', status: 'completed', detail: 'Ready for 1-click import' }
      ],
      bufferTimeline: {
        earliestStagingTime: '6:00 PM (Friday)',
        warmupMinutes: 60,
        hotelSettleMinutes: 90,
        transitMinutes: 15,
        latestFlightArrivalDeadline: '3:15 PM (Friday)',
        formulaSummary: '18:00 Staging - (15m Transit + 90m Hotel + 60m Warmup) = 15:15 Landing',
        steps: [
          { label: 'Earliest Event Activity', time: '6:00 PM', duration: 'Staging', type: 'staging', description: 'Friday Welcome Session' },
          { label: 'Warmup & Prep', time: '5:00 PM', duration: '60 min', type: 'warmup', description: 'Freshen up & warm up' },
          { label: 'Hotel Check-in', time: '3:30 PM', duration: '90 min', type: 'hotel', description: 'Hotel room unpack' },
          { label: 'Airport Transit', time: '3:15 PM', duration: '15 min', type: 'transit', description: 'Transit from SNA' },
          { label: 'Recommended Flight Touchdown', time: '3:15 PM', duration: 'Deadline', type: 'flight', description: 'Recommended latest flight touchdown' }
        ]
      },
      sessions: [
        {
          id: 'ap1',
          title: 'Friday Welcome Social & Opening Peer Jam',
          time: 'Friday 6:00 PM - 8:00 PM',
          location: 'Main Ballroom',
          status: 'included',
          decisionBadge: 'Social Energy',
          justification: 'Opening mixer and social dancing kickoff.'
        },
        {
          id: 'ap_fri_dinner',
          title: 'Friday Dinner & Relaxation Break',
          time: 'Friday 8:00 PM - 9:30 PM',
          location: 'Hotel Lounge',
          status: 'included',
          decisionBadge: 'Meal / Rest Break',
          justification: 'Dinner and nutrition buffer before all-night dancing.'
        },
        {
          id: 'ap2',
          title: 'Friday Night All-Night Social Dancing (Until Sunrise)',
          time: 'Friday 9:30 PM - 7:00 AM',
          location: 'Main Ballroom & Late Lounge',
          status: 'included',
          decisionBadge: 'Social Dancing',
          justification: 'Legendary After Party sunrise social dancing session.'
        },
        {
          id: 'ap3',
          title: 'Connection & Dynamic Elasticity Masterclass',
          time: 'Saturday 1:30 PM - 2:45 PM',
          location: 'Main Ballroom',
          status: 'included',
          decisionBadge: 'Workshop Match',
          justification: 'Matches your Connection & Elasticity preference.'
        },
        {
          id: 'ap_sat_lunch',
          title: 'Saturday Lunch & Afternoon Rest Break',
          time: 'Saturday 3:00 PM - 4:30 PM',
          location: 'Courtyard Café',
          status: 'included',
          decisionBadge: 'Meal / Rest Break',
          justification: 'Afternoon nourishment and recovery window.'
        },
        {
          id: 'ap4',
          title: 'Saturday Night Champions Showcase & Sunrise Social Marathon',
          time: 'Saturday 10:00 PM - 7:00 AM',
          location: 'Main Ballroom',
          status: 'included',
          decisionBadge: 'Social Dancing',
          justification: 'Saturday marquee pro showcase and all-night dancing until 7 AM.'
        },
        {
          id: 'ap5',
          title: 'Sunday Survivors Sunrise Farewell Social',
          time: 'Sunday 10:00 PM - 6:00 AM',
          location: 'Main Ballroom',
          status: 'included',
          decisionBadge: 'Social Dancing',
          justification: 'Closing survivor dance party to wrap up the weekend.'
        }
      ],
      themeDressCodes: [
        {
          id: 'tap1',
          day: 'Friday Night',
          themeTitle: 'After Party Neon Glow Kickoff',
          category: 'social_theme',
          description: 'Vibrant neon and glowing accessories to kick off the weekend.',
          recommendedAttire: ['Neon tees / crops', 'Comfortable sneakers & suede shoes', 'Glow jewelry'],
          vibe: 'High-Energy & Electric'
        },
        {
          id: 'tap2',
          day: 'Saturday Night',
          themeTitle: 'Saturday Night Fever Showcase & Social',
          category: 'showcase_formal',
          description: 'Dressy cocktail attire for champions showcase followed by late dancing.',
          recommendedAttire: ['Smart casual cocktail wear', 'Fitted shirts & dark jeans/slacks'],
          vibe: 'Chic & Festive'
        },
        {
          id: 'tap3',
          day: 'Sunday Night',
          themeTitle: 'Survivors Pajama & Cozy Jam',
          category: 'casual_sunday',
          description: 'Maximum comfort for the final sunrise dance session.',
          recommendedAttire: ['Silk / flannel pajamas', 'Cozy hoodies & sweatpants', 'Dance socks / sneakers'],
          vibe: 'Cozy, Warm & Intimate'
        }
      ],
      icsContent: southBayIcs
    },
    icsContent: southBayIcs
  }
};

export const createGenericMockResult = (eventName: string): EventMockData => {
  const genericSessions = [
    { title: 'Friday Welcome Social & All-Levels Class', time: 'Friday 6:00 PM - 7:30 PM', location: 'Main Ballroom' },
    { title: 'Saturday Connection & Flow Workshop', time: 'Saturday 1:00 PM - 2:15 PM', location: 'Main Ballroom' },
    { title: 'Champions Showcase Gala', time: 'Saturday 9:00 PM - 11:30 PM', location: 'Main Ballroom' }
  ];

  const ics = createIcsString(eventName || 'Custom Event Schedule', '2:00 PM', '5:00 PM', genericSessions);

  return {
    discovery: {
      preset_id: 'custom-event',
      preset_name: eventName || 'Custom Event Schedule',
      suggested_form_questions: [
        {
          id: 'intensive',
          type: 'select',
          title: `Are you registered for any Friday pre-convention intensives or bootcamps at ${eventName}?`,
          options: [
            { label: 'No — Not attending any special intensives or bootcamps', subtitle: 'Standard arrival for regular workshops, competitions, or social dancing kickoff', value: 'no_intensives', badge: 'None' },
            { label: 'Friday Afternoon Intensive Masterclass (1:00 PM - 4:00 PM)', subtitle: 'Requires flight arrival by 11:30 AM Friday', value: 'intensive', badge: 'Intensive' }
          ],
          context: 'Configures travel arrival buffers and pre-convention calendar sessions.',
          defaultValue: 'no_intensives',
          required: true
        },
        {
          id: 'division',
          type: 'select',
          title: 'Which competitive divisions are you entering this weekend?',
          options: [
            { label: 'Novice Competitor Track', subtitle: 'Friday Strictly Prelims + Saturday J&J Prelims', value: 'novice', badge: 'Novice' },
            { label: 'Intermediate / Advanced Competitor Track', subtitle: 'Friday Evening Strictly + Saturday Afternoon J&J Prelims', value: 'intermediate', badge: 'Int/Adv' },
            { label: 'Social Dancer / Non-Competitor', subtitle: 'All-levels workshops, Champions Gala, and late-night socials (no staging calls)', value: 'social_only', badge: 'Social' },
            { label: 'All-Day Workshop Enthusiast', subtitle: 'Maximize daytime classes across technique & musicality rooms', value: 'workshop_enthusiast', badge: 'Workshops' }
          ],
          context: 'Calculates your earliest competition marshalling call and filters leveled workshops.',
          defaultValue: 'novice',
          required: true
        },
        {
          id: 'track',
          type: 'select',
          title: 'Which workshop topics or tracks do you plan to prioritize?',
          options: [
            { label: 'All Workshops (Include all non-conflicting daytime classes)', subtitle: 'Includes all leveled technique, musicality & connection classes', value: 'all_workshops', badge: 'All' },
            { label: 'Lead & Follow Connection & Elasticity', subtitle: 'Frame, compression, leverage & smooth momentum control', value: 'connection', badge: 'Connection' },
            { label: 'Musicality & Phrasing Accents', subtitle: 'Micro-timing, dynamic accents & song structure mapping', value: 'musicality', badge: 'Musicality' }
          ],
          context: 'Filters workshop streams and resolves room schedule conflicts.',
          defaultValue: 'all_workshops',
          required: true
        },
        {
          id: 'role',
          type: 'select',
          title: 'What is your primary dance role for competitions and workshops?',
          options: [
            { label: 'Leader', subtitle: 'Primary dance role: Lead', value: 'lead', badge: 'Lead' },
            { label: 'Follower', subtitle: 'Primary dance role: Follow', value: 'follow', badge: 'Follow' },
            { label: 'Switch / Both', subtitle: 'Lead in some divisions, Follow in others', value: 'switch', badge: 'Switch' }
          ],
          context: 'Customizes workshop focus and competition call notes.',
          defaultValue: '',
          required: false
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
        },
        {
          id: 'g2',
          title: 'Saturday Connection & Flow Workshop',
          time: 'Saturday 1:00 PM - 2:15 PM',
          location: 'Main Ballroom',
          status: 'included',
          decisionBadge: 'Workshop Match',
          justification: 'Selected connection & flow focus.'
        },
        {
          id: 'g3',
          title: 'Advanced Intensive Masterclass',
          time: 'Saturday 3:00 PM - 4:30 PM',
          location: 'Studio B',
          status: 'filtered',
          decisionBadge: 'Level Ineligible',
          justification: 'Requires Advanced+ division registration.'
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
      icsContent: ics
    },
    icsContent: ics
  };
};
