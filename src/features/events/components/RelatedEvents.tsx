import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import { getEvents, Event } from '@/lib/content';
import { Stack, Grid, Box } from '@/layouts/Primitives';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EventCard } from '@/components/ui/EventCard';
import { motionTokens } from '@/styles/motion';

interface RelatedEventsProps {
  id?: string;
  title?: string;
  slugs?: string[];
  events?: Event[];
}

/**
 * Renders a section of related events.
 * Can be passed a list of slugs (to be fetched/resolved) or direct event objects.
 */
export function RelatedEvents({
  id,
  title = "Related Events",
  slugs = [],
  events: directEvents
}: RelatedEventsProps) {
  const navigate = useNavigate();

  // Fetch all events if we only have slugs to resolve
  const { data: allEvents = [] } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    enabled: slugs.length > 0 && !directEvents,
    staleTime: 3600000, // 1 hour
  });

  // Resolve events from slugs or use direct events
  const resolvedEvents = useMemo(() => {
    if (directEvents) return directEvents;
    if (slugs.length === 0) return [];

    return slugs
      .map(slug => allEvents.find(e => e.slug === slug))
      .filter((e): e is Event => !!e);
  }, [slugs, allEvents, directEvents]);

  if (resolvedEvents.length === 0) return null;

  return (
    <Box as="section" id={id}>
      <Stack gap={8}>
        <SectionHeader eyebrow="EXPLORE" title={title} />
        <Grid
          cols={{ base: 1, sm: 2, lg: 3 }}
          gap={4}
          as={motion.div}
          variants={motionTokens.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
        >
          {resolvedEvents.map((event) => (
            <Box
              key={event.slug}
              as={motion.div}
              variants={motionTokens.staggerItem}
              height="full"
            >
              <EventCard
                name={event.title}
                location={event.location}
                schedule={event.schedule}
                onClick={() => navigate(`/events/${event.slug}`)}
              />
            </Box>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
