import { Box, Stack, Text } from '@/layouts/Primitives';
import { Monitor, Music, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IdentityCards() {
  return (
    <Stack gap={4} marginBottom={8}>
      <Text variant="mono" size="micro" color="dim" tracking="emphasized">Two identities, one site</Text>
      <Box display="grid" cols={{ base: 1, md: 2 }} gap={4}>
        {/* Roboticist Card */}
        <Box border radius="lg" padding={6} display="flex" direction="col" gap={4}>
          <Box
            width={8}
            height={8}
            radius="md"
            display="flex"
            align="center"
            justify="center"
            className="bg-brand-blue-bg"
          >
            <Monitor size={16} className="text-brand-blue-accent" />
          </Box>
          <Text variant="display" size="lg" weight="font-medium" className="text-accent-navy">The roboticist</Text>
          <Text variant="body" size="sm" color="body">
            MIT CSAIL PhD. I design systems that stay reliable under uncertainty — perception pipelines, planning, and AI that works in the real world, not just on benchmarks. Available for consulting and project-based work.
          </Text>
          <Box
            as={Link}
            to="/research"
            display="flex"
            align="center"
            gap={1}
            marginTop="auto"
            paddingTop={2}
            border="t"
            className="text-brand-blue-accent hover:opacity-80 transition-opacity"
          >
            <Text variant="mono" size="micro" weight="font-medium">View technical portfolio</Text>
            <ArrowRight size={12} />
          </Box>
        </Box>

        {/* Dancer Card */}
        <Box border radius="lg" padding={6} display="flex" direction="col" gap={4}>
          <Box
            width={8}
            height={8}
            radius="md"
            display="flex"
            align="center"
            justify="center"
            className="bg-brand-green-bg"
          >
            <Music size={16} className="text-brand-green-icon" />
          </Box>
          <Text variant="display" size="lg" weight="font-medium" className="text-accent-navy">The dancer</Text>
          <Text variant="body" size="sm" color="body">
            Competitive intermediate follow in West Coast Swing. Home base at Mission City Swing in SF. I apply the same systems thinking to dance travel, gear, and competition analysis that I use in the lab.
          </Text>
          <Box
            as={Link}
            to="/gear"
            display="flex"
            align="center"
            gap={1}
            marginTop="auto"
            paddingTop={2}
            border="t"
            className="text-brand-green-icon hover:opacity-80 transition-opacity"
          >
            <Text variant="mono" size="micro" weight="font-medium">Browse gear & travel guides</Text>
            <ArrowRight size={12} />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
