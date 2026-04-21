import { EventCard } from '../EventCard';
import { useHome } from '../useHome';

export default function UpcomingEvents() {
  const { upcomingEvents } = useHome();

  return (
    <>
      {upcomingEvents.map((event) => (
        <EventCard key={event.name} {...event} />
      ))}
    </>
  );
}
