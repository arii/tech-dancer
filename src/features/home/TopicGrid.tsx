// impeccable-ignore-file
import { ShoppingBag, BookOpen } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Grid, Stack, Text } from '@/layouts/Primitives';

const TOPICS = [
  {

    icon: ShoppingBag,
    label: 'Tools',
    description: 'Practical tools for dancers: earplugs, steamers, shoes, bags, fans, and more.',
    cta: 'See tools →',
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
    <Box as="section" width="full" maxWidth="full" minWidth={0}>
      <Text as="h2" variant="headline" size="xl" weight="font-black" marginBottom={3}>
        Explore by topic
      </Text>
      <Grid cols={{ base: 1, md: 2 }} gap={3}>
        {TOPICS.map(({ icon: Icon, label, description, cta, href }) => (
          <Stack
            key={label}
            as={NavLink}
            to={href}
            gap={2}
            padding={6}
            border
            radius="lg"
            width="full"
            maxWidth="full"
            minWidth={0}
            minHeight={{ base: 36, md: 38 }}
            className="group transition-all duration-200 hover:border-accent/40 hover:bg-surface/60"
          >
            {/* Icon — exactly 32px container */}
            <Box
              width={8}
              height={8}
              display="flex"
              align="center"
              justify="center"
              radius="md"
              className="bg-accent/10"
            >
              <Icon className="h-4.5 w-4.5 text-accent" />
            </Box>
            <Stack gap={1}>
              <Text variant="body" size="base" weight="font-bold" className="transition-colors group-hover:text-accent">
                {label}
              </Text>
              <Text variant="body" size="sm" color="dim" className="line-clamp-none md:line-clamp-2 leading-snug">
                {description}
              </Text>
            </Stack>
            <Text
              variant="mono"
              size="xs"
              color="accent"
              weight="font-bold"
              marginTop="auto"
              display={{ base: "none", md: "block" }}
            >
              {cta}
            </Text>
          </Stack>
        ))}
      </Grid>
    </Box>
  );
}
