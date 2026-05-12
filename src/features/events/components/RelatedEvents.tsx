import { Event } from '@/lib/content';
import { Stack, Grid } from '@/layouts/Primitives';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EventCard } from '@/components/ui/EventCard';

interface RelatedEventsProps {
  title?: string;
  events: Event[];
}

export function RelatedEvents({ title = "Related Events", events }: RelatedEventsProps) {
  if (!events || events.length === 0) return null;

  return (
    <Stack gap={8}>
      <SectionHeader label="EXPLORE" title={title} />
      <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={4}>
        {events.map((event) => (
          <EventCard
            key={event.slug}
            name={event.title}
            location={event.location}
            schedule={event.schedule}
          />
        ))}
      </Grid>
    </Stack>
  );
}
