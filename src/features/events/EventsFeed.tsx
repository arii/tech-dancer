import { Box, Grid, Text, Stack } from '@/layouts/Primitives';
import { useEvents } from './useEvents';
import { SEO } from '@/components/SEO';
import { EventCard } from '@/components/ui/EventCard';
import { Event } from '@/lib/content';
import { ContentFeedSection } from '@/components/ui/ContentFeedSection';
import { EventHero } from './components/EventHero';
import { PreparationJourney } from './components/PreparationJourney';
import { ResourceToolkit } from './components/ResourceToolkit';
import { CommunityStories } from './components/CommunityStories';

export default function EventsFeed() {
  const { events, view, setView, searchTerm, setSearchTerm } = useEvents();

  return (
    <Box
      as="section"
      marginX="auto"
      width="full"
      maxWidth="screen-2xl"
      minWidth={0}
      paddingX={{ base: 4, sm: 6, lg: 8 }}
      paddingBottom={12}
    >
      <SEO
        title="Event Resource Guides"
        description="A comprehensive planning hub for upcoming West Coast Swing events. Competition schedules, location details, and technical gear recommendations for every stop."
      />

      <EventHero />

      <PreparationJourney />

      <ContentFeedSection
        id="event-guides"
        title="Popular Event Guides"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        view={view}
        setView={setView}
        placeholder="Search events..."
        items={events}
        emptyStateDescription={searchTerm ? `No matches for "${searchTerm}".` : `No event guides found.`}
        renderItem={(event) => (
          <Box
            key={event.slug}
            padding={4}
            height="full"
            className="bg-transparent"
          >
            <EventCard event={event as Event} />
          </Box>
        )}
      />

      <ResourceToolkit />
      <CommunityStories />
    </Box>
  );
}
