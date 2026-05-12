import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getEventBySlug } from '@/lib/content';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';

import { EventHero } from './components/EventHero';

import { EventNavigation } from './components/EventNavigation';
import { EventDetails } from './components/EventDetails';
import { EventSidebar } from './components/EventSidebar';
import { SECTION_SPACING } from './constants';

export default function EventGuide() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: event, isLoading } = useQuery({
    queryKey: ['events', slug],
    queryFn: () => slug ? getEventBySlug(slug) : undefined,
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <Box padding="panel" textAlign="center">
        <Text variant="mono" size="xs">Loading Intelligence...</Text>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">Event Not Found</Text>
          <Box as="button" onClick={() => navigate('/research')} className="hover:text-accent transition-colors">
            <Text variant="mono" size="xs">Back to Research</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      <SEO
        title={`${event.title} | Event Guide`}
        description={event.excerpt}
      />

      <EventHero
        title={event.title}
        location={event.city}
        date={event.schedule}
        eyebrow={event.category}
      />

      <EventNavigation />

      <Box maxWidth="screen-xl" marginX="auto" paddingX={{ base: 6, md: 12, lg: 24 }} paddingY={{ base: 8, md: SECTION_SPACING }}>
        <Grid cols={{ base: 1, lg: 3 }} gap={{ base: 8, lg: 16 }}>
          <Box className="lg:col-span-2">
            <EventDetails event={event} />
          </Box>
          <EventSidebar event={event} />
        </Grid>
      </Box>
    </Box>
  );
}
