import { Shirt, Plane, VenetianMask as Mask, Heart, Bot as Robot } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';

const TOPICS = [
  { label: "Gear & apparel", icon: Shirt, href: "/blog?category=Gear" },
  { label: "Travel & packing", icon: Plane, href: "/blog?tag=travel" },
  { label: "Costumes & themes", icon: Mask, href: "/blog?tag=themes" },
  { label: "Health & recovery", icon: Heart, href: "/blog?tag=recovery" },
  { label: "Agents & CI/CD", icon: Robot, href: "/devai-portfolio" },
];

export function TopicGrid() {
  return (
    <Box as="section" width="full" maxWidth="full" minWidth={0}>
      <Text as="h2" variant="headline" size="xl" weight="font-black" marginBottom={4} uppercase tracking="wider">
        Explore by topic
      </Text>
      <Box border radius="lg" padding={4} surface="surface">
        <Stack gap={1}>
          {TOPICS.map(({ icon: Icon, label, href }) => (
            <Stack
              key={label}
              as={NavLink}
              to={href}
              direction="row"
              align="center"
              gap={4}
              padding={3}
              minHeight={12}
              radius="md"
              className="group transition-all duration-200 hover:bg-accent/5"
            >
              <Box
                width={10}
                height={10}
                display="flex"
                align="center"
                justify="center"
                radius="md"
                surface="accent"
                opacityVariant="10"
                shrink={0}
                className="group-hover:bg-accent/20 transition-colors"
              >
                <Icon className="h-5 w-5 text-accent" />
              </Box>
              <Text variant="body" size="base" weight="font-bold" hoverColor="accent">
                {label}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
