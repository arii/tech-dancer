import { Box } from '@/layouts/Primitives';
import { useEvents } from './useEvents';
import { SEO } from '@/components/SEO';
import FolioGrid from '@/components/ui/FolioGrid';
import { FilterBar } from '@/components/ui/FilterBar';
import { EventCard } from '@/components/ui/EventCard';
import { Event } from '@/lib/content';

export default function EventsFeed() {
  const { events, categories, view, setView } = useEvents();

  return (
    <Box as="section">
      <SEO
        title="Event Resource Guides"
        description="A comprehensive planning hub for upcoming West Coast Swing events. Competition schedules, location details, and technical gear recommendations for every stop."
      />
      <FolioGrid
        items={events}
        categoryTitle="Event Resource Guides"
        as="h1"
        label="THE HUB"
        description="Your high-fidelity planning companion for the West Coast Swing circuit. From theme spotlights to curated gear checklists, start your journey to the next event here."
        basePath="/events"
        view={view}
        onViewChange={setView}
        renderItem={(item) => {
          const event = item as Event;
          return (
            <EventCard
              title={event.title}
              slug={event.slug}
              location={event.location}
              schedule={event.schedule}
            />
          );
        }}
      >
        <Box marginTop={8}>
          <FilterBar
            categories={categories}
          />
        </Box>
      </FolioGrid>
    </Box>
  );
}
