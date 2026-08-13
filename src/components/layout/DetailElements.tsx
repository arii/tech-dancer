
import { ReactNode } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { LucideIcon, Shield } from 'lucide-react';

interface ScoreItemProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  color?: string;
  intent?: "brand" | "accent" | "success" | "warning" | "danger";
}

export function ScoreItem({ label, value, icon: IconComponent, color, intent }: ScoreItemProps) {
  return (
    <Stack
      gap={1}
      align="center"
      flex
      paddingX={{ base: 2, md: 4 }}
      paddingY={2}
      minWidth={{ base: 24, sm: 32 }}
    >
      <Text variant="mono" size="tiny" color="dim" uppercase>{label}</Text>
      <Stack direction="row" align="center" gap={1} className={color || ''}>
        {IconComponent && <Icon icon={IconComponent} size="sm" color={intent === "brand" || intent === "accent" ? "accent" : "default"} />}
        <Text variant="display" size="xl" weight="font-bold" intent={intent}>{value}</Text>
      </Stack>
    </Stack>
  );
}

export function ScoreGrid({ children }: { children: ReactNode }) {
  return (
    <Box
      border="y"
      paddingY={6}
      surface="muted"
      width="full"
      className="border-line/50"
    >
      <Stack
        direction="row"
        wrap
        justify="center"
        width="full"
        gap={{ base: 4, md: 0 }}
        className="divide-x-0 md:divide-x divide-line/30"
      >
        {children}
      </Stack>
    </Box>
  );
}

export function SpecsTable({ specs }: { specs?: Record<string, string> }) {
  if (!specs || Object.keys(specs).length === 0) return null;

  return (
    <Stack gap={4}>
      <Text
        variant="mono"
        size="tiny"
        weight="font-bold"
        color="dim"
        uppercase
        tracking="widest"
        border="b"
        paddingBottom={2}
      >
        Technical Specs
      </Text>
      <Stack gap={3}>
        {Object.entries(specs).map(([key, value]) => (
          <Stack key={key} gap={1}>
            <Text variant="mono" size="tiny" color="dim" uppercase opacityVariant="muted">{key}</Text>
            <Text variant="mono" size="xs" weight="font-bold">{value}</Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}


export function VerdictCallout({ verdict }: { verdict: string }) {
  return (
    <Box border padding={8} surface="accent" marginBottom={12} radius="lg" className="border-accent/30">
       <Stack gap={3}>
          <Stack direction="row" align="center" gap={3}>
             <Icon icon={Shield} size="lg" color="accent" />
             <Text variant="display" size="2xl" weight="font-black" color="accent" uppercase>THE VERDICT</Text>
          </Stack>
          <Text variant="body" size="lg" italic leading="relaxed" weight="font-medium" color="main">
            "{verdict}"
          </Text>
       </Stack>
    </Box>
  );
}
