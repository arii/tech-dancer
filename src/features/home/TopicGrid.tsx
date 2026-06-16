// impeccable-ignore-file
import { BookOpen, Backpack, Plane, Heart, Shirt } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Grid, Stack, Text } from '@/layouts/Primitives';

const TOPICS = [
  {
    icon: BookOpen,
    label: 'Blog Posts',
    description: 'Dance concepts, practice systems, and competition prep without the jargon.',
    cta: 'Read posts →',
    href: '/blog',
  },
  {
    icon: Backpack,
    label: 'Gear',
    description: 'Equipment, shoes, and tech essentials for social dancing.',
    cta: 'View gear →',
    href: '/blog?category=Gear',
  },
  {
    icon: Plane,
    label: 'Travel',
    description: 'Tips and tools for packing and surviving event weekends.',
    cta: 'Travel tips →',
    href: '/blog?category=Travel',
  },
  {
    icon: Heart,
    label: 'Health & Recovery',
    description: 'Self-care routines and physical maintenance for dancers.',
    cta: 'Read more →',
    href: '/blog?category=Health',
  },
  {
    icon: Shirt,
    label: 'Costumes',
    description: 'DIY and dance-friendly outfits for themed social nights.',
    cta: 'View costumes →',
    href: '/blog?category=Costumes',
  },
];

export function TopicGrid() {
  return (
    <Box as="section" className="w-full max-w-full min-w-0">
      <Text as="h2" variant="headline" size="xl" weight="font-black" marginBottom={3}>
        Explore by topic
      </Text>
      <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={3}>
        {TOPICS.map(({ icon: Icon, label, description, cta, href }) => (
          <Stack
            key={label}
            as={NavLink}
            to={href}
            gap={2}
            padding={6}
            border
            radius="lg"
            className="group w-full max-w-full min-w-0 min-h-[145px] md:h-[150px] transition-all duration-200 hover:border-accent/40 hover:bg-surface/60"
          >
            {/* Icon — exactly 32px container */}
            <Box className="w-8 h-8 flex items-center justify-center rounded-md bg-accent/10">
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
            <Text variant="mono" size="xs" color="accent" weight="font-bold" className="mt-auto hidden md:block">
              {cta}
            </Text>
          </Stack>
        ))}
      </Grid>
    </Box>
  );
}
