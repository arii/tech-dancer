import { NavLink } from 'react-router-dom';
import { Box, Grid, Stack, Text } from '@/layouts/Primitives';
import { ClipboardCheck, Zap, CalendarDays } from 'lucide-react';
import { ActionButton } from '@/components/ui/ActionButton';

const TOOLS = [
  {
    title: 'Packing Checklist',
    description: 'Everything needed for a WCS weekend.',
    icon: ClipboardCheck,
    cta: 'Open Checklist',
    href: '/gear/2024-06-01-compression-cubes',
    label: 'Travel Resource'
  },
  {
    title: 'Shoe Preparation',
    description: 'Make Any Shoe a Dance Shoe',
    icon: Zap,
    cta: 'Read Guide',
    href: '/blog/2026-04-18-make-shoe-dance',
    label: 'Gear Resource'
  },
  {
    title: 'Event Calendar',
    description: 'Upcoming Events',
    icon: CalendarDays,
    cta: 'View Events',
    href: '/events',
    label: 'Planning Tool'
  }
];

export function ResourceToolkit() {
  return (
    <Box as="section" marginTop={{ base: 16, lg: 32 }}>
      <Stack gap={12}>
        <Stack gap={4}>
          <Text variant="mono" size="xs" color="brand" weight="font-black" uppercase tracking="widest">
            RESOURCE TOOLKIT
          </Text>
          <Text variant="headline" size="3xl" weight="font-black">
            Inspired by Engineering Systems
          </Text>
        </Stack>

        <Grid cols={{ base: 1, md: 3 }} gap={6}>
          {TOOLS.map((tool) => (
            <Stack
              key={tool.title}
              gap={6}
              padding={8}
              border
              radius="xl"
              surface="default"
              className="hover:border-accent/40 transition-all group"
            >
              <Stack gap={4}>
                <Box display="flex" align="center" justify="between">
                  <Box padding={3} radius="lg" className="bg-accent/10">
                    <tool.icon className="w-6 h-6 text-accent" />
                  </Box>
                  <Text variant="mono" size="micro" color="dim" weight="font-bold" uppercase tracking="wider">
                    {tool.label}
                  </Text>
                </Box>

                <Stack gap={2}>
                  <Text variant="headline" size="xl" weight="font-black">
                    {tool.title}
                  </Text>
                  <Text variant="body" size="sm" color="dim">
                    {tool.description}
                  </Text>
                </Stack>
              </Stack>

              <ActionButton
                as={NavLink}
                to={tool.href}
                variant="secondary"
                paddingY={3}
                width="full"
                className="tap-target"
              >
                {tool.cta}
              </ActionButton>
            </Stack>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
