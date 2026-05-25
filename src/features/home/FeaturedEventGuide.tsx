import { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { getEvents } from '@/lib/content';

export function FeaturedEventGuide() {
  const featured = getEvents().filter((event) => !!event.heroImage);
  const [index, setIndex] = useState(0);
  const event = featured[index];
  if (!event) return null;

  return (
    <Box as="section">
      <Text as="h2" variant="headline" size="2xl" weight="font-black" marginBottom={6}>Featured Event Guide</Text>
      <Box display="flex" gap={5} border radius="lg" overflow="hidden" className="bg-surface">
        <Box width={32} shrink={0} className="relative hidden sm:block"><img src={event.heroImage} alt={event.title} className="h-full w-full object-cover" /></Box>
        <Stack gap={3} padding={6} flex justify="between">
          <Stack gap={2}>
            <Box display="flex" align="center" gap={2}><MapPin className="h-3.5 w-3.5 text-accent" /><Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase>{event.location}</Text></Box>
            <Text variant="headline" size="xl" weight="font-black" leading="tight">{event.title}</Text>
            <Text variant="body" size="sm" color="dim" leading="relaxed" className="line-clamp-3">{event.excerpt}</Text>
          </Stack>
          <Box display="flex" align="center" justify="between"><Text as={NavLink} to={`/events/${event.slug}`} variant="mono" size="xs" color="accent" weight="font-bold" className="hover:underline">Read the guide →</Text>
            <Box display="flex" gap={2}><Box as="button" onClick={() => setIndex((i) => Math.max(0, i - 1))} padding={2} border radius="sm" className="cursor-pointer transition-colors hover:border-accent/50 disabled:opacity-30" disabled={index === 0} aria-label="Previous event"><ChevronLeft className="h-4 w-4" /></Box><Box as="button" onClick={() => setIndex((i) => Math.min(featured.length - 1, i + 1))} padding={2} border radius="sm" className="cursor-pointer transition-colors hover:border-accent/50 disabled:opacity-30" disabled={index === featured.length - 1} aria-label="Next event"><ChevronRight className="h-4 w-4" /></Box></Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
