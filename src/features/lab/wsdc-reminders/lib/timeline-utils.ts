import { Plane, Trophy, Hotel, CheckCircle2, ShieldCheck, Briefcase } from 'lucide-react';
import { EventAnchors, TimelineItem } from '../types';
import { parseDate, addDays } from '@/lib/utils';

export interface TimelineOptions {
  filterIds?: string[];
}

export const calculateTimeline = (event: EventAnchors, options: TimelineOptions = {}): TimelineItem[] => {
  const start = parseDate(event.startDate);

  const isValidDate = (d: unknown) => d instanceof Date && !isNaN(d.getTime());

  const early = event.earlyBirdDate ? parseDate(event.earlyBirdDate) : null;
  const registration = event.registrationDeadline ? parseDate(event.registrationDeadline) : null;
  const hotel = event.hotelCutoffDate ? parseDate(event.hotelCutoffDate) : null;
  const packing = event.packingReminderDate ? parseDate(event.packingReminderDate) : null;

  const safeEarly = isValidDate(early) ? early : null;
  const safeRegistration = isValidDate(registration) ? registration : null;
  const safeHotel = isValidDate(hotel) ? hotel : null;
  const safePacking = isValidDate(packing) ? packing : null;

  const timeline: TimelineItem[] = [
    {
      id: 'flight-track',
      date: addDays(start, -90),
      label: "Start Flight Tracking",
      description: "Set United/Delta price alerts. Book Main Cabin to preserve credit flexibility.",
      icon: Plane,
      badge: 'Logistics',
    },
    {
      id: 'comp-window',
      date: addDays(start, -14),
      label: "Competition Signups",
      description: "Finalize Jack & Jill entries. Note: Competition fees are usually non-refundable.",
      icon: CheckCircle2,
      badge: 'Action',
    },
    {
      id: 'cancel-safety',
      date: addDays(start, -5),
      label: "Cancel Safety Check",
      description: "Execute final 'Go/No-Go' decision. Cancel or transfer hotel rooms to avoid penalties.",
      icon: ShieldCheck,
      badge: 'Safety',
    }
  ];

  if (safeEarly) {
    timeline.push({
      id: 'early-bird',
      date: addDays(safeEarly, -2),
      label: "Early Bird Deadline",
      description: `Register for ${event.title} now. Secures maximum discount.`,
      icon: Trophy,
      badge: 'Money',
    });
  }

  if (safeRegistration) {
    timeline.push({
      id: 'registration-deadline',
      date: safeRegistration,
      label: "Registration Deadline",
      description: `Final call for online registration for ${event.title}.`,
      icon: CheckCircle2,
      badge: 'Required',
    });
  }

  if (safeHotel) {
    timeline.push({
      id: 'hotel-block',
      date: safeHotel,
      label: "Hotel Block Cutoff",
      description: "Book within the discounted block before it sells out.",
      icon: Hotel,
      badge: 'Logistics',
    });
  }

  if (safePacking) {
    timeline.push({
      id: 'packing-reminder',
      date: safePacking,
      label: "Packing Reminder",
      description: "Finalize outfits and check theme requirements.",
      icon: Briefcase,
      badge: 'Prep',
    });
  }

  let result = timeline;
  if (options.filterIds) {
    result = result.filter(item => options.filterIds!.includes(item.id));
  }

  return result.sort((a, b) => a.date.getTime() - b.date.getTime());
};

const JOURNEY_IDS = ['early-bird', 'registration-deadline', 'hotel-block', 'packing-reminder'];

/**
 * Specifically calculates milestones required for the Event Guide journey.
 * Decouples the display set from the UI component.
 */
export const calculateJourneyTimeline = (event: EventAnchors): TimelineItem[] => {
  return calculateTimeline(event, { filterIds: JOURNEY_IDS });
};
