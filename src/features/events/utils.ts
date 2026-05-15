import { Event } from '@/lib/content';

interface Deadline {
  id: string;
  label: string;
  date: string;
  type: 'Discount' | 'Deadline' | 'Reminder';
  color: string;
}

/**
 * Derives logistical deadlines from event frontmatter.
 */
export function getEventDeadlines(event: Event): Deadline[] {
  return [
    event.earlyBirdDate && {
      id: 'early-bird',
      label: 'Early-bird discount ends',
      date: event.earlyBirdDate,
      type: 'Discount' as const,
      color: 'text-red-400 border-red-400/30 bg-red-400/10',
    },
    event.registrationDeadline && {
      id: 'registration',
      label: 'Registration deadline',
      date: event.registrationDeadline,
      type: 'Deadline' as const,
      color: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
    },
    event.hotelCutoffDate && {
      id: 'hotel',
      label: 'Hotel deadline',
      date: event.hotelCutoffDate,
      type: 'Deadline' as const,
      color: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    },
    event.packingReminderDate && {
      id: 'packing',
      label: 'Packing reminder',
      date: event.packingReminderDate,
      type: 'Reminder' as const,
      color: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
    },
  ].filter((d): d is Deadline => !!d);
}

export const NOTIFICATION_CHANNELS = [
  { id: 'email', label: 'Email' },
  { id: 'browser', label: 'Browser Push' },
  { id: 'sms', label: 'Text (SMS)' },
  { id: 'ical', label: 'Calendar (iCal)' },
] as const;
