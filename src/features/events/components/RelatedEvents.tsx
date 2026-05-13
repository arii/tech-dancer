import { Event } from '@/lib/content';
import { Stack, Grid } from '@/layouts/Primitives';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EventCard } from '@/components/ui/EventCard';

interface RelatedEventsProps {
  id?: string;
  title?: string;
  events: Event[];
}

export function RelatedEvents({ id, title = "Related Events", events }: RelatedEventsProps) {
  if (!events || events.length === 0) return null;

  return (
    <Stack id={id} gap={8}>
      <SectionHeader eyebrow="EXPLORE" title={title} />
      <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={4}>
        {events.map((event) => (
          <EventCard
            key={event.slug}
            title={event.title}
            slug={event.slug}
            location={event.location}
            schedule={event.schedule}
          />
        ))}
      </Grid>
    </Stack>
  );
}
