import { type LucideIcon } from 'lucide-react';

export interface EventAnchors {
  title: string;
  startDate: string;
  earlyBirdDate?: string;
  registrationDeadline?: string;
  hotelCutoffDate?: string;
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
