import { EventAnchors, TimelineItem } from '../types';
import { parseDate, addDays } from '@/lib/utils';

export const calculateTimeline = (event: EventAnchors): TimelineItem[] => {
  const start = parseDate(event.startDate);
  const early = parseDate(event.earlyBirdDate);
  const hotel = parseDate(event.hotelCutoffDate);

  // Use a 2-day buffer for Early Bird as per the guide
  const earlyBuffer = addDays(early, -2);

  const timeline: TimelineItem[] = [
    {
      id: 'flight-track',
      date: addDays(start, -90),
      label: "Start Flight Tracking",
      description: "Set United/Delta price alerts. Book Main Cabin to preserve credit flexibility.",
    },
    {
      id: 'early-bird',
      date: earlyBuffer,
      label: "Early Bird Deadline",
      description: `Register for ${event.title} now. This is the final window to secure the discount while minimizing risk.`,
    },
    {
      id: 'hotel-block',
      date: hotel,
      label: "Hotel Block Cutoff",
      description: "Book your room within the discounted block. Hotel blocks often sell out before this date.",
    },
    {
      id: 'comp-window',
      date: addDays(start, -14),
      label: "Competition Signups",
      description: "Finalize Jack & Jill entries. Note: Competition fees are usually non-refundable.",
    },
    {
      id: 'cancel-safety',
      date: addDays(start, -5),
      label: "Cancel Safety Check",
      description: "Execute final 'Go/No-Go' decision. Cancel or transfer hotel rooms to avoid penalties.",
    }
  ];

  return timeline.sort((a, b) => a.date.getTime() - b.date.getTime());
};
