import { EventAnchors, TimelineItem } from '../types';

export const calculateTimeline = (event: EventAnchors): TimelineItem[] => {
  const start = new Date(event.startDate);
  const early = new Date(event.earlyBirdDate);
  const hotel = new Date(event.hotelCutoffDate);

  // Use a 2-day buffer for Early Bird as per the guide
  const earlyBuffer = new Date(early.getTime() - (2 * 24 * 60 * 60 * 1000));

  const timeline: TimelineItem[] = [
    {
      id: 'flight-track',
      date: new Date(start.getTime() - (90 * 24 * 60 * 60 * 1000)),
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
      date: new Date(start.getTime() - (14 * 24 * 60 * 60 * 1000)),
      label: "Competition Signups",
      description: "Finalize Jack & Jill entries. Note: Competition fees are usually non-refundable.",
    },
    {
      id: 'cancel-safety',
      date: new Date(start.getTime() - (5 * 24 * 60 * 60 * 1000)),
      label: "Cancel Safety Check",
      description: "Execute final 'Go/No-Go' decision. Cancel or transfer hotel rooms to avoid penalties.",
    }
  ];

  return timeline.sort((a, b) => a.date.getTime() - b.date.getTime());
};
