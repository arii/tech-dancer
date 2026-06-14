import { motion } from 'motion/react';
import { Event } from '@/lib/content';
import { Stack, Grid, Box } from '@/layouts/Primitives';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EventCard } from '@/components/ui/EventCard';
import { motionTokens } from '@/styles/motion';

interface RelatedEventsProps {
  id?: string;
  title?: string;
  events: Event[];
}

export function RelatedEvents({ id, title, events }: RelatedEventsProps) {
  if (!events || events.length === 0) return null;

  const firstRegion = events[0]?.region;
  const dynamicTitle = title || (firstRegion ? `More ${firstRegion} Guides` : "More Guides");

  return (
    <Box id={id} as="section" data-testid="related">
      <Stack gap={8}>
        <SectionHeader eyebrow="EXPLORE" title={dynamicTitle} />
        <Grid
          cols={{ base: 1, sm: 2, lg: 3 }}
          gap={4}
          as={motion.div}
          variants={motionTokens.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
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
      </Stack>
    </Box>
  );
}
