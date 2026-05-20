import { Plane, Trophy, Hotel, CheckCircle2, ShieldCheck, Briefcase } from 'lucide-react';
import { EventAnchors, TimelineItem } from '../types';
import { parseDate, addDays } from '@/lib/utils';

export const calculateTimeline = (event: EventAnchors): TimelineItem[] => {
  const start = parseDate(event.startDate);
  const early = event.earlyBirdDate ? parseDate(event.earlyBirdDate) : null;
  const registration = event.registrationDeadline ? parseDate(event.registrationDeadline) : null;
  const hotel = event.hotelCutoffDate ? parseDate(event.hotelCutoffDate) : null;
  const packing = event.packingReminderDate ? parseDate(event.packingReminderDate) : null;

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

  if (early) {
    timeline.push({
      id: 'early-bird',
      date: addDays(early, -2), // Use a 2-day buffer for Early Bird as per the guide
      label: "Early Bird Deadline",
      description: `Register for ${event.title} now. This is the final window to secure the discount while minimizing risk.`,
      icon: Trophy,
      badge: 'Money',
    });
  }

  if (registration) {
    timeline.push({
      id: 'registration-deadline',
      date: registration,
      label: "Registration Deadline",
      description: `Final call for online registration for ${event.title}. Avoid on-site registration lines and stress.`,
      icon: CheckCircle2,
      badge: 'Required',
    });
  }

  if (hotel) {
    timeline.push({
      id: 'hotel-block',
      date: hotel,
      label: "Hotel Block Cutoff",
      description: "Book your room within the discounted block. Hotel blocks often sell out before this date.",
      icon: Hotel,
      badge: 'Logistics',
    });
  }

  if (packing) {
    timeline.push({
      id: 'packing-reminder',
      date: packing,
      label: "Packing Reminder",
      description: "Finalize your outfits, check the theme requirements, and make sure your dance shoes are in the bag.",
      icon: Briefcase,
      badge: 'Prep',
    });
  }

  return timeline.sort((a, b) => a.date.getTime() - b.date.getTime());
};
