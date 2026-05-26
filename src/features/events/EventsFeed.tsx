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
        categoryTitle="Upcoming Event Resource Guides"
        as="h1"
        label="PLAN"
        description="A comprehensive planning hub for upcoming West Coast Swing events. Competition schedules, location details, and technical gear recommendations for every stop."
        basePath="/events"
        searchPlaceholder="Search events..."
        view={view}
        onViewChange={setView}
        renderItem={(item) => (
          <EventCard event={item as Event} />
        )}
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
