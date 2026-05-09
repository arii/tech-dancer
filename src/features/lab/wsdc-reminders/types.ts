export interface EventAnchors {
  title: string;
  startDate: string;      // The "Day 0" of the event
  earlyBirdDate: string;  // Verified from event site
  hotelCutoffDate: string; // Verified from event site
  url?: string;
}

export interface TimelineItem {
  id: string;
  date: Date;
  label: string;
  description: string;
}
