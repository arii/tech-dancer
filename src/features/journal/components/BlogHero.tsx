import { Box, Stack, Text } from '@/layouts/Primitives';
import { ActionButton } from '@/components/ui/ActionButton';
import { NavLink } from 'react-router-dom';

export function BlogHero() {
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
          INSIGHTS
        </Text>
        <Text as="h1" variant="headline" size="fluid-7" weight="font-black" leading="tight" tracking="tight">
          Blog Posts
        </Text>
        <Text
          variant="body"
          size={{ base: "lg", lg: "xl" }}
          color="dim"
          maxWidth="prose"
          marginTop={4}
          className="leading-relaxed text-pretty"
        >
          Guides, gear reviews, event resources, technical experiments, and West Coast Swing.
        </Text>
      </Stack>

      <Box display="flex" align="center" gap={4} wrap>
        <ActionButton
          as={NavLink}
          to="/blog/2026-04-18-make-shoe-dance"
          variant="primary"
          paddingX={6}
          paddingY={3}
          className="tap-target"
        >
          Start Here
        </ActionButton>
        <ActionButton
          as="a"
          href="#categories"
          variant="secondary"
          paddingX={6}
          paddingY={3}
          className="tap-target"
        >
          Browse Categories
        </ActionButton>
      </Box>
    </Stack>
  );
}
