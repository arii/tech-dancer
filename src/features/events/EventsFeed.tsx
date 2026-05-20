import { useMemo } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useEvents } from './useEvents';
import { SEO } from '@/components/SEO';
import FolioGrid from '@/components/ui/FolioGrid';
import { FilterBar } from '@/components/ui/FilterBar';
import { EventCard } from '@/components/ui/EventCard';
import { Event } from '@/lib/content';
import { motion } from 'motion/react';
import { motionTokens } from '@/styles/motion';

export default function EventsFeed() {
  const { events, categories, view, setView } = useEvents();

  const groupedEvents = useMemo(() => {
    const groups: Record<string, Event[]> = {};
    events.forEach(event => {
      const region = event.region || 'Other Regions';
      if (!groups[region]) groups[region] = [];
      groups[region].push(event);
    });
    return groups;
  }, [events]);

  const regions = useMemo(() => Object.keys(groupedEvents).sort(), [groupedEvents]);

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
        label="DISCOVER"
        description="Scalable planning hub for WSDC events. Browse by region to find live guides, theme gear, and travel reminders."
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
              guideStatus={event.guideStatus}
              hasTheme={!!event.theme}
              hasReminders={!!event.startDate}
              variant={view === 'card' ? 'default' : 'compact'}
            />
          );
        }}
      >
        <Box marginTop={8}>
          <FilterBar
            categories={categories}
          />
        </Box>

        {/* Regional Grouping in Card View */}
        {view === 'card' && (
          <Stack gap={12} marginTop={12}>
            {regions.map((region) => (
              <Stack key={region} gap={6}>
                <Box border="b" className="border-line" paddingBottom={2}>
                  <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">
                    {region}
                  </Text>
                </Box>
                <Grid
                  cols={{ base: 1, md: 2, xl: 3, "2xl": 4 }}
                  gap={4}
                  as={motion.div}
                  variants={motionTokens.staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {groupedEvents[region].map((event) => (
                    <Box
                      key={event.slug}
                      as={motion.div}
                      variants={motionTokens.staggerItem}
                    >
                      <EventCard
                        title={event.title}
                        slug={event.slug}
                        location={event.location}
                        schedule={event.schedule}
                        guideStatus={event.guideStatus}
                        hasTheme={!!event.theme}
                        hasReminders={!!event.startDate}
                      />
                    </Box>
                  ))}
                </Grid>
              </Stack>
            ))}
          </Stack>
        )}
      </FolioGrid>
    </Box>
  );
}
