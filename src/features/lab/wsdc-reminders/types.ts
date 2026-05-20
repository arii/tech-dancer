import { type LucideIcon } from 'lucide-react';

export interface EventAnchors {
  title: string;
  startDate: string;      // The "Day 0" of the event
  earlyBirdDate?: string;  // Verified from event site
  registrationDeadline?: string;
  hotelCutoffDate?: string; // Verified from event site
  packingReminderDate?: string;
  url?: string;
}

export interface TimelineItem {
  id: string;
  date: Date;
  endDate?: Date;
  label: string;
  description: string;
  formattedDate?: string;
  icon?: LucideIcon;
  badge?: string;
}
