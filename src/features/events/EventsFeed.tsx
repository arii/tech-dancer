import { Box, Stack } from '@/layouts/Primitives';
import { useEvents } from './useEvents';
import { SEO } from '@/components/SEO';
import FolioGrid from '@/components/ui/FolioGrid';
import { FilterBar } from '@/components/ui/FilterBar';
import { EventCard } from '@/components/ui/EventCard';
import { Event } from '@/lib/content';
import { EventResourcesHero } from './components/EventResourcesHero';
import { FeaturedEventBanner } from './components/FeaturedEventBanner';
import { PreparationJourney } from './components/PreparationJourney';
import { ResourceToolkit } from './components/ResourceToolkit';
import { CommunityStories } from './components/CommunityStories';
import { useRef } from 'react';

export default function EventsFeed() {
  const { events, categories, view, setView } = useEvents();
  const feedRef = useRef<HTMLDivElement>(null);

  // Pick the most recent upcoming event as the featured one
  const featuredEvent = events[0];

  const scrollToFeed = () => {
    feedRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box as="section" width="full">
      <SEO
        title="Event Resource Guides"
        description="A comprehensive planning hub for upcoming West Coast Swing events. Competition schedules, location details, and technical gear recommendations for every stop."
      />

      <Stack gap={20} maxWidth="screen-2xl" marginX="auto" width="full" className="px-4 md:px-8">
        {/* 1. Hero Section */}
        <EventResourcesHero onExploreClick={scrollToFeed} />

        {/* 2. Featured Upcoming Event */}
        {featuredEvent && (
          <Stack gap={8}>
            <FeaturedEventBanner event={featuredEvent} />
          </Stack>
        )}

        <Box height="px" width="full" className="bg-line/50" />

        {/* 3. Event Preparation Journey */}
        <PreparationJourney />

        <Box height="px" width="full" className="bg-line/50" />

        {/* 4. Event Resources Toolkit */}
        <ResourceToolkit onGuidesClick={scrollToFeed} />

        <Box height="px" width="full" className="bg-line/50" />

        {/* 5. Community Stories */}
        <CommunityStories />

        <Box height="px" width="full" className="bg-line/50" />

        {/* 6. Original Event Feed */}
        <Box ref={feedRef} scrollMarginTop={32}>
          <FolioGrid
            items={events}
            categoryTitle="Upcoming Event Resource Guides"
            as="h2"
            label="GUIDES"
            description="Explore our full library of technical event guides, covering schedules, venues, and gear strategies."
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
      </Stack>
    </Box>
  );
}
