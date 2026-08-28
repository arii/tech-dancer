import { DiscoveryResponse, FormQuestion } from '../types/navigator';
import { CALIFORNIA_2026_EVENTS, WCSCaliforniaEvent } from '../data/californiaEvents';
import { evaluateScheduleRules, NormalizedSession } from './scheduleRuleEngine';

export interface DynamicQuestionOption {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

export interface DynamicQuestionStep {
  id: string;
  question: string;
  subtitle?: string;
  options: DynamicQuestionOption[];
}

/**
 * Converts backend/AI FormQuestions into DynamicQuestionSteps with icons and subtitles.
 */
function mapFormQuestionToStep(fq: FormQuestion): DynamicQuestionStep {
  const iconMap: Record<string, string> = {
    novice: '🏆',
    intermediate: '⚡',
    advanced: '👑',
    allstar: '👑',
    social_only: '🕺',
    workshops: '🧠',
    early: '🛬',
    evening: '🌙',
    local: '🚗',
    technique: '⚙️',
    musicality: '🎵',
    connection: '🤝',
    styling: '✨',
    all_tracks: '🎯'
  };

  return {
    id: fq.id,
    question: fq.title,
    subtitle: fq.context,
    options: (fq.options || []).map((opt, idx) => ({
      id: String(opt.value),
      title: opt.label,
      desc: opt.subtitle || (opt.badge ? `Badge: ${opt.badge}` : ''),
      icon: iconMap[String(opt.value).toLowerCase()] || (idx === 0 ? '✨' : idx === 1 ? '🎯' : idx === 2 ? '⚡' : '🌟')
    }))
  };
}

/**
 * Evaluates the event timetable payload and metadata to extract the structural taxonomy:
 * 1. Event-grounded schedule decision forks (audition gates, pre-convention intensives, prelims)
 * 2. Parallel workshop stream tracks
 * 3. Verified featured champion instructors
 * 4. Venue-specific airport and arrival logistics
 */
export function analyzeEventFootprint(
  eventName: string,
  discovery?: DiscoveryResponse
): DynamicQuestionStep[] {
  // If AI/Backend provided suggested form questions, use them directly
  if (discovery?.suggested_form_questions && discovery.suggested_form_questions.length > 0) {
    return discovery.suggested_form_questions.map(mapFormQuestionToStep);
  }

  const normName = eventName.toLowerCase();

  // Match event from authentic database
  const matchedEvent: WCSCaliforniaEvent | undefined = CALIFORNIA_2026_EVENTS.find((e) =>
    normName.includes(e.id.replace(/-2026/g, '')) ||
    normName.includes(e.name.toLowerCase()) ||
    e.name.toLowerCase().includes(normName)
  );

  // Derive mock normalized sessions from event footprint
  const sessions: NormalizedSession[] = [
    {
      id: 'fri-intensive-1',
      title: 'Mastering the Blues Intensive with Jordan & Tatiana',
      day: 'Friday',
      time: '10:00 AM - 1:00 PM',
      start_hour: 10,
      start_minute: 0,
      end_hour: 13,
      end_minute: 0,
      location: 'Regency Ballroom',
      category: 'intensive',
      instructors: ['Jordan Frisbee & Tatiana Mollmann']
    },
    {
      id: 'fri-judging-intensive',
      title: 'Judging Intensive with Kelly Casanova (Part 1)',
      day: 'Friday',
      time: '1:00 PM - 4:00 PM',
      start_hour: 13,
      start_minute: 0,
      end_hour: 16,
      end_minute: 0,
      location: 'Harbour Room A',
      category: 'intensive',
      instructors: ['Kelly Casanova']
    },
    {
      id: 'fri-strictly-prelims',
      title: 'Novice / Intermediate Strictly Swing Prelims',
      day: 'Friday',
      time: '6:30 PM - 8:00 PM',
      start_hour: 18,
      start_minute: 30,
      end_hour: 20,
      end_minute: 0,
      location: 'Grand Peninsula Ballroom',
      category: 'competition'
    },
    {
      id: 'sat-novice-jj',
      title: 'Novice Jack & Jill Prelims & Semifinals',
      day: 'Saturday',
      time: '12:30 PM - 2:00 PM',
      start_hour: 12,
      start_minute: 30,
      end_hour: 14,
      end_minute: 0,
      location: 'Grand Peninsula Ballroom',
      category: 'competition'
    },
    {
      id: 'sat-alllevels-class',
      title: 'All-Levels Masterclasses (Grand Peninsula)',
      day: 'Saturday',
      time: '9:00 AM - 11:00 AM',
      start_hour: 9,
      start_minute: 0,
      end_hour: 11,
      end_minute: 0,
      location: 'Grand Peninsula Ballroom',
      category: 'workshop'
    },
    {
      id: 'sat-regency-class',
      title: 'Regency Ballroom Workshops & Social',
      day: 'Saturday',
      time: '9:00 AM - 11:00 AM',
      start_hour: 9,
      start_minute: 0,
      end_hour: 11,
      end_minute: 0,
      location: 'Regency Ballroom',
      category: 'workshop'
    },
    {
      id: 'sat-sandpebble-competitors',
      title: 'Competitor Leveled Afternoon Workshops',
      day: 'Saturday',
      time: '10:00 AM - 12:00 PM',
      start_hour: 10,
      start_minute: 0,
      end_hour: 12,
      end_minute: 0,
      location: 'Sandpebble Room ABC',
      category: 'workshop'
    },
    {
      id: 'fri-latenight-social',
      title: 'Grand Peninsula Late Night Social & Regency Soul Room',
      day: 'Friday',
      time: '12:00 AM - 5:00 AM',
      start_hour: 0,
      start_minute: 0,
      end_hour: 5,
      end_minute: 0,
      location: 'Grand Peninsula Ballroom',
      category: 'social'
    }
  ];

  const result = evaluateScheduleRules(
    sessions,
    matchedEvent?.name || eventName,
    matchedEvent?.primaryAirport.split(' ')[0] || 'SFO'
  );

  return result.steps;
}
