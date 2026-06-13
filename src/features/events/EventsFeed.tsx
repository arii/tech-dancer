import { Box, Grid, Text, Stack } from '@/layouts/Primitives';
import { useEvents } from './useEvents';
import { SEO } from '@/components/SEO';
import { EventCard } from '@/components/ui/EventCard';
import { Event } from '@/lib/content';
import { SearchBox } from '@/components/ui/SearchBox';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search } from 'lucide-react';
import { EventHero } from './components/EventHero';
import { PreparationJourney } from './components/PreparationJourney';
import { ResourceToolkit } from './components/ResourceToolkit';
import { CommunityStories } from './components/CommunityStories';

export default function EventsFeed() {
  const { events, view, setView, searchTerm, setSearchTerm } = useEvents();

  return (
    <Box as="section" className="mx-auto w-full max-w-[1600px] min-w-0 px-4 sm:px-6 lg:px-8 pb-safe-bottom">
      <SEO
        title="Event Resource Guides"
        description="A comprehensive planning hub for upcoming West Coast Swing events. Competition schedules, location details, and technical gear recommendations for every stop."
      />

      <EventHero />

      <PreparationJourney />

      {/* Event Guides Section */}
      <Box id="event-guides" as="section" marginTop={{ base: 16, lg: 32 }}>
        <Stack
          direction={{ base: 'col', sm: 'row' }}
          align={{ base: 'start', sm: 'center' }}
          justify="between"
          gap={6}
          marginBottom={8}
        >
          <Text variant="mono" size="xs" color="brand" weight="font-black" uppercase tracking="widest">
            Popular Event Guides
          </Text>

          <Box display="flex" align="center" gap={4} wrap className="w-full sm:w-auto">
            <SearchBox
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events..."
            />
            <ViewToggle view={view} onChange={setView} />
          </Box>
        </Stack>

        {events.length === 0 ? (
          <EmptyState
            icon={<Search className="w-12 h-12" />}
            title="No results found"
            description={searchTerm ? `No matches for "${searchTerm}".` : `No event guides found.`}
          />
        ) : (
          <Grid
            cols={{ base: 1, md: 2, xl: 3, "2xl": 4 }}
            gap={4}
            className="grid-cols-[repeat(auto-fit,minmax(360px,1fr))]"
          >
            {events.map((event) => (
              <Box
                key={event.slug}
                padding={4}
                height="full"
                className="bg-transparent"
              >
                <EventCard event={event as Event} />
              </Box>
            ))}
          </Grid>
        )}
      </Box>

      <ResourceToolkit />
      <CommunityStories />
    </Box>
  );
}
