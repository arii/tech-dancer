import { SEO } from '@/components/SEO';
import FolioGrid from '@/components/ui/FolioGrid';
import { EventCard } from '@/components/ui/EventCard';
import { getEvents, Event } from '@/lib/content';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function EventsFeed() {
  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
    initialData: getEvents,
  });

  const categories = useMemo(() => {
    const cats = Array.from(new Set(events.filter(e => e.region).map(e => e.region!)));
    return ['All', ...cats];
  }, [events]);

  return (
    <>
      <SEO
        title="Event Resource Guides"
        description="A comprehensive planning hub for upcoming West Coast Swing events. Competition schedules, location details, and technical gear recommendations for every stop."
      />
      <FolioGrid
        items={events}
        categoryTitle="Upcoming Event Resource Guides"
        as="h1"
        label="PLAN"
        description="A comprehensive planning hub for upcoming West Coast Swing events. Competition schedules, location details, and technical gear recommendations for every stop."
        basePath="/events"
        searchPlaceholder="Search events..."
        categories={categories}
        categoryParam="category"
        renderItem={(item) => (
          <EventCard event={item as Event} />
        )}
      />
    </>
  );
}
