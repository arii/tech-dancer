import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { NavLink } from 'react-router-dom';

export function ClientCard() {
  return (
    <Box as="article" border radius="lg" overflow="hidden" surface="default" height="full" className="creator-card group flex flex-col">
      <Box className="creator-media" position="relative" height={48} width="full" bg="surface-alt">
        <Box as="img" src="/images/creators/hair-by-april.jpg" alt="Hair by April - San Francisco Stylist" className="w-full h-full object-cover" />
        <Box position="absolute" top={4} right={4} paddingX={3} paddingY={1} radius="full" className="bg-bg/90 backdrop-blur-sm text-xs font-bold uppercase text-accent">
          Hair & Beauty
        </Box>
      </Box>
      <Stack className="creator-body" padding={6} gap={4} flex={1}>
        <Stack gap={1}>
          <Text as="h2" variant="headline" size="xl" weight="font-bold">Hair by April</Text>
          <Text as="p" className="creator-location" variant="mono" size="xs" color="dim">San Francisco, CA</Text>
        </Stack>
        <Text as="p" className="creator-description" variant="body" size="sm" color="main" flex={1}>
          Specializing in curly hair cuts, authentic vintage styling, and on-location production styling.
        </Text>
        <Stack className="creator-features" direction="row" wrap gap={2}>
          <Box as="span" paddingX={2} paddingY={1} radius="md" border className="text-xs bg-surface-alt/50 border-line/50">Edge Web Build</Box>
          <Box as="span" paddingX={2} paddingY={1} radius="md" border className="text-xs bg-surface-alt/50 border-line/50">Appointment Funnel</Box>
          <Box as="span" paddingX={2} paddingY={1} radius="md" border className="text-xs bg-surface-alt/50 border-line/50">Event Intake Automation</Box>
        </Stack>
        <Box className="creator-actions" marginTop={4}>
          <Button as="a" href="https://hairbyapril.pages.dev" target="_blank" rel="noopener" variant="outline" width="full">
            Visit Website ↗
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
