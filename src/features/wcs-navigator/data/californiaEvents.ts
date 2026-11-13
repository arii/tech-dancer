export interface EventPersonaDefinition {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

export interface WCSCaliforniaEvent {
  id: string;
  name: string;
  location: string;
  venueName: string;
  primaryAirport: string;
  dates: string;
  year: number;
  description: string;
  websiteUrl: string;
  defaultSchedulePdfUrl?: string;
  scheduleQuestion: {
    question: string;
    subtitle: string;
  };
  availableTracks: string[];
  instructors: string[];
  personas: EventPersonaDefinition[];
}

export const CALIFORNIA_2026_EVENTS: WCSCaliforniaEvent[] = [
  {
    id: 'south-bay-dance-fling-2026',
    name: 'South Bay Dance Fling',
    location: 'San Jose, CA',
    venueName: 'DoubleTree by Hilton San Jose / Silicon Valley',
    primaryAirport: 'SJC (Mineta San Jose Int’l) — 7 mins away',
    dates: 'Labor Day Weekend 2026',
    year: 2026,
    description: 'Premier Bay Area WCS event with top-tier workshops, jack & jill competitions, and late night social dancing.',
    websiteUrl: 'https://southbaydancefling.com',
    scheduleQuestion: {
      question: 'South Bay Dance Fling offers 4 parallel workshop streams and WSDC prelims. What is your primary weekend focus?',
      subtitle: 'Evaluated from South Bay\'s timetable taxonomy: leveled tracks, prelim calls & social dancing.'
    },
    availableTracks: [
      'Level 1-2 Foundations & Slot Precision',
      'Level 3-4 Connection & Elasticity',
      'Musicality & Break Mapping',
      'Dips, Tricks & Momentum Flow'
    ],
    instructors: [
      'Kyle Redd & Sarah Vann Drake',
      'PJ Turner & Tashina Beckmann',
      'Markus Smith & Trendlyon Veal',
      'Sean McKeever & Alyssa Glanville'
    ],
    personas: [
      { id: 'novice', title: 'Novice Competitor Track', desc: 'Novice prelims (Fri 5:30 PM) + foundational technique classes', icon: '🏆' },
      { id: 'intermediate', title: 'Int / Adv Leveled Intensives', desc: 'Level 3-4 connection classes + WSDC points race', icon: '⚡' },
      { id: 'social_only', title: 'Pure Social Dance & Theme Nights', desc: 'Neon Glow party + late night dancing until 5 AM (No contest calls)', icon: '🕺' },
      { id: 'workshops', title: 'All-Day Workshop Intensive', desc: 'Maximize daytime classes across technique & musicality rooms', icon: '🧠' }
    ]
  },
  {
    id: 'boogie-by-the-bay-2026',
    name: 'Boogie by the Bay',
    location: 'Burlingame, CA',
    venueName: 'Hyatt Regency San Francisco Airport',
    primaryAirport: 'SFO (San Francisco Int’l) — 5 mins away',
    dates: 'October 2026',
    year: 2026,
    description: 'Hosted by The San Francisco Bay Area Swing Dance Club, one of California\'s longest running NASDE WCS conventions.',
    websiteUrl: 'https://boogiebythebay.org',
    scheduleQuestion: {
      question: 'Boogie by the Bay organizes workshops into Level 4/5 Auditioned Masterclasses vs. All-Levels Open Streams. Which path fits your weekend?',
      subtitle: 'Evaluated from Boogie\'s audition gate requirements, WSDC divisions & Champions Gala.'
    },
    availableTracks: [
      'Level 4/5 Auditioned Masterclasses',
      'All-Levels Musicality & Phrasing Stream',
      'Connection & Slot Mechanics',
      'Styling, Dips & Flow Accents'
    ],
    instructors: [
      'Benji Schwimmer',
      'Jordan Frisbee & Tatiana Mollmann',
      'Thibault Ramirez & Nicole Ramirez',
      'Glenn Ball & Emily Huang'
    ],
    personas: [
      { id: 'auditioned', title: 'Level 4/5 Audition Masterclasses', desc: 'Intensive audition-only workshops + WSDC Jack & Jill rounds', icon: '⚡' },
      { id: 'novice', title: 'Novice WSDC Competitor', desc: 'Novice strictly/prelims + all-levels technique & phrasing stream', icon: '🏆' },
      { id: 'social_marathoner', title: 'Social Dance Marathoner', desc: 'Bay Area Glow party + acoustic sunrise socials until 6 AM', icon: '🕺' },
      { id: 'showcase_spectator', title: 'Showcase Spectator Pass', desc: 'Saturday Champions Showcase Gala + daytime open masterclasses', icon: '🎭' }
    ]
  },
  {
    id: 'halloween-swingthing-2026',
    name: 'Halloween SwingThing',
    location: 'Irvine, CA',
    venueName: 'Hyatt Regency John Wayne Airport (Irvine/Newport Beach)',
    primaryAirport: 'SNA (John Wayne Airport) — 5 mins away',
    dates: 'Late October 2026',
    year: 2026,
    description: 'Southern California\'s legendary Halloween themed West Coast Swing festival featuring costume dance contests.',
    websiteUrl: 'https://halloweenswingthing.com',
    scheduleQuestion: {
      question: 'Halloween SwingThing features Costume Strictly, Pro-Am Spotlights, and Jack & Jill. How are you participating?',
      subtitle: 'Evaluated from SwingThing\'s Halloween costume contests, spotlights & party timetable.'
    },
    availableTracks: [
      'Costume Strictly & Themed Contests',
      'Novice & Intermediate Jack & Jill',
      'Pro-Am Spotlight Routines',
      'Rhythm Syncopations & Theme Night Socials'
    ],
    instructors: [
      'Ben Morris & Victoria Henk',
      'Gary McIntyre & Susan Kirklin',
      'Myles Munroe & Tessa Cunningham Munroe',
      'Christopher Dumond & Tara Trafzer'
    ],
    personas: [
      { id: 'costume_competitor', title: 'Friday Costume Strictly & J&J', desc: 'Themed costume prelims + Novice/Int Jack & Jill staging', icon: '🎭' },
      { id: 'pro_am', title: 'Pro-Am Spotlight Dancer', desc: 'Spotlight routine floor trials & master coaching intensives', icon: '⭐' },
      { id: 'theme_socialite', title: 'Monster Mash Socialite', desc: 'Costume social parties & late-night dance marathons', icon: '🕺' },
      { id: 'workshops', title: 'Rhythm & Speed Masterclasses', desc: 'Syncopations, styling, and creative musicality classes', icon: '🧠' }
    ]
  },
  {
    id: 'the-open-2026',
    name: 'The Open (US Open Swing Dance Championships)',
    location: 'Burbank, CA',
    venueName: 'Marriott Burbank Airport & Convention Center',
    primaryAirport: 'BUR (Hollywood Burbank Airport) — 3 mins away',
    dates: 'Thanksgiving Weekend 2026',
    year: 2026,
    description: 'The pinnacle of global West Coast Swing competition, showcase divisions, and worldwide community gathering.',
    websiteUrl: 'https://usopenswing.com',
    scheduleQuestion: {
      question: 'The US Open centers on Champion Routine Divisions, Strictly Prelims, and Masterclasses. What is your competitive focus?',
      subtitle: 'Evaluated from US Open\'s championship staging calls, routine floor times & gala passes.'
    },
    availableTracks: [
      'Classic & Showcase Routine Divisions',
      'Strictly Swing & J&J Preliminaries',
      'Hall-of-Fame Master Coaching Track',
      'Showcase Finals Spectator Pass'
    ],
    instructors: [
      'Robert Royston',
      'Gary McIntyre & Susan Kirklin',
      'Myles Munroe & Tessa Cunningham Munroe',
      'Mario Robau Jr.',
      'Jordan Frisbee & Tatiana Mollmann'
    ],
    personas: [
      { id: 'routine_competitor', title: 'Classic / Showcase Competitor', desc: 'Championship division floor tests & staging checkpoints', icon: '👑' },
      { id: 'strictly_jj', title: 'Strictly Swing & J&J Prelims', desc: 'Friday/Saturday open division prelim calls & warmups', icon: '🏆' },
      { id: 'showcase_spectator', title: 'Grand Showcase Spectator', desc: 'Prime-time Saturday Classic/Showcase finals & late socials', icon: '🎭' },
      { id: 'master_student', title: 'Hall-of-Fame Master Student', desc: 'Deep-dive pedagogy with living dance legends', icon: '🎓' }
    ]
  },
  {
    id: 'the-after-party-2026',
    name: 'The After Party',
    location: 'Santa Ana, CA',
    venueName: 'Holiday Inn Orange County Airport',
    primaryAirport: 'SNA (John Wayne Airport) — 6 mins away',
    dates: 'December 2026',
    year: 2026,
    description: 'High-energy end of year social dance weekend focused heavily on relaxed vibes, non-stop social dancing, and connection.',
    websiteUrl: 'https://theafterpartydance.com',
    scheduleQuestion: {
      question: 'The After Party is a social-first dance weekend with sunrise DJ sets and daytime peer labs. How will you spend your days?',
      subtitle: 'Evaluated from The After Party\'s social marathon timetable and peer growth schedule.'
    },
    availableTracks: [
      'Pure Social Dancing (Sunrise Sets)',
      'Peer Practice & Feedback Labs',
      'Connection & Dynamic Elasticity',
      'Late-Night DJ Spotlight Sessions'
    ],
    instructors: [
      'Sean McKeever & Alyssa Glanville',
      'Thibault Ramirez & Nicole Ramirez',
      'Glenn Ball & Emily Huang'
    ],
    personas: [
      { id: 'pure_social', title: 'Non-Stop Social Marathoner', desc: 'Dancing through the night until 7 AM sunrise', icon: '🔥' },
      { id: 'peer_lab', title: 'Peer Practice & Feedback Labs', desc: 'Daytime growth labs & mutual practice with peers', icon: '🤝' },
      { id: 'relaxed_traveler', title: 'Relaxed Weekend Dance Vacation', desc: 'Low-stress social dance vacation vibes & poolside chats', icon: '🌴' }
    ]
  }
];
