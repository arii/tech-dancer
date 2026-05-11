import { Box } from '@/layouts/Primitives';
import { useEvents } from './useEvents';
import { SEO } from '@/components/SEO';
import FolioGrid from '@/components/ui/FolioGrid';
import { FilterBar } from '@/components/ui/FilterBar';

export default function EventsFeed() {
  const { events, categories, view, setView } = useEvents();

  return (
    <Box as="section">
      <SEO
        title="Events"
        description="A comprehensive guide to upcoming West Coast Swing events. Competition schedules, location details, and technical gear recommendations for every stop."
      />
      <FolioGrid
        items={events}
        categoryTitle="Upcoming Events"
        as="h1"
        label="COMPETE"
        description="A comprehensive guide to upcoming West Coast Swing events. Competition schedules, location details, and technical gear recommendations for every stop."
        basePath="/events"
        view={view}
        onViewChange={setView}
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
