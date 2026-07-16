import { NavLink } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { tagVariants } from '@/lib/variants';
import type { VariantProps } from 'class-variance-authority';

type TagVariant = NonNullable<VariantProps<typeof tagVariants>['variant']>;

interface Highlight {
  label: string;
  tags: string[];
  variant: TagVariant;
}

const HIGHLIGHTS: Highlight[] = [
  {
    label: 'ROBOTICS',
    tags: ['ROS1/2', 'C++', 'Navigation'],
    variant: 'sky',
  },
  {
    label: 'AI',
    tags: ['LLM Workflows', 'Agentic CI/CD'],
    variant: 'purple',
  },
  {
    label: 'INFRA',
    tags: ['GitHub Actions', 'Playwright'],
    variant: 'cyan',
  },
];

export function DevLabCallout() {
  return (
    <Box border radius="md" padding={6} className="w-full max-w-full min-w-0">
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
      <Text variant="body" size="xs" color="dim" leading="relaxed" className="leading-relaxed" marginTop={3}>
        I build AI-assisted engineering infrastructure and autonomous systems. Explore my portfolio of independently led DevAI projects focusing on agentic CI/CD pipelines, LLM workflows, and automated developer tooling. Open to Staff SWE roles, robotics contracts, and DevAI consulting.
      </Text>

      {/* Project highlights */}
      <Stack gap={2} marginTop={4}>
        {HIGHLIGHTS.map(({ label, tags, variant }) => (
          <Stack key={label} direction="row" align="start" gap={2}>
            <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={20} shrink={0} marginTop={1}>
              {label}
            </Text>
            <Box display="flex" wrap="wrap" gap={2.5} grow={1}>
              {tags.map(tag => (
                <span
                  key={tag}
                  className={tagVariants({ variant, size: 'xs' })}
                >
                  {tag}
                </span>
              ))}
            </Box>
          </Stack>
        ))}
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
