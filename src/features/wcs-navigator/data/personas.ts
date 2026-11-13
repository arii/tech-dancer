export interface WCSPersona {
  id: string;
  name: string;
  tagline: string;
  description: string;
  focusTracks: string[];
  preferredActivities: string[];
  sampleQuestionnaire: {
    competitionLevel: string;
    workshopInterest: string;
    socialDanceStyle: string;
    sleepSchedule: string;
    goals: string;
  };
}

export const DANCE_PERSONAS: WCSPersona[] = [
  {
    id: 'novice-competitor',
    name: 'Novice Competitor',
    tagline: 'Prelims, Strictly, and all-levels workshops',
    description: 'Focused on building confidence in J&J prelims, trying out Strictly Swing, and hitting all-levels technique classes.',
    focusTracks: ['Novice Prelims', 'Strictly Swing', 'All-Levels Workshops'],
    preferredActivities: ['Prelim Check-in', 'Strictly Warmup', 'Early Social Dancing'],
    sampleQuestionnaire: {
      competitionLevel: 'Novice / New Competitor',
      workshopInterest: 'All-Levels Technique & Fundamental Connection',
      socialDanceStyle: 'Active Social Dancing (Early to Midnight)',
      sleepSchedule: 'Standard Night (Sleep by 1:00 AM)',
      goals: 'Make finals in Novice J&J and refine basic footwork'
    }
  },
  {
    id: 'int-adv-competitor',
    name: 'Int/Adv Competitor',
    tagline: 'Leveled intensives, prelims & finals strategy',
    description: 'Targeting leveled intensives, advancing through prelims into finals, and strategic practice rounds.',
    focusTracks: ['Leveled Intensives', 'Intermediate/Advanced J&J', 'Finals Strategy'],
    preferredActivities: ['Intensive Workshops', 'Spotlight Warmup', 'Late Night Social'],
    sampleQuestionnaire: {
      competitionLevel: 'Intermediate / Advanced',
      workshopInterest: 'Audition-Only / Leveled Masterclasses',
      socialDanceStyle: 'High-Energy Late Night Social Dancing',
      sleepSchedule: 'Night Owl (Dance until 4:00 AM)',
      goals: 'Earn WSDC points, optimize musicality in finals'
    }
  },
  {
    id: 'pure-social-dancer',
    name: 'Pure Social Dancer',
    tagline: 'Late night socials, theme nights & zero stress',
    description: 'No contest pressure. Here purely for late night social dancing, community connections, and fun theme nights.',
    focusTracks: ['Late Night Socials', 'Theme Nights', 'Community Meetups'],
    preferredActivities: ['After-Hours Ballroom', 'Theme Night Costumes', 'Lounge & Hangout'],
    sampleQuestionnaire: {
      competitionLevel: 'Non-Competitor',
      workshopInterest: 'Fun Styling & Theme Classes',
      socialDanceStyle: 'Marathon Social Dancing (Midnight to Sunrise)',
      sleepSchedule: 'Extreme Night Owl (Sleep at 6:00 AM)',
      goals: 'Dance with partners from across the globe and enjoy the social vibe'
    }
  },
  {
    id: 'workshop-enthusiast',
    name: 'Workshop Enthusiast',
    tagline: 'Technique tracks & showcase spectator',
    description: 'Loves learning from world-class instructors all weekend long and watching top division showcase routines.',
    focusTracks: ['Technique Tracks', 'Showcase Spectator', 'Body Mechanics'],
    preferredActivities: ['Morning Warmup', 'All-Day Workshops', 'Evening Showcase'],
    sampleQuestionnaire: {
      competitionLevel: 'Spectator / Student',
      workshopInterest: 'Full Workshop Track & Biomechanics',
      socialDanceStyle: 'Moderate Evening Socials',
      sleepSchedule: 'Early Riser (Ready for 10:00 AM Workshops)',
      goals: 'Absorb technical concepts and watch Champion showcases'
    }
  }
];
