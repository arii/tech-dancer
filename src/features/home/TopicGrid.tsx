import { Shirt, Plane, VenetianMask as Mask, Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Grid, Stack, Text } from '@/layouts/Primitives';

const TOPICS = [
  {
    id: "gear",
    label: "Gear & apparel",
    icon: Shirt,
    href: "/gear",
    iconColorClass: "text-accent-sky",
    iconBgClass: "bg-accent-sky/10",
    iconHoverBgClass: "group-hover:bg-accent-sky/20",
    iconAnimClass: "group-hover:scale-110",
  },
  {
    id: "travel",
    label: "Travel & packing",
    icon: Plane,
    href: "/blog?category=Travel",
    iconColorClass: "text-accent",
    iconBgClass: "bg-accent/10",
    iconHoverBgClass: "group-hover:bg-accent/20",
    iconAnimClass: "group-hover:translate-x-1 group-hover:-translate-y-1",
  },
  {
    id: "costumes",
    label: "Costumes & themes",
    icon: Mask,
    href: "/blog?category=Costumes",
    iconColorClass: "text-accent-magenta",
    iconBgClass: "bg-accent-magenta/10",
    iconHoverBgClass: "group-hover:bg-accent-magenta/20",
    iconAnimClass: "group-hover:rotate-12",
  },
  {
    id: "health",
    label: "Health & recovery",
    icon: Heart,
    href: "/blog?category=Health",
    iconColorClass: "text-error",
    iconBgClass: "bg-error/10",
    iconHoverBgClass: "group-hover:bg-error/20",
    iconAnimClass: "group-hover:scale-110",
  },
];

export function TopicGrid() {
  return (
    <Box as="section" width="full" maxWidth="full" minWidth={0}>
      <Text as="h2" variant="headline" size="xl" weight="font-black" marginBottom={4} tracking="wider">
        Explore by topic
      </Text>
      <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={4} className="divide-y sm:divide-y-0 sm:divide-x divide-line/30 -ml-4 pl-4">
        {TOPICS.map(({ id, label, icon: Icon, href, iconColorClass, iconAnimClass }) => (
          <Stack
            key={label}
            as={NavLink}
            to={href}
            direction="row"
            align="center"
            gap={3}
            paddingY={3}
            paddingX={{ base: 0, sm: 4 }}
            className={`group cursor-pointer topic-card-${id}`}
          >
            <Icon className={`h-4 w-4 ${iconColorClass} opacity-70 ${iconAnimClass} transition-transform duration-300`} />
            <Text variant="body" size="sm" weight="font-medium" hoverColor="accent" className="transition-colors duration-300">
              {label}
            </Text>
          </Stack>
        ))}
      </Grid>
    </Box>
  );
}
