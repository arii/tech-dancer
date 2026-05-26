import { motion } from 'motion/react';
import { Event } from '@/lib/content';
import { Grid, Box } from '@/layouts/Primitives';
import { EventCard } from '@/components/ui/EventCard';
import { motionTokens } from '@/styles/motion';
import { EventSection } from './EventSection';

interface RelatedEventsProps {
  id?: string;
  title?: string;
  events: Event[];
}

export function RelatedEvents({ id, title, events }: RelatedEventsProps) {
  if (!events || events.length === 0) return null;

  const firstRegion = events[0]?.region;
  const dynamicTitle = title || (firstRegion ? `More ${firstRegion} Guides` : 'More Guides');

  return (
    <EventSection
      id={id}
      eyebrow="Explore"
      title={dynamicTitle}
      description="Keep planning with nearby weekends and similar guides."
    >
      <Grid
        cols={{ base: 1, sm: 2, lg: 3 }}
        gap={4}
        as={motion.div}
        variants={motionTokens.staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-50px' }}
      >
        {events.map((event) => (
          <Box
            key={event.slug}
            as={motion.div}
            variants={motionTokens.staggerItem}
            height="full"
          >
            <EventCard event={event} />
          </Box>
        ))}
      </Grid>
    </EventSection>
  );
}
