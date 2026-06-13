import { Box, Stack, Text } from '@/layouts/Primitives';
import { ActionButton } from '@/components/ui/ActionButton';
import { NavLink } from 'react-router-dom';

export function EventHero() {
  return (
    <Stack
      as="header"
      gap={6}
      paddingY={{ base: 8, lg: 16 }}
      border="b"
      className="border-line"
    >
      <Stack gap={4}>
        <Text variant="mono" size="xs" color="brand" weight="font-black" tracking="wide-editorial" uppercase>
          EVENT RESOURCES
        </Text>
        <Stack gap={0}>
          <Text as="h1" variant="headline" size="fluid-7" weight="font-black" leading="none" tracking="tight">
            Travel smarter.
          </Text>
          <Text as="span" variant="headline" size="fluid-7" weight="font-black" leading="none" tracking="tight" className="text-accent">
            Dance longer.
          </Text>
          <Text as="span" variant="headline" size="fluid-7" weight="font-black" leading="none" tracking="tight">
            Stress less.
          </Text>
        </Stack>
        <Text
          variant="body"
          size={{ base: "lg", lg: "xl" }}
          color="dim"
          maxWidth="prose"
          marginTop={4}
          className="leading-relaxed text-pretty"
        >
          Everything you need for West Coast Swing weekenders, exchanges, and conventions.
        </Text>
      </Stack>

      <Box display="flex" align="center" gap={4} wrap>
        <ActionButton
          as={NavLink}
          to="/gear?category=Packing"
          variant="primary"
          paddingX={6}
          paddingY={3}
          className="tap-target"
        >
          View Packing Guides
        </ActionButton>
        <ActionButton
          as="a"
          href="#event-guides"
          variant="secondary"
          paddingX={6}
          paddingY={3}
          className="tap-target"
        >
          Browse Events
        </ActionButton>
      </Box>
    </Stack>
  );
}
