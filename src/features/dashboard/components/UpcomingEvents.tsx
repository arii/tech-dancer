import { LucideIcon } from 'lucide-react';
import { EventCard } from '../EventCard';

interface Event {
  name: string;
  date: string;
  status: string;
  icon: LucideIcon;
}

export default function UpcomingEvents({ events }: { events: Event[] }) {
  return (
    <>
      {events.map((event) => (
        <EventCard key={event.name} {...event} />
      ))}
    </>
  );
}
