import { NavLink } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';

export function DevAIPanel() {
  return (
    <Box
      border
      radius="lg"
      padding={8}
      surface="bg"
      display="flex"
      direction="col"
      justify="between"
      height="full"
      className="group transition-all hover:border-accent/30 shadow-inner"
    >
      <Stack gap={6}>
        {/* Header with Terminal Icon */}
        <Stack direction="row" align="center" gap={3}>
          <Box radius="md" surface="accent" opacityVariant="10" padding={2} shrink={0}>
            <Terminal className="h-5 w-5 text-accent" />
          </Box>
          <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase tracking="widest">
            DevAI Portfolio
          </Text>
        </Stack>

        {/* Body Copy */}
        <Text variant="body" size="base" color="dim" leading="relaxed">
          A live production testbed where every feature and pipeline is audited by an autonomous suite of developer agents. Grounded solutions built to ship products, not hype.
        </Text>

        {/* Links */}
        <Stack gap={3}>
          <Box
            as="a"
            href="https://github.com/arielanders/repo-auditor-ai"
            target="_blank"
            rel="noopener noreferrer"
            paddingX={4}
            paddingY={3}
            minHeight={12}
            display="flex"
            align="center"
            justify="between"
            radius="md"
            surface="muted"
            border
            borderColor="accent/5"
            className="group/link hover:border-accent/30 transition-colors"
          >
            <Text variant="mono" size="xs" color="dim" className="group-hover/link:text-accent transition-colors">repo-auditor-ai</Text>
            <Text variant="mono" size="xs" color="accent" opacityVariant="muted" className="group-hover/link:opacity-100">EXT_URL</Text>
          </Box>
          <Box
            as={NavLink}
            to="/devai-portfolio"
            paddingX={4}
            paddingY={3}
            minHeight={12}
            display="flex"
            align="center"
            justify="between"
            radius="md"
            surface="muted"
            border
            borderColor="accent/5"
            className="group/link hover:border-accent/30 transition-colors"
          >
            <Text variant="mono" size="xs" color="dim" className="group-hover/link:text-accent transition-colors">CI root cause agent</Text>
            <Text variant="mono" size="xs" color="accent" opacityVariant="muted" className="group-hover/link:opacity-100">LOCAL_PTH</Text>
          </Box>
        </Stack>
      </Stack>

      {/* CTA Button */}
      <Box marginTop={8}>
        <Button
          as={NavLink}
          to="/devai-portfolio"
          variant="secondary"
          size="lg"
          width="full"
        >
          View portfolio
        </Button>
      </Box>
    </Box>
  );
}
