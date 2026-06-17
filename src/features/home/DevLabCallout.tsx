// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';

export function DevLabCallout() {
  return (
    <Box border radius="lg" padding={5} className="w-full max-w-full min-w-0">
      {/* Header row */}
      <Stack direction="row" align="center" gap={3}>
        <Box className="shrink-0 rounded-md bg-accent/10 p-2">
          <Terminal className="h-4 w-4 text-accent" />
        </Box>
        <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase className="tracking-widest">
          DevAI Portfolio
        </Text>
      </Stack>


      {/* Description */}
      <Text variant="body" size="xs" color="dim" leading="relaxed" marginTop={3}>
        I build AI-assisted engineering infrastructure and autonomous systems. Below is a portfolio of independently led DevAI projects focusing on agentic CI/CD pipelines, LLM workflows, and automated developer tooling. Open to Staff SWE roles, robotics contracts, and DevAI consulting.
      </Text>

      {/* Project highlights */}
      <Stack gap={1.5} marginTop={3}>
        <Stack direction="row" align="center" gap={2}>
          <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={20} shrink={0}>ROBOTICS</Text>
          <Box display="flex" wrap="wrap" gap={1.5}>
            {['ROS1/2', 'C++', 'Navigation'].map(tag => (
              <span key={tag} className="devai-callout-tag bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">{tag}</span>
            ))}
          </Box>
        </Stack>
        <Stack direction="row" align="center" gap={2}>
          <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={20} shrink={0}>AI</Text>
          <Box display="flex" wrap="wrap" gap={1.5}>
            {['LLM Workflows', 'Agentic CI/CD'].map(tag => (
              <span key={tag} className="devai-callout-tag bg-brand-amber/10 text-brand-amber border border-brand-amber/20">{tag}</span>
            ))}
          </Box>
        </Stack>
        <Stack direction="row" align="center" gap={2}>
          <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={20} shrink={0}>INFRA</Text>
          <Box display="flex" wrap="wrap" gap={1.5}>
            {['GitHub Actions', 'Playwright'].map(tag => (
              <span key={tag} className="devai-callout-tag bg-brand-green/10 text-brand-green border border-brand-green/20">{tag}</span>
            ))}
          </Box>
        </Stack>
      </Stack>

      {/* CTA */}
      <Text
        as={NavLink}
        to="/research"
        display="block"
        marginTop={4}
        paddingY={{ base: 4, sm: 0 }}
        paddingX={{ base: 4, sm: 0 }}
        variant="mono"
        size="xs"
        color="accent"
        weight="font-bold"
        className="hover:underline"
      >
        View Portfolio →
      </Text>
    </Box>
  );
}
