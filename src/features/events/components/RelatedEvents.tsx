import { useNavigate } from 'react-router-dom';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Event } from '@/lib/content';
import { SectionHeader } from '@/components/ui/SectionHeader';

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
      <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6}>
        {events.map((event) => (
          <Box
            key={event.slug}
            as="button"
            onClick={() => navigate(`/events/${event.slug}`)}
            border
            radius="lg"
            padding={6}
            surface="surface"
            cursor="pointer"
            className="group text-left hover:border-accent/40 transition-all hover:-translate-y-0.5"
          >
            <Stack gap={4}>
              <Box>
                <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">
                  {event.schedule}
                </Text>
                <Text
                  variant="body"
                  size="lg"
                  weight="font-bold"
                  className="group-hover:text-accent transition-colors leading-tight block marginTop={1}"
                >
                  {event.title}
                </Text>
              </Box>
              <Box>
                <Text size="sm" color="dim">{event.location}</Text>
                <Text size="sm" color="dim">{event.city}</Text>
              </Box>
            </Stack>
          </Box>
        ))}
      </Grid>
    </Stack>
  );
}
