import { NavLink } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

export function DevLabCallout() {
  return (
    <Box border radius="lg" padding={5} className="w-full max-w-full min-w-0">
      {/* Header row */}
      <Stack direction="row" align="center" gap={3}>
        <Box padding={2} radius="md" shrink={0} className="bg-accent/10">
          <Terminal className="h-4 w-4 text-accent" />
        </Box>
        <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase className="tracking-widest">
          DevAI Portfolio
        </Text>
      </Stack>


      {/* Description */}
      <Text variant="body" size="xs" color="dim" leading="relaxed" marginTop={3}>
        I build AI-assisted engineering infrastructure and autonomous systems. Explore my portfolio of independently led DevAI projects focusing on agentic CI/CD pipelines, LLM workflows, and automated developer tooling. Open to Staff SWE roles, robotics contracts, and DevAI consulting.
      </Text>

      {/* Project highlights */}
      <Stack gap={2} marginTop={4}>
        <Stack direction="row" align="start" gap={2}>
          <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={20} shrink={0} marginTop={1}>ROBOTICS</Text>
          <Box display="flex" wrap="wrap" gap={1.5} grow={1}>
            {['ROS1/2', 'C++', 'Navigation'].map(tag => (
              <Text as="span" key={tag} size="micro" weight="font-medium" paddingX={2} paddingY={0.5} radius="sm" border className="bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20">{tag}</Text>
            ))}
          </Box>
        </Stack>
        <Stack direction="row" align="start" gap={2}>
          <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={20} shrink={0} marginTop={1}>AI</Text>
          <Box display="flex" wrap="wrap" gap={1.5} grow={1}>
            {['LLM Workflows', 'Agentic CI/CD'].map(tag => (
              <Text as="span" key={tag} size="micro" weight="font-medium" paddingX={2} paddingY={0.5} radius="sm" border className="bg-brand-amber/10 text-brand-amber border-brand-amber/20">{tag}</Text>
            ))}
          </Box>
        </Stack>
        <Stack direction="row" align="start" gap={2}>
          <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={20} shrink={0} marginTop={1}>INFRA</Text>
          <Box display="flex" wrap="wrap" gap={1.5} grow={1}>
            {['GitHub Actions', 'Playwright'].map(tag => (
              <Text as="span" key={tag} size="micro" weight="font-medium" paddingX={2} paddingY={0.5} radius="sm" border className="bg-brand-green/10 text-brand-green border-brand-green/20">{tag}</Text>
            ))}
          </Box>
        </Stack>
      </Stack>

      {/* CTA */}
      <Text
        as={NavLink}
        to="/research"
        display="flex"
        align="center"
        marginTop={4}
        paddingY={3}
        variant="mono"
        size="xs"
        color="accent"
        weight="font-bold"
        className="hover:underline h-11"
      >
        View Portfolio →
      </Text>
    </Box>
  );
}
