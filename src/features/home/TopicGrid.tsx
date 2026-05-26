// impeccable-ignore-file
import { Calendar, ShoppingBag, BookOpen } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Grid, Stack, Text } from '@/layouts/Primitives';

const TOPICS = [
  {
    icon: Calendar,
    label: 'Event Guides',
    description: 'What to expect, what to pack, and how to get the most out of a WCS weekend.',
    cta: 'Explore guides →',
    href: '/events',
  },
  {
    icon: ShoppingBag,
    label: 'Gear Reviews',
    description: 'Practical gear for dancers: earplugs, steamers, shoes, bags, fans, and more.',
    cta: 'See reviews →',
    href: '/gear',
  },
  {
    icon: BookOpen,
    label: 'Blog Posts',
    description: 'Dance concepts, practice systems, and competition prep without the jargon.',
    cta: 'Read posts →',
    href: '/blog',
  },
];

export function TopicGrid() {
  return (
    <Box as="section">
      <Text as="h2" variant="headline" size="xl" weight="font-black" marginBottom={3}>
        Explore by topic
      </Text>
      <Grid cols={{ base: 1, md: 3 }} gap={3}>
        {TOPICS.map(({ icon: Icon, label, description, cta, href }) => (
          <Stack
            key={label}
            as={NavLink}
            to={href}
            gap={2}
            padding={4}
            border
            radius="lg"
            className="group transition-all duration-200 hover:border-accent/40 hover:bg-surface/60"
          >
            {/* Icon — small, accent-tinted */}
            <Box className="w-fit rounded-md bg-accent/10 p-1.5">
              <Icon className="h-4 w-4 text-accent" />
            </Box>
            <Stack gap={1}>
              <Text variant="body" size="sm" weight="font-bold" className="transition-colors group-hover:text-accent">
                {label}
              </Text>
              <Text variant="body" size="xs" color="dim" className="line-clamp-2 leading-snug">
                {description}
              </Text>
            </Stack>
            <Text variant="mono" size="xs" color="accent" weight="font-bold" className="mt-auto">
              {cta}
            </Text>
          </Stack>
        ))}
      </Grid>
    </Box>
  );
}
