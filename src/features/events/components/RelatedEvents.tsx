import { useNavigate } from 'react-router-dom';
import { Event } from '@/lib/content';
import { Stack, Grid } from '@/layouts/Primitives';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContentCard } from '@/components/ui/ContentCard';

interface RelatedEventsProps {
  id?: string;
  title?: string;
  events: Event[];
}

export function RelatedEvents({ id, title = "Related Events", events }: RelatedEventsProps) {
  const navigate = useNavigate();
  if (!events || events.length === 0) return null;

  return (
    <Stack id={id} gap={8}>
      <SectionHeader eyebrow="EXPLORE" title={title} />
      <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={4}>
        {events.map((event) => (
          <ContentCard
            key={event.slug}
            variant="event"
            title={event.title}
            location={event.location}
            schedule={event.schedule}
            onClick={() => navigate(`/events/${event.slug}`)}
          />
        ))}
      </Grid>
    </Stack>
  );
}
