import { useNavigate } from 'react-router-dom';
import { Box, Stack, Grid } from '@/layouts/Primitives';
import { Event } from '@/lib/content';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EventCard } from '@/components/ui/EventCard';

interface RelatedEventsProps {
  id?: string;
  title?: string;
  events: Event[];
}

export function RelatedEvents({ id, title = "Related Events", events }: RelatedEventsProps) {
  const navigate = useNavigate();

  if (!events || events.length === 0) return null;

  return (
    <Box id={id} as="section">
      <Stack gap={8}>
        <SectionHeader eyebrow="EXPLORE" title={title} />
        <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6}>
          {events.map((event) => (
            <EventCard
              key={event.slug}
              name={event.title}
              location={event.location}
              schedule={event.schedule}
              onClick={() => navigate(`/events/${event.slug}`)}
            />
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
