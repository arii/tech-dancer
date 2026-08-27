export interface WCSCaliforniaEvent {
  id: string;
  name: string;
  location: string;
  dates: string;
  year: number;
  description: string;
  websiteUrl: string;
  defaultSchedulePdfUrl?: string;
  availableTracks: string[];
}

export const CALIFORNIA_2026_EVENTS: WCSCaliforniaEvent[] = [
  {
    id: 'south-bay-dance-fling-2026',
    name: 'South Bay Dance Fling',
    location: 'San Jose, CA',
    dates: 'Labor Day Weekend 2026',
    year: 2026,
    description: 'Premier Bay Area WCS event with top-tier workshops, jack & jill competitions, and late night social dancing.',
    websiteUrl: 'https://southbaydancefling.com',
    availableTracks: ['Novice Prelims', 'Strictly Swing', 'Level-Matched Intensives', 'All-Night Social']
  },
  {
    id: 'boogie-by-the-bay-2026',
    name: 'Boogie by the Bay',
    location: 'Burlingame, CA',
    dates: 'October 2026',
    year: 2026,
    description: 'Hosted by The The San Francisco Bay Area Swing Dance Club, one of California\'s longest running NASDE WCS conventions.',
    websiteUrl: 'https://boogiebythebay.org',
    availableTracks: ['Jack & Jill Competitions', 'Strictly Swing', 'Champions Showcase', 'Social Dance Marathon']
  },
  {
    id: 'halloween-swingthing-2026',
    name: 'Halloween SwingThing',
    location: 'Irvine, CA',
    dates: 'Late October 2026',
    year: 2026,
    description: 'Southern California\'s legendary Halloween themed West Coast Swing festival featuring costume dance contests.',
    websiteUrl: 'https://halloweenswingthing.com',
    availableTracks: ['Costume Strictly', 'Novice/Int Jack & Jill', 'Pro-Am Spotlight', 'Theme Night Socials']
  },
  {
    id: 'the-open-2026',
    name: 'The Open (US Open Swing Dance Championships)',
    location: 'Burbank, CA',
    dates: 'Thanksgiving Weekend 2026',
    year: 2026,
    description: 'The pinnacle of global West Coast Swing competition, showcase divisions, and worldwide community gathering.',
    websiteUrl: 'https://usopenswing.com',
    availableTracks: ['Showcase Spectator', 'Classic & Routine Divisions', 'Advanced Competition', 'World-Class Workshops']
  },
  {
    id: 'the-after-party-2026',
    name: 'The After Party',
    location: 'Santa Ana, CA',
    dates: 'December 2026',
    year: 2026,
    description: 'High-energy end of year social dance weekend focused heavily on relaxed vibes, non-stop social dancing, and connection.',
    websiteUrl: 'https://theafterpartydance.com',
    availableTracks: ['Pure Social Dancing', 'Late Night DJ Sets', 'Technique Intensives', 'Peer Practice Labs']
  }
];
