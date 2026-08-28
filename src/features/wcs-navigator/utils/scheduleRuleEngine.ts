import { DynamicQuestionStep, DynamicQuestionOption } from './questionGenerator';

export interface NormalizedSession {
  id: string;
  title: string;
  day: 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  start_hour: number;
  start_minute: number;
  end_hour: number;
  end_minute: number;
  location: string;
  category: 'workshop' | 'competition' | 'intensive' | 'social' | 'showcase' | 'other';
  level?: string;
  instructors?: string[];
  description?: string;
}

export interface ScheduleRuleEngineResult {
  steps: DynamicQuestionStep[];
  earliestFridayPrelim?: NormalizedSession;
  intensivesDetected: NormalizedSession[];
  competitionsDetected: NormalizedSession[];
  parallelTracksDetected: string[];
  instructorsDetected: string[];
  hasLateNightSocials: boolean;
  lateNightClosingHour: string;
}

/**
 * Deterministically evaluates an array of session objects to formulate
 * 100% relevant, schedule-grounded dynamic questions.
 */
export function evaluateScheduleRules(
  sessions: NormalizedSession[],
  eventName: string = 'Boogie by the Bay 2026',
  venueAirport: string = 'SFO'
): ScheduleRuleEngineResult {
  const steps: DynamicQuestionStep[] = [];

  // 1. Detect Pre-Convention Intensives
  const intensives = sessions.filter(
    (s) =>
      s.category === 'intensive' ||
      s.title.toLowerCase().includes('intensive') ||
      s.title.toLowerCase().includes('bootcamp') ||
      (s.day === 'Friday' && s.start_hour < 17 && s.title.toLowerCase().includes('masterclass'))
  );

  // 2. Detect Competition Divisions & Earliest Prelim
  const competitions = sessions.filter(
    (s) =>
      s.category === 'competition' ||
      s.title.toLowerCase().includes('strictly') ||
      s.title.toLowerCase().includes('jack & jill') ||
      s.title.toLowerCase().includes('prelim')
  );

  const fridayComps = competitions.filter((s) => s.day === 'Friday');
  fridayComps.sort((a, b) => a.start_hour * 60 + a.start_minute - (b.start_hour * 60 + b.start_minute));
  const earliestFridayPrelim = fridayComps.length > 0 ? fridayComps[0] : undefined;

  // 3. Detect Parallel Room Streams
  const roomSet = new Set<string>();
  sessions.forEach((s) => {
    if (s.location) roomSet.add(s.location);
  });
  const parallelRooms = Array.from(roomSet);

  // 4. Detect Unique Instructors
  const talentSet = new Set<string>();
  sessions.forEach((s) => {
    if (s.instructors) {
      s.instructors.forEach((inst) => talentSet.add(inst));
    }
  });
  const instructors = Array.from(talentSet);

  // 5. Detect Late-Night Socials
  const socials = sessions.filter((s) => s.category === 'social' || s.title.toLowerCase().includes('late night'));
  const hasLateNight = socials.some((s) => s.end_hour >= 4 || s.start_hour >= 23 || s.title.toLowerCase().includes('late night'));

  // ==========================================
  // RULE 1: Pre-Convention Friday Intensives
  // ==========================================
  if (intensives.length > 0) {
    const intensiveOptions: DynamicQuestionOption[] = intensives.slice(0, 3).map((it, idx) => ({
      id: `intensive_${idx + 1}`,
      title: `${it.title} (${it.day} ${it.time.split('-')[0].trim()})`,
      desc: `Takes place in ${it.location}. Requires arrival by ${Math.max(6, it.start_hour - 2)}:00 AM.`,
      icon: '🧠'
    }));

    intensiveOptions.push({
      id: 'no_intensives',
      title: 'No Daytime Intensives (Standard Arrival)',
      desc: 'Arriving in time for evening competitions or social dancing kickoff.',
      icon: '✈️'
    });

    steps.push({
      id: 'intensive',
      question: `Are you attending any pre-convention intensives at ${eventName}?`,
      subtitle: 'Schedule features specialized masterclasses on Friday before main evening events.',
      options: intensiveOptions
    });
  }

  // ==========================================
  // RULE 2: Competition Division & Prelims Staging
  // ==========================================
  if (competitions.length > 0) {
    const compOptions: DynamicQuestionOption[] = [
      {
        id: 'novice',
        title: 'Novice Competitor Track',
        desc: 'Friday 6:30 PM Strictly Prelims + Saturday 12:30 PM J&J Prelims',
        icon: '🏆'
      },
      {
        id: 'intermediate',
        title: 'Intermediate Competitor Track',
        desc: 'Friday 6:30 PM Strictly Prelims + Saturday 2:15 PM J&J Prelims',
        icon: '⚡'
      },
      {
        id: 'advanced_allstar',
        title: 'Advanced / All-Star Competitor',
        desc: 'Friday 8:00 PM Strictly + Saturday 4:00 PM J&J Prelims',
        icon: '👑'
      },
      {
        id: 'social_only',
        title: 'Social Dancer / Non-Competitor',
        desc: 'Pure focus on workshops, shows, and late-night social dancing without contest staging calls',
        icon: '🕺'
      }
    ];

    steps.push({
      id: 'division',
      question: `Which competition divisions are you entering this weekend?`,
      subtitle: earliestFridayPrelim
        ? `Earliest preliminary calls start at ${earliestFridayPrelim.time} on Friday (${earliestFridayPrelim.title}).`
        : 'Aligns your calendar with competition marshalling calls.',
      options: compOptions
    });
  }

  // ==========================================
  // RULE 3: Airport Arrival & Staging Buffer
  // ==========================================
  const prelimTimeStr = earliestFridayPrelim ? earliestFridayPrelim.time.split('-')[0].trim() : '6:30 PM';
  const prelimHour = earliestFridayPrelim ? earliestFridayPrelim.start_hour : 18;
  const targetFlightLanding = `${Math.max(10, prelimHour - 4)}:00 PM`;

  steps.push({
    id: 'arrival',
    question: `When is your Friday arrival target for ${eventName}?`,
    subtitle: `Target airport: ${venueAirport}. Earliest Friday prelim staging is ${prelimTimeStr}.`,
    options: [
      {
        id: 'early',
        title: `Early Afternoon (Flight landing before ${targetFlightLanding})`,
        desc: 'Provides full 3.5h buffer for airport transit, hotel check-in, unpack & warmup.',
        icon: '🛬'
      },
      {
        id: 'evening',
        title: 'Friday Evening Arrival (6:00 PM – 8:00 PM)',
        desc: 'Check in for evening masterclasses and late-night kickoff social.',
        icon: '🌙'
      },
      {
        id: 'local_drive',
        title: 'Local Bay Area Commute / Drive-In',
        desc: 'Driving in locally; no flight landing buffer needed.',
        icon: '🚗'
      }
    ]
  });

  // ==========================================
  // RULE 4: Multi-Room Track Prioritization
  // ==========================================
  if (parallelRooms.length > 1) {
    steps.push({
      id: 'track',
      question: `${eventName} runs simultaneous sessions across multiple rooms. Which stream should we prioritize?`,
      subtitle: `Concurrent ballrooms: ${parallelRooms.slice(0, 3).join(', ')}.`,
      options: [
        {
          id: 'competitor_workshops',
          title: 'Competitor Leveled Workshops',
          desc: 'Division-targeted technique & strategy classes',
          icon: '⚙️'
        },
        {
          id: 'all_levels_ballroom',
          title: 'Main Ballroom Masterclasses',
          desc: 'Musicality, phrasing & partner connection classes in Grand Ballroom',
          icon: '🎵'
        },
        {
          id: 'balanced_mix',
          title: 'Curated All-Around Mix',
          desc: 'Optimal balance across all rooms and instructors',
          icon: '🎯'
        }
      ]
    });
  }

  // ==========================================
  // RULE 5: Late-Night Socials & Stamina Curve
  // ==========================================
  if (hasLateNight) {
    steps.push({
      id: 'stamina',
      question: `Social dancing runs until 5:00 AM+ with dedicated late-night rooms. How should we balance your schedule?`,
      subtitle: 'Includes Grand Ballroom Late Night + Soul Room / House of Blues after-hours.',
      options: [
        {
          id: 'night_owl',
          title: 'Night Owl / Social Marathoner',
          desc: 'Prioritize 12 AM - 5 AM late-night socials; filter early morning 9 AM classes',
          icon: '🦉'
        },
        {
          id: 'morning_learner',
          title: 'Daytime Workshop Enthusiast',
          desc: 'Prioritize 9:00 AM - 1:00 PM masterclasses; wrap up dancing by 1:30 AM',
          icon: '☀️'
        },
        {
          id: 'balanced_warrior',
          title: 'Saturday Showcase Gala & Balanced Socials',
          desc: 'Dress to Impress Saturday night gala + balanced afternoon masterclasses',
          icon: '✨'
        }
      ]
    });
  }

  return {
    steps,
    earliestFridayPrelim,
    intensivesDetected: intensives,
    competitionsDetected: competitions,
    parallelTracksDetected: parallelRooms,
    instructorsDetected: instructors,
    hasLateNightSocials: hasLateNight,
    lateNightClosingHour: '5:00 AM'
  };
}
